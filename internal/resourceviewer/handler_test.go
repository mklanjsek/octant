package resourceviewer

import (
	"context"
	"fmt"
	"github.com/vmware-tanzu/octant/internal/objectvisitor"
	"path"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"k8s.io/apimachinery/pkg/api/meta"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/utils/pointer"

	configFake "github.com/vmware-tanzu/octant/internal/config/fake"
	"github.com/vmware-tanzu/octant/internal/objectstatus"
	"github.com/vmware-tanzu/octant/internal/resourceviewer/fake"
	"github.com/vmware-tanzu/octant/internal/testutil"
	pluginFake "github.com/vmware-tanzu/octant/pkg/plugin/fake"
	storeFake "github.com/vmware-tanzu/octant/pkg/store/fake"
	"github.com/vmware-tanzu/octant/pkg/view/component"
)

func TestHandler(t *testing.T) {
	cr := testutil.CreateClusterRole("cluster-role")
	crUnstructured := testutil.ToUnstructured(t, cr)

	deployment := testutil.CreateDeployment("deployment")
	deployment.SetOwnerReferences(testutil.ToOwnerReferences(t, cr))
	deploymentUnstructured := testutil.ToUnstructured(t, deployment)

	replicaSet1 := testutil.CreateAppReplicaSet("replica-set-1")
	replicaSet1.Spec.Replicas = pointer.Int32Ptr(1)
	replicaSet1.SetOwnerReferences(testutil.ToOwnerReferences(t, deployment))
	replicaSet1Unstructured := testutil.ToUnstructured(t, replicaSet1)

	replicaSet2 := testutil.CreateAppReplicaSet("replica-set-2")
	replicaSet2.SetOwnerReferences(testutil.ToOwnerReferences(t, deployment))
	replicaSet2Unstructured := testutil.ToUnstructured(t, replicaSet2)

	replicaSet3 := testutil.CreateExtReplicaSet("replica-set-3")
	replicaSet3.SetOwnerReferences(testutil.ToOwnerReferences(t, deployment))
	replicaSet3.Spec.Replicas = pointer.Int32Ptr(1)
	replicaSet3Unstructured := testutil.ToUnstructured(t, replicaSet3)

	serviceAccount := testutil.CreateServiceAccount("service-account")
	serviceAccountUnstructured := testutil.ToUnstructured(t, serviceAccount)

	pod1 := testutil.CreatePod("pod-1")
	pod1.Spec.ServiceAccountName = serviceAccount.Name
	pod1.SetOwnerReferences(testutil.ToOwnerReferences(t, replicaSet1))
	pod1Unstructured := testutil.ToUnstructured(t, pod1)
	pod2 := testutil.CreatePod("pod-2")
	pod2.Spec.ServiceAccountName = serviceAccount.Name
	pod2.SetOwnerReferences(testutil.ToOwnerReferences(t, replicaSet1))
	pod2Unstructured := testutil.ToUnstructured(t, pod2)
	pod3 := testutil.CreatePod("pod-3")
	pod3.Spec.ServiceAccountName = serviceAccount.Name
	pod3Unstructured := testutil.ToUnstructured(t, pod3)
	pod4 := testutil.CreatePod("pod-4")
	pod4.Spec.ServiceAccountName = serviceAccount.Name
	pod4.SetOwnerReferences(testutil.ToOwnerReferences(t, replicaSet3))
	pod4Unstructured := testutil.ToUnstructured(t, pod4)

	service1 := testutil.CreateService("service1")
	service1Unstructured := testutil.ToUnstructured(t, service1)

	controller := gomock.NewController(t)
	defer controller.Finish()

	dashConfig := configFake.NewMockDash(controller)

	objectStore := storeFake.NewMockStore(controller)
	dashConfig.EXPECT().ObjectStore().Return(objectStore).AnyTimes()

	pluginManager := pluginFake.NewMockManagerInterface(controller)
	dashConfig.EXPECT().PluginManager().Return(pluginManager).AnyTimes()

	objectStatus := fake.NewMockObjectStatus(controller)
	objectStatus.EXPECT().
		Status(gomock.Any(), gomock.Any()).
		Return(&objectstatus.ObjectStatus{}, nil).
		AnyTimes()

	handler, err := NewHandler(dashConfig, SetHandlerObjectStatus(objectStatus))
	require.NoError(t, err)

	ctx := context.Background()
	mockRelations := func(a *unstructured.Unstructured, objects ...*unstructured.Unstructured) {
		for _, b := range objects {
			edgeA:= objectvisitor.EdgeDefinition{Object: a, Connector: "", ConnectorType: objectvisitor.ConnectorTypeName}
			edgeB:= objectvisitor.EdgeDefinition{Object: b, Connector: "", ConnectorType: objectvisitor.ConnectorTypeName}
			require.NoError(t, handler.AddEdge(ctx, edgeA, edgeB))
			require.NoError(t, handler.AddEdge(ctx, edgeB, edgeA))
			require.NoError(t, handler.Process(ctx, b))
		}
		require.NoError(t, handler.Process(ctx, a))
	}

	mockRelations(crUnstructured, deploymentUnstructured)
	mockRelations(deploymentUnstructured, replicaSet1Unstructured, replicaSet2Unstructured, replicaSet3Unstructured)
	mockRelations(replicaSet1Unstructured, pod1Unstructured, pod2Unstructured)
	mockRelations(replicaSet3Unstructured, pod4Unstructured)
	mockRelations(service1Unstructured, pod1Unstructured, pod2Unstructured)
	mockRelations(service1Unstructured, pod4Unstructured)

	require.NoError(t, handler.Process(ctx, pod3Unstructured))
	require.NoError(t, handler.AddEdge(ctx, objectvisitor.EdgeDefinition{Object: pod1Unstructured, Connector: "", ConnectorType: objectvisitor.ConnectorTypeName},
		objectvisitor.EdgeDefinition{Object: serviceAccountUnstructured, Connector: "", ConnectorType: objectvisitor.ConnectorTypeName}))
	require.NoError(t, handler.AddEdge(ctx, objectvisitor.EdgeDefinition{Object: pod2Unstructured, Connector: "", ConnectorType: objectvisitor.ConnectorTypeName},
		objectvisitor.EdgeDefinition{Object: serviceAccountUnstructured, Connector: "", ConnectorType: objectvisitor.ConnectorTypeName}))
	require.NoError(t, handler.AddEdge(ctx, objectvisitor.EdgeDefinition{Object: pod3Unstructured, Connector: "", ConnectorType: objectvisitor.ConnectorTypeName},
		objectvisitor.EdgeDefinition{Object: serviceAccountUnstructured, Connector: "", ConnectorType: objectvisitor.ConnectorTypeName}))
	require.NoError(t, handler.AddEdge(ctx, objectvisitor.EdgeDefinition{Object: pod4Unstructured, Connector: "", ConnectorType: objectvisitor.ConnectorTypeName},
		objectvisitor.EdgeDefinition{Object: serviceAccountUnstructured, Connector: "", ConnectorType: objectvisitor.ConnectorTypeName}))
	require.NoError(t, handler.Process(ctx, serviceAccountUnstructured))

	mockLinkPath(t, dashConfig, cr)
	mockLinkPath(t, dashConfig, deployment)
	mockLinkPath(t, dashConfig, replicaSet1)
	mockLinkPath(t, dashConfig, replicaSet3)
	mockLinkPath(t, dashConfig, pod1)
	mockLinkPath(t, dashConfig, pod2)
	mockLinkPath(t, dashConfig, pod3)
	mockLinkPath(t, dashConfig, pod4)
	mockLinkPath(t, dashConfig, serviceAccount)
	mockLinkPath(t, dashConfig, service1)

	expectedAdjList := &component.AdjList{
		fmt.Sprintf("%s-%s", string(deployment.UID), string(cr.UID)): component.EdgePair{
			Source:	component.Edge{Node: string(deployment.UID), Connector: "", ConnectorType: "name", Type: component.EdgeTypeExplicit},
			Destination: component.Edge{Node: string(cr.UID), Connector: "", ConnectorType: "name", Type: component.EdgeTypeExplicit},
		},
		fmt.Sprintf("%s pods-%s", replicaSet1.Name, replicaSet1.Name): component.EdgePair{
			Source:	component.Edge{Node: fmt.Sprintf("%s pods", replicaSet1.Name), Connector: "", ConnectorType: "name", Type: component.EdgeTypeExplicit},
			Destination: component.Edge{Node: replicaSet1.Name, Connector: "", ConnectorType: "name", Type: component.EdgeTypeExplicit},
		},
		fmt.Sprintf("%s pods-%s", replicaSet1.Name, service1.Name): component.EdgePair{
			Source:	component.Edge{Node: fmt.Sprintf("%s pods", replicaSet1.Name), Connector: "", ConnectorType: "name", Type: component.EdgeTypeExplicit},
			Destination: component.Edge{Node: service1.Name, Connector: "", ConnectorType: "name", Type: component.EdgeTypeExplicit},
		},
		fmt.Sprintf("%s-%s", replicaSet1.Name, deployment.Name): component.EdgePair{
			Source:	component.Edge{Node: fmt.Sprintf("%s", replicaSet1.Name), Connector: "", ConnectorType: "name", Type: component.EdgeTypeExplicit},
			Destination: component.Edge{Node: deployment.Name, Connector: "", ConnectorType: "name", Type: component.EdgeTypeExplicit},
		},
		fmt.Sprintf("%s pods-%s", replicaSet3.Name, replicaSet3.Name): component.EdgePair{
			Source:	component.Edge{Node: fmt.Sprintf("%s pods", replicaSet3.Name), Connector: "", ConnectorType: "name", Type: component.EdgeTypeExplicit},
			Destination: component.Edge{Node: replicaSet3.Name, Connector: "", ConnectorType: "name", Type: component.EdgeTypeExplicit},
		},
		fmt.Sprintf("%s pods-%s", replicaSet3.Name, service1.Name): component.EdgePair{
			Source:	component.Edge{Node: fmt.Sprintf("%s pods", replicaSet3.Name), Connector: "", ConnectorType: "name", Type: component.EdgeTypeExplicit},
			Destination: component.Edge{Node: service1.Name, Connector: "", ConnectorType: "name", Type: component.EdgeTypeExplicit},
		},
		fmt.Sprintf("%s-%s", replicaSet3.Name, deployment.Name): component.EdgePair{
			Source:	component.Edge{Node: fmt.Sprintf("%s", replicaSet3.Name), Connector: "", ConnectorType: "name", Type: component.EdgeTypeExplicit},
			Destination: component.Edge{Node: deployment.Name, Connector: "", ConnectorType: "name", Type: component.EdgeTypeExplicit},
		},
		fmt.Sprintf("%s-%s pods", serviceAccount.Name, replicaSet3.Name): component.EdgePair{
			Source:	component.Edge{Node: fmt.Sprintf("%s pods", replicaSet3.Name), Connector: "", ConnectorType: "name", Type: component.EdgeTypeExplicit},
			Destination: component.Edge{Node: serviceAccount.Name, Connector: "", ConnectorType: "name", Type: component.EdgeTypeExplicit},
		},
		fmt.Sprintf("%s-%s pods", serviceAccount.Name, replicaSet1.Name): component.EdgePair{
			Source:	component.Edge{Node: fmt.Sprintf("%s pods", replicaSet1.Name), Connector: "", ConnectorType: "name", Type: component.EdgeTypeExplicit},
			Destination: component.Edge{Node: serviceAccount.Name, Connector: "", ConnectorType: "name", Type: component.EdgeTypeExplicit},
		},
		fmt.Sprintf("%s-%s", serviceAccount.Name, pod3.Name): component.EdgePair{
			Source:	component.Edge{Node: pod3.Name, Connector: "", ConnectorType: "name", Type: component.EdgeTypeExplicit},
			Destination: component.Edge{Node: fmt.Sprintf("%s", serviceAccount.Name), Connector: "", ConnectorType: "name", Type: component.EdgeTypeExplicit},
		},
	}

	list, err := handler.AdjacencyList()
	require.NoError(t, err)
	require.Equal(t, expectedAdjList, list, "adjacency lists don't match")

	objectPath := func(t *testing.T, object runtime.Object) *component.Link {
		accessor, err := meta.Accessor(object)
		require.NoError(t, err)
		name := accessor.GetName()
		return component.NewLink("", name, path.Join("/", name))
	}

	podStatus1 := component.NewPodStatus()
	podStatus1.AddSummary(pod1.Name, nil, component.NodeStatusOK)
	podStatus1.AddSummary(pod2.Name, nil, component.NodeStatusOK)

	podStatus2 := component.NewPodStatus()
	podStatus2.AddSummary(pod4.Name, nil, component.NodeStatusOK)

	expectedNodes := component.Nodes{
		string(cr.UID): {
			Name:       cr.Name,
			APIVersion: cr.APIVersion,
			Kind:       cr.Kind,
			Status:     component.NodeStatusOK,
			Path:       objectPath(t, cr),
			HasChildren: false,
			Created: cr.GetCreationTimestamp().Time.Unix(),
		},
		string(deployment.UID): {
			Name:       deployment.Name,
			APIVersion: deployment.APIVersion,
			Kind:       deployment.Kind,
			Status:     component.NodeStatusOK,
			Path:       objectPath(t, deployment),
			HasChildren: true,
			Namespace: "namespace",
			Created: 	deployment.GetCreationTimestamp().Time.Unix(),
		},
		string(replicaSet1.UID): {
			Name:       replicaSet1.Name,
			APIVersion: "apps/v1",
			Kind:       replicaSet1.Kind,
			Status:     component.NodeStatusOK,
			Path:       objectPath(t, replicaSet1),
			HasChildren: true,
			ParentID: string(deployment.UID),
			Namespace: "namespace",
			Created: 	replicaSet1.GetCreationTimestamp().Time.Unix(),
		},
		string(replicaSet3.UID): {
			Name:       replicaSet3.Name,
			APIVersion: "extensions/v1beta1",
			Kind:       replicaSet3.Kind,
			Status:     component.NodeStatusOK,
			Path:       objectPath(t, replicaSet3),
			HasChildren: true,
			ParentID: string(deployment.UID),
			Namespace: "namespace",
			Created: 	replicaSet3.GetCreationTimestamp().Time.Unix(),
		},
		string(pod3.UID): {
			Name:       pod3.Name,
			APIVersion: pod3.APIVersion,
			Kind:       pod3.Kind,
			Status:     component.NodeStatusOK,
			Path:       objectPath(t, pod3),
			HasChildren: false,
			Namespace: "namespace",
			Created: 	pod3.GetCreationTimestamp().Time.Unix(),
		},
		fmt.Sprintf("%s pods", replicaSet1.Name): {
			Name:       fmt.Sprintf("%s pods", replicaSet1.Name),
			APIVersion: "v1",
			Kind:       "Pod",
			Status:     component.NodeStatusOK,
			Details:    []component.Component{podStatus1},
			ParentID: string(replicaSet1.UID),
			HasChildren: false,
			Namespace: "namespace",
			Created: 	pod3.GetCreationTimestamp().Time.Unix(),
		},
		fmt.Sprintf("%s pods", replicaSet3.Name): {
			Name:       fmt.Sprintf("%s pods", replicaSet3.Name),
			APIVersion: "v1",
			Kind:       "Pod",
			Status:     component.NodeStatusOK,
			Details:    []component.Component{podStatus2},
			ParentID: string(replicaSet3.UID),
			Namespace: "namespace",
			Created: 	pod4.GetCreationTimestamp().Time.Unix(),
			HasChildren: false,
		},
		string(serviceAccount.UID): {
			Name:       serviceAccount.Name,
			APIVersion: serviceAccount.APIVersion,
			Kind:       serviceAccount.Kind,
			Status:     component.NodeStatusOK,
			Path:       objectPath(t, serviceAccount),
			HasChildren: false,
			Namespace: "namespace",
			Created: 	serviceAccount.GetCreationTimestamp().Time.Unix(),
		},
		string(service1.UID): {
			Name:       service1.Name,
			APIVersion: service1.APIVersion,
			Kind:       service1.Kind,
			Status:     component.NodeStatusOK,
			Path:       objectPath(t, service1),
			HasChildren: false,
			Namespace: "namespace",
			Created: 	service1.GetCreationTimestamp().Time.Unix(),
		},
	}

	nodes, err := handler.Nodes(ctx)
	require.NoError(t, err)

	testutil.AssertJSONEqual(t, expectedNodes, nodes)
}

