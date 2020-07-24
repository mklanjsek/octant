package resourceviewer

import (
	"context"
	"fmt"
	"sort"
	"strings"
	"sync"

	"github.com/pkg/errors"
	corev1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/api/meta"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/types"
	"k8s.io/client-go/kubernetes/scheme"

	"github.com/vmware-tanzu/octant/internal/config"
	"github.com/vmware-tanzu/octant/internal/gvk"
	"github.com/vmware-tanzu/octant/internal/link"
	"github.com/vmware-tanzu/octant/internal/objectstatus"
	"github.com/vmware-tanzu/octant/internal/objectvisitor"
	"github.com/vmware-tanzu/octant/internal/util/kubernetes"
	"github.com/vmware-tanzu/octant/pkg/plugin"
	"github.com/vmware-tanzu/octant/pkg/store"
	"github.com/vmware-tanzu/octant/pkg/view/component"
)

//go:generate mockgen -destination=./fake/mock_object_status.go -package=fake github.com/vmware-tanzu/octant/internal/resourceviewer ObjectStatus

// HandlerOption is an option for configuring Handler.
type HandlerOption func(h *Handler)

// SetHandlerObjectStatus configures handler to use a custom object status generator.
func SetHandlerObjectStatus(objectStatus ObjectStatus) HandlerOption {
	return func(h *Handler) {
		h.objectStatus = objectStatus
	}
}

type nodesStorage map[types.UID]*unstructured.Unstructured

type adjListStorage map[string]component.EdgePair

func (als adjListStorage) hasKey(uid string) bool {
	for k := range als {
		if k == uid {
			return true
		}
	}

	return false
}

func (als adjListStorage) hasEdgeForKey(keyUID string) bool {
	_, ok := als[keyUID]
	return ok
}

func (als adjListStorage) isEdge(uid string) bool {
	for edgeUID := range als {
		if uid == edgeUID {
			return true
		}
	}

	return false
}

func (als adjListStorage) addEdgeForKey(fromName, toName string, from, to objectvisitor.EdgeDefinition) {
	uid1:= fmt.Sprintf("%s-%s", fromName, toName)
	uid2:= fmt.Sprintf("%s-%s", toName, fromName)
	var key= uid1

	if _, ok := als[uid1]; !ok {
		key= uid2
		if _, ok := als[uid2]; !ok {
			als[key] = component.EdgePair{}
		}
	}

	source:= component.Edge{Node: fromName,	Connector: from.Connector,
		ConnectorType: string(from.ConnectorType), Type: component.EdgeTypeExplicit,}
	destination:= component.Edge{Node: toName, Connector: to.Connector,
		ConnectorType: string(to.ConnectorType), Type: component.EdgeTypeExplicit,}
	als[key] = component.EdgePair{Source: source, Destination: destination}
}

// Handler is a visitor handler.
type Handler struct {
	objectStore   store.Store
	link          link.Interface
	pluginPrinter plugin.ManagerInterface

	nodes   nodesStorage
	adjList adjListStorage

	mu           sync.Mutex
	objectStatus ObjectStatus
}

var _ objectvisitor.ObjectHandler = (*Handler)(nil)

// NewHandler creates an instance of Handler.
func NewHandler(dashConfig config.Dash, options ...HandlerOption) (*Handler, error) {
	l, err := link.NewFromDashConfig(dashConfig)
	if err != nil {
		return nil, err
	}

	h := &Handler{
		objectStore:   dashConfig.ObjectStore(),
		link:          l,
		pluginPrinter: dashConfig.PluginManager(),
		adjList:       adjListStorage{},
		nodes:         nodesStorage{},
		objectStatus:  NewHandlerObjectStatus(dashConfig.ObjectStore(), dashConfig.PluginManager()),
	}

	for _, option := range options {
		option(h)
	}

	return h, nil
}

// AddEdge adds edges to the graph.
func (h *Handler) AddEdge(ctx context.Context, from, to objectvisitor.EdgeDefinition) error {
	h.mu.Lock()
	defer h.mu.Unlock()

	fromName, err := edgeName(from.Object)
	if err != nil {
		if isSkippedNode(err) {
			return nil
		}
		return errors.Wrap(err, "could not generate from edge")
	}

	toName, err := edgeName(to.Object)
	if err != nil {
		if isSkippedNode(err) {
			return nil
		}
		return errors.Wrap(err, "could not generate to edge")
	}

	h.adjList.addEdgeForKey(fromName, toName, from, to)
	h.addNode(fromName, from.Object)
	h.addNode(toName, to.Object)

	return nil
}

