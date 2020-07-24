/*
Copyright (c) 2019 the Octant contributors. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/

package component

import (
	"encoding/json"
	"github.com/pkg/errors"
)

type EdgePair struct {
	Source Edge `json:"source"`
	Destination Edge `json:"destination"`
}

// AdjList is an adjacency list - it maps nodes to edges
type AdjList map[string]EdgePair

// Edge represents a directed edge in a graph
type Edge struct {
	Node 			string `json:"node"`
	Connector 	  	string `json:"connector"`
	ConnectorType 	string `json:"connectorType"`
	Type 			EdgeType `json:"edge"`
}

// Add adds a directed edge to the adjacency list
func (al AdjList) Add(src string, edge EdgePair) {
	al[src] = edge
}

type NodeStatus string

const (
	// NodeStatusOK means a node is in a health state
	NodeStatusOK NodeStatus = "ok"
	// NodeStatusWarning means ...
	NodeStatusWarning NodeStatus = "warning"
	// NodeStatusError means ...
	NodeStatusError NodeStatus = "error"
)

// EdgeType represents whether a relationship between resources is implicit or explicit
type EdgeType string

const (
	// EdgeTypeImplicit is an implicit edge
	EdgeTypeImplicit = "implicit"
	// EdgeTypeExplicit is an explicit edge
	EdgeTypeExplicit = "explicit"
)

// Nodes is a set of graph nodes
type Nodes map[string]Node

// Node is a node in a graph, representing a kubernetes object
// IsNetwork is a hint to the layout engine.
type Node struct {
	Name       string      `json:"name,omitempty"`
	APIVersion string      `json:"apiVersion,omitempty"`
	Kind       string      `json:"kind,omitempty"`
	Status     NodeStatus  `json:"status,omitempty"`
	Details    []Component `json:"details,omitempty"`
	Path       *Link       `json:"path,omitempty"`
	ParentID   string      `json:"parentId,omitempty"`
	HasChildren bool       `json:"hasChildren"`
	Namespace  string      `json:"namespace,omitempty"`
	Created    int64 		`json:"created"`
}

// ResourceViewerConfig is configuration for a resource viewer.
type ResourceViewerConfig struct {
	Edges    AdjList `json:"edges,omitempty"`
	Nodes    Nodes   `json:"nodes,omitempty"`
	Selected string  `json:"selected,omitempty"`
}

// ResourceView is a resource viewer component.
type ResourceViewer struct {
	base
	Config ResourceViewerConfig `json:"config,omitempty"`
}

// NewResourceViewer creates a resource viewer component.
func NewResourceViewer(title string) *ResourceViewer {
	return &ResourceViewer{
		base: newBase(typeResourceViewer, TitleFromString(title)),
		Config: ResourceViewerConfig{
			Edges: AdjList{},
			Nodes: Nodes{},
		},
	}

}

func (rv *ResourceViewer) AddEdge(nodeID string, edge EdgePair) error {
	rv.Config.Edges[nodeID] = edge
	return nil
}

func (rv *ResourceViewer) AddNode(id string, node Node) {
	rv.Config.Nodes[id] = node
}

func (rv *ResourceViewer) Select(id string) {
	rv.Config.Selected = id
}

func (rv *ResourceViewer) GetMetadata() Metadata {
	return rv.Metadata
}

func (rv *ResourceViewer) Validate() error {
	for _, edges := range rv.Config.Edges {
		if _, ok := rv.Config.Nodes[edges.Source.Node]; !ok {
			return errors.Errorf("Source node %q in edges does not have a node entry", edges.Source.Node)
		}
		if _, ok := rv.Config.Nodes[edges.Destination.Node]; !ok {
			return errors.Errorf("Destination node %q in edges does not have a node entry", edges.Destination.Node)
		}
	}

	return nil
}

type resourceViewerMarshal ResourceViewer

// MarshalJSON implements json.Marshaler
func (rv *ResourceViewer) MarshalJSON() ([]byte, error) {
	if err := rv.Validate(); err != nil {
		return nil, errors.WithMessage(err, "validate resource viewer component")
	}

	m := resourceViewerMarshal(*rv)
	m.Metadata.Type = typeResourceViewer
	m.Metadata.Title = rv.Metadata.Title

	return json.Marshal(&m)
}