func Test_edgeName(t *testing.T) {
	replicaSet := testutil.CreateAppReplicaSet("replica-set")
	replicaSetPod := testutil.CreatePod("pod")
	replicaSetPod.SetOwnerReferences(testutil.ToOwnerReferences(t, replicaSet))

	tests := []struct {
		name     string
		object   runtime.Object
		expected string
		isErr    bool
	}{
		{
			name:     "in general",
			object:   testutil.CreateDeployment("deployment"),
			expected: "deployment",
		},
		{
			name:     "pod",
			object:   testutil.CreatePod("pod"),
			expected: "pod",
		},
		{
			name:     "pod in replica set",
			object:   replicaSetPod,
			expected: "replica-set pods",
		},
	}

	for i := range tests {
		test := tests[i]
		t.Run(test.name, func(t *testing.T) {
			object := testutil.ToUnstructured(t, test.object)

			got, err := edgeName(object)
			if test.isErr {
				require.Error(t, err)
				return
			}
			require.NoError(t, err)

			assert.Equal(t, test.expected, got)
		})
	}
}

func Test_isObjectParent(t *testing.T) {
	deployment := testutil.CreateDeployment("deployment")

	replicaSet1 := testutil.CreateAppReplicaSet("replica-set-1")
	replicaSet1.SetOwnerReferences(testutil.ToOwnerReferences(t, deployment))

	replicaSet2 := testutil.CreateAppReplicaSet("replica-set-2")

	tests := []struct {
		name     string
		parent   runtime.Object
		child    runtime.Object
		expected bool
		wantErr  bool
	}{
		{
			name:     "is parent",
			parent:   deployment,
			child:    replicaSet1,
			expected: true,
		},
		{
			name:     "is not parent",
			parent:   deployment,
			child:    replicaSet2,
			expected: false,
		},
	}

	for i := range tests {
		test := tests[i]
		t.Run(test.name, func(t *testing.T) {
			got, err := isObjectParent(test.child, test.parent)
			if test.wantErr {
				require.Error(t, err)
				return
			}
			require.NoError(t, err)
			assert.Equal(t, test.expected, got)
		})
	}
}