func (h *Handler) addNode(name string, object *unstructured.Unstructured) {
	h.nodes[types.UID(name)] = object
}

// Process adds nodes to the dependency graph.
func (h *Handler) Process(ctx context.Context, object *unstructured.Unstructured) error {
	h.mu.Lock()
	defer h.mu.Unlock()

	accessor, err := meta.Accessor(object)
	if err != nil {
		return err
	}

	uid := accessor.GetUID()
	h.nodes[uid] = object

	return nil
}

func (h *Handler) AdjacencyList() (*component.AdjList, error) {
	list := component.AdjList{}

	for k, v := range h.adjList {
		list[k] = v
	}

	return &list, nil
}

// Nodes generates nodes from the handler.
func (h *Handler) Nodes(ctx context.Context) (component.Nodes, error) {
	h.mu.Lock()
	defer h.mu.Unlock()

	nodes := component.Nodes{}

	var podsInAGroup []unstructured.Unstructured

	for uid, node := range h.nodes {

		ok, err := isPodInGroup(node)
		if err != nil {
			return nil, err
		}

		if ok {
			podsInAGroup = append(podsInAGroup, *node)
			continue
		}

		onc := objectNode{
			link:          h.link,
			pluginPrinter: h.pluginPrinter,
			objectStatus:  h.objectStatus,
		}

		componentNode, err := onc.Create(ctx, node)
		if err != nil {
			if isSkippedNode(err) {
				continue
			}
			return nil, err
		}

		nodes[string(uid)] = *componentNode
	}

	nameMap, e := h.buildPodGroups(podsInAGroup)
	if e != nil {
		return nil, e
	}

	for podGroupName, objects := range nameMap {
		pgn := podGroupNode{
			objectStatus: h.objectStatus,
		}
		group, err := pgn.Create(ctx, podGroupName, objects)
		if err != nil {
			return nil, err
		}
		nodes[podGroupName] = *group
	}

	return nodes, nil
}

func (h *Handler) buildPodGroups(podsInAGroup []unstructured.Unstructured) (map[string][]unstructured.Unstructured, error) {
	nameMap := make(map[string][]unstructured.Unstructured)
	for _, object := range podsInAGroup {
		name, err := podGroupName(&object)
		if err != nil {
			return nil, err
		}

		nameMap[name] = append(nameMap[name], object)
	}
	return nameMap, nil
}

func edgeName(object *unstructured.Unstructured) (string, error) {
	if object == nil {
		return "", errors.New("can't build edge name for nil object")
	}

	ok, err := isPodInGroup(object)
	if err != nil {
		return "", err
	}

	accessor, err := meta.Accessor(object)
	if err != nil {
		return "", err
	}

	if ok {
		// If pod has owner references, associate this pod with a grouping. The name will be
		// constructed from the pod's labels.
		return podGroupName(object)
	}

	isReplicaSet, err := isObjectReplicaSet(object)
	if err != nil {
		return "", err
	}
	if isReplicaSet {
		if err := checkReplicaCount(object); err != nil {
			return "", err
		}
	}

	return string(accessor.GetUID()), nil
}

func isPodInGroup(object *unstructured.Unstructured) (bool, error) {
	if !isObjectPod(object) {
		return false, nil
	}

	pod, err := convertObjectToPod(object)
	if err != nil {
		return false, err
	}

	return len(pod.OwnerReferences) > 0, nil
}

func convertObjectToPod(object *unstructured.Unstructured) (*corev1.Pod, error) {
	pod := &corev1.Pod{}
	if err := scheme.Scheme.Convert(object, pod, 0); err != nil {
		return nil, err
	}
	return pod, nil
}

func podGroupName(object *unstructured.Unstructured) (string, error) {
	pod, err := convertObjectToPod(object)
	if err != nil {
		return "", err
	}

	if len(pod.OwnerReferences) < 1 {
		return "", errors.Errorf("pod %s has no owner references", pod.Name)
	}

	ownerReference := pod.OwnerReferences[0]
	return fmt.Sprintf("%s pods", ownerReference.Name), nil
}

