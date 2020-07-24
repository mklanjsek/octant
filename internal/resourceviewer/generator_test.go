package resourceviewer

import (
	"context"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/require"

	"github.com/vmware-tanzu/octant/internal/resourceviewer/fake"
	"github.com/vmware-tanzu/octant/internal/testutil"
	"github.com/vmware-tanzu/octant/pkg/view/component"
)

func TestGenerateComponent(t *testing.T) {
	controller := gomock.NewController(t)
	defer controller.Finish()

	deployment := testutil.CreateDeployment("deployment")
	replicaSet := testutil.CreateAppReplicaSet("replica-set")
	replicaSet.SetOwnerReferences(testutil.ToOwnerReferences(t, deployment))

	details := fake.NewMockDetails(controller)
	nodes := component.Nodes{
		deployment.Name: {
			Name: deployment.Name,
		},
		replicaSet.Name: {
			Name: replicaSet.Name,
		},
	}
	details.EXPECT().
		Nodes(gomock.Any()).
		Return(nodes, nil)

	adjList := &component.AdjList{
		deployment.Name: component.EdgePair{
			Source:	component.Edge{Node: deployment.Name, Connector: "", ConnectorType: "name", Type: component.EdgeTypeExplicit},
			Destination: component.Edge{Node: replicaSet.Name, Connector: "", ConnectorType: "name", Type: component.EdgeTypeExplicit},
		},
	}
	details.EXPECT().
		AdjacencyList().
		Return(adjList, nil)

	ctx := context.Background()

	got, err := GenerateComponent(ctx, details, deployment.UID)
	require.NoError(t, err)

	expected := component.NewResourceViewer("Resource Viewer")
	expected.SetAccessor("resourceViewer")
	for name, node := range nodes {
		expected.AddNode(name, node)
	}

	for name, edges := range *adjList {
		require.NoError(t, expected.AddEdge(name, edges))
	}

	expected.Select(string(deployment.UID))

	component.AssertEqual(t, expected, got)
}