func Test_adjListStorage(t *testing.T) {
	als := &adjListStorage{}

	assert.False(t, als.hasEdgeForKey("1"))
	als.addEdgeForKey("1", "2", objectvisitor.EdgeDefinition{}, objectvisitor.EdgeDefinition{})
	assert.True(t, als.hasEdgeForKey("2-1"))
	assert.True(t, als.hasKey("2-1"))
}

func mockLinkPath(t *testing.T, dashConfig *configFake.MockDash, object runtime.Object) {
	accessor, err := meta.Accessor(object)
	require.NoError(t, err)

	apiVersion, kind := object.GetObjectKind().GroupVersionKind().ToAPIVersionAndKind()

	label := path.Join("/", accessor.GetName())

	dashConfig.EXPECT().
		ObjectPath(accessor.GetNamespace(), apiVersion, kind, accessor.GetName()).
		Return(label, nil).
		AnyTimes()
}

func Test_establishRelations(t *testing.T) {
	deployment := testutil.CreateDeployment("deployment")
	deploymentUnstructured := testutil.ToUnstructured(t, deployment)

	replicaSet := testutil.CreateAppReplicaSet("replica-set")
	replicaSet.Spec.Replicas = pointer.Int32Ptr(1)
	replicaSet.SetOwnerReferences(testutil.ToOwnerReferences(t, deployment))
	replicaSetUnstructured := testutil.ToUnstructured(t, replicaSet)

	serviceAccount := testutil.CreateServiceAccount("service-account")
	serviceAccountUnstructured := testutil.ToUnstructured(t, serviceAccount)

	pod1 := testutil.CreatePod("pod-1")
	pod1.Spec.ServiceAccountName = serviceAccount.Name
	pod1.SetOwnerReferences(testutil.ToOwnerReferences(t, replicaSet))
	pod1Unstructured := testutil.ToUnstructured(t, pod1)
	pod2 := testutil.CreatePod("pod-2")
	pod2.Spec.ServiceAccountName = serviceAccount.Name
	pod2.SetOwnerReferences(testutil.ToOwnerReferences(t, replicaSet))
	pod2Unstructured := testutil.ToUnstructured(t, pod2)

	service := testutil.CreateService("service")
	serviceUnstructured := testutil.ToUnstructured(t, service)

	controller := gomock.NewController(t)
	defer controller.Finish()

	dashConfig := configFake.NewMockDash(controller)

	objectStore := storeFake.NewMockStore(controller)
	dashConfig.EXPECT().ObjectStore().Return(objectStore).AnyTimes()

	pluginManager := pluginFake.NewMockManagerInterface(controller)
	dashConfig.EXPECT().PluginManager().Return(pluginManager).AnyTimes()

	objectStatus := fake.NewMockObjectStatus(controller)
	objectStatus.EXPECT().
		Status(gomock.Any(), gomock.Any()).
		Return(&objectstatus.ObjectStatus{}, nil).
		AnyTimes()

	handler, err := NewHandler(dashConfig, SetHandlerObjectStatus(objectStatus))
	require.NoError(t, err)

	ctx := context.Background()
	mockRelations := func(a *unstructured.Unstructured, objects ...*unstructured.Unstructured) {
		for _, b := range objects {
			edgeA:= objectvisitor.EdgeDefinition{Object: a, Connector: "", ConnectorType: objectvisitor.ConnectorTypeName}
			edgeB:= objectvisitor.EdgeDefinition{Object: b, Connector: "", ConnectorType: objectvisitor.ConnectorTypeName}
			require.NoError(t, handler.AddEdge(ctx, edgeA, edgeB))
			require.NoError(t, handler.AddEdge(ctx, edgeB, edgeA))
			require.NoError(t, handler.Process(ctx, b))
		}
		require.NoError(t, handler.Process(ctx, a))
	}

	mockRelations(deploymentUnstructured, replicaSetUnstructured)
	mockRelations(replicaSetUnstructured, pod1Unstructured, pod2Unstructured)
	mockRelations(serviceUnstructured, pod1Unstructured, pod2Unstructured)

	require.NoError(t, handler.AddEdge(ctx,objectvisitor.EdgeDefinition{Object: pod1Unstructured, Connector: "", ConnectorType: objectvisitor.ConnectorTypeName},
		objectvisitor.EdgeDefinition{Object: serviceAccountUnstructured, Connector: "", ConnectorType: objectvisitor.ConnectorTypeName}))
	require.NoError(t, handler.AddEdge(ctx, objectvisitor.EdgeDefinition{Object: pod2Unstructured, Connector: "", ConnectorType: objectvisitor.ConnectorTypeName},
		objectvisitor.EdgeDefinition{Object: serviceAccountUnstructured, Connector: "", ConnectorType: objectvisitor.ConnectorTypeName}))
	require.NoError(t, handler.Process(ctx, serviceAccountUnstructured))

	mockLinkPath(t, dashConfig, deployment)
	mockLinkPath(t, dashConfig, replicaSet)
	mockLinkPath(t, dashConfig, pod1)
	mockLinkPath(t, dashConfig, pod2)
	mockLinkPath(t, dashConfig, serviceAccount)
	mockLinkPath(t, dashConfig, service)

	expectedAdjList := &component.AdjList{
		"replica-set pods-replica-set":     component.EdgePair{Source: component.Edge{Node: "replica-set pods", Connector: "", ConnectorType: "name", Type: "explicit"}, Destination: component.Edge{Node: "replica-set", Connector: "", ConnectorType: "name", Type: "explicit"}},
		"replica-set pods-service":         component.EdgePair{Source: component.Edge{Node: "replica-set pods", Connector: "", ConnectorType: "name", Type: "explicit"}, Destination: component.Edge{Node: "service", Connector: "", ConnectorType: "name", Type: "explicit"}},
		"replica-set-deployment":           component.EdgePair{Source: component.Edge{Node: "replica-set", Connector: "", ConnectorType: "name", Type: "explicit"}, Destination: component.Edge{Node: "deployment", Connector: "", ConnectorType: "name", Type: "explicit"}},
		"service-account-replica-set pods": component.EdgePair{Source: component.Edge{Node: "replica-set pods", Connector: "", ConnectorType: "name", Type: "explicit"}, Destination: component.Edge{Node: "service-account", Connector: "", ConnectorType: "name", Type: "explicit"}},
	}

	list, err := handler.AdjacencyList()
	require.NoError(t, err)
	require.Equal(t, expectedAdjList, list, "adjacency lists don't match")

	objectPath := func(t *testing.T, object runtime.Object) *component.Link {
		accessor, err := meta.Accessor(object)
		require.NoError(t, err)
		name := accessor.GetName()
		return component.NewLink("", name, path.Join("/", name))
	}

	podStatus1 := component.NewPodStatus()
	podStatus1.AddSummary(pod1.Name, nil, component.NodeStatusOK)
	podStatus1.AddSummary(pod2.Name, nil, component.NodeStatusOK)

	expectedNodes := component.Nodes{
		string(deployment.UID): {
			Name:       deployment.Name,
			APIVersion: deployment.APIVersion,
			Kind:       deployment.Kind,
			Status:     component.NodeStatusOK,
			Path:       objectPath(t, deployment),
			HasChildren: true,
			Namespace: "namespace",
			Created: 	deployment.GetCreationTimestamp().Time.Unix(),
		},
		string(replicaSet.UID): {
			Name:       replicaSet.Name,
			APIVersion: "apps/v1",
			Kind:       replicaSet.Kind,
			Status:     component.NodeStatusOK,
			Path:       objectPath(t, replicaSet),
			HasChildren: true,
			ParentID: string(deployment.UID),
			Namespace: "namespace",
			Created: 	replicaSet.GetCreationTimestamp().Time.Unix(),
		},
		fmt.Sprintf("%s pods", replicaSet.Name): {
			Name:       fmt.Sprintf("%s pods", replicaSet.Name),
			APIVersion: "v1",
			Kind:       "Pod",
			Status:     component.NodeStatusOK,
			Details:    []component.Component{podStatus1},
			HasChildren: false,
			ParentID: string(replicaSet.UID),
			Namespace: "namespace",
			Created: 	pod1.GetCreationTimestamp().Time.Unix(),
		},
		string(serviceAccount.UID): {
			Name:       serviceAccount.Name,
			APIVersion: serviceAccount.APIVersion,
			Kind:       serviceAccount.Kind,
			Status:     component.NodeStatusOK,
			Path:       objectPath(t, serviceAccount),
			HasChildren: false,
			Namespace: "namespace",
			Created: 	serviceAccount.GetCreationTimestamp().Time.Unix(),
		},
		string(service.UID): {
			Name:       service.Name,
			APIVersion: service.APIVersion,
			Kind:       service.Kind,
			Status:     component.NodeStatusOK,
			Path:       objectPath(t, service),
			HasChildren: false,
			Namespace: "namespace",
			Created: 	service.GetCreationTimestamp().Time.Unix(),
		},
	}

	nodes, err := handler.Nodes(ctx)
	require.NoError(t, err)

	testutil.AssertJSONEqual(t, expectedNodes, nodes)
}