func isObjectPod(object *unstructured.Unstructured) bool {
	if object == nil {
		return false
	}

	defer func() {
		if err := recover(); err != nil {
			fmt.Println(err)
		}
	}()

	objectGVK := object.GroupVersionKind()
	podGVK := gvk.Pod

	return podGVK.String() == objectGVK.String()
}

func isObjectParent(child, parent runtime.Object) (bool, error) {
	childAccessor, err := meta.Accessor(child)
	if err != nil {
		return false, err
	}

	parentAccessor, err := meta.Accessor(parent)
	if err != nil {
		return false, err
	}

	for _, ownerReference := range childAccessor.GetOwnerReferences() {
		if parentAccessor.GetUID() == ownerReference.UID {
			return true, nil
		}
	}

	return false, nil
}

func establishRelations(object runtime.Object) (string, bool, error) {
	m, err := runtime.DefaultUnstructuredConverter.ToUnstructured(object)
	if err != nil {
		return "", false, err
	}

	u := &unstructured.Unstructured{Object: m}
	kind := u.GetKind()

	accessor, err := meta.Accessor(object)
	if err != nil {
		return "", false, err
	}

	ownerReferences:= accessor.GetOwnerReferences()
	parentId:= ""

	if len(ownerReferences) > 0 {
		parentId = string(ownerReferences[0].UID)
	}

	switch string(kind) {
	case "DaemonSet":
		return "", true, nil
	case "StatefulSet":
		return "", true, nil
	case "Deployment":
		return "", true, nil
	case "ReplicaSet":
		return parentId, true, nil
	case "Job":
		return "", true, nil
	case "Pod":
		return parentId, false, nil
	}
	return "", false, nil
}

type ObjectStatus interface {
	Status(ctx context.Context, object runtime.Object) (*objectstatus.ObjectStatus, error)
}

type HandlerObjectStatus struct {
	objectStore   store.Store
	pluginManager plugin.ManagerInterface
}

var _ ObjectStatus = (*HandlerObjectStatus)(nil)

func NewHandlerObjectStatus(objectStore store.Store, pluginManager plugin.ManagerInterface) *HandlerObjectStatus {
	return &HandlerObjectStatus{
		objectStore:   objectStore,
		pluginManager: pluginManager,
	}
}

func (h *HandlerObjectStatus) Status(ctx context.Context, object runtime.Object) (*objectstatus.ObjectStatus, error) {
	status, err := objectstatus.Status(ctx, object, h.objectStore)
	if err != nil {
		return nil, err
	}

	pluginStatus, err := h.pluginManager.ObjectStatus(ctx, object)
	if err != nil {
		return nil, err
	}

	status.Details = append(status.Details, pluginStatus.ObjectStatus.Details...)

	return &status, nil
}

type isSkipped interface {
	IsSkipped() bool
}

func isSkippedNode(err error) bool {
	sn, ok := err.(isSkipped)
	return ok && sn.IsSkipped()
}

type skipNode struct{}

func (e skipNode) IsSkipped() bool {
	return true
}

func (e skipNode) Error() string {
	return "skip node"
}

func checkReplicaCount(object *unstructured.Unstructured) error {
	if object == nil {
		return errors.Errorf("unable to check for replica count in nil object")
	}

	i, ok, err := unstructured.NestedInt64(object.Object, "spec", "replicas")
	if err != nil {
		return err
	}

	if !ok || i < 1 {
		return &skipNode{}
	}

	return nil
}

func isObjectReplicaSet(object *unstructured.Unstructured) (bool, error) {
	if object == nil {
		return false, errors.New("can't check if nil object is a replica set")
	}

	groupVersionKind := object.GroupVersionKind()

	return (groupVersionKind.Group == "apps" || groupVersionKind.Group == "extensions") &&
		groupVersionKind.Kind == "ReplicaSet", nil
}

func (h *Handler) summarizeNodeList() string {
	var sb strings.Builder

	header := "nodes"
	fmt.Fprintf(&sb, "%s\n%s\n", header, strings.Repeat("=", len(header)))

	var uids []string

	for uid := range h.nodes {
		uids = append(uids, string(uid))
	}

	sort.Strings(uids)

	for _, uid := range uids {
		fmt.Fprintf(&sb, "%s: %s\n", uid, kubernetes.PrintObject(h.nodes[types.UID(uid)]))
	}

	sb.WriteString("===== end ====\n")

	return sb.String()
}
