import { Shape } from '../app/modules/shared/components/presentation/cytoscape2/shapes';
import { BaseShape } from '../app/modules/shared/components/presentation/cytoscape2/base.shape';
import { Edge } from '../app/modules/shared/components/presentation/cytoscape2/edges';
import { ShapeUtils } from '../app/modules/shared/components/presentation/cytoscape2/shape.utils';

interface BackendEdgeDef {
  node: string;
  edge: string;
}

interface NodeDataDef {
  nodes: any;
  edges?: any;
}

export type BackendEdgesDef = Record<string, BackendEdgeDef[]>;

// this is temporary location for helpers until this functionality is done on backend
export function establishRelations(shapes: BaseShape[]): BaseShape[] {
  if(shapes) {
    shapes.forEach((shape: Shape) => {
      if (shape) {
        switch (shape.kind) {
          case 'ReplicaSet':
          case 'DaemonSet':
          case 'StatefulSet':
            shape.hasChildren = true;
            const pod: Shape = ShapeUtils.findByKind(shapes, 'Pod')[0] as Shape;
            if(pod) {
              pod.parentId = shape.id;
            }
            break;
          case 'Deployment':
            shape.hasChildren = true;
            const replica: Shape = ShapeUtils.findByKind(
              shapes,
              'ReplicaSet'
            )[0] as Shape;
            if(replica) {
              replica.parentId = shape.id;
            }
            break;
          default:
            break;
        }
      }
    });

    shapes.sort(
      (a: BaseShape, b: BaseShape) =>
        ShapeUtils.shapeOrder(a.kind) - ShapeUtils.shapeOrder(b.kind)
    );
  }
  return shapes;
}

export function createEdges(shapes: BaseShape[], edges: BackendEdgesDef) {
  if (edges) {
    Object.entries(edges).map(([key, value]) => {
      value.forEach(val => {
        const sourceShape: BaseShape = ShapeUtils.findById(shapes, key)[0];
        const targetShape: BaseShape = ShapeUtils.findById(shapes, val.node)[0];

        if (
          sourceShape &&
          targetShape &&
          sourceShape.kind !== targetShape.kind
        ) {
          shapes.push(new Edge(`${key}-${val.node}`, val.node, key));
        }
      });
    });
  }
}

export const REAL_DATA_STATEFUL_SET: NodeDataDef = {
  edges: {
    'a4e5517e-0563-4158-88d3-a0492fe18cd5': [
      {
        node: '3c81e771-d723-403d-a19b-be7ce87ff7f2',
        edge: 'explicit',
      },
    ],
    'kafka pods': [
      {
        node: '0bf159aa-01ea-4742-a6a2-becef1178827',
        edge: 'explicit',
      },
      {
        node: '14eda8ed-87c3-4aa1-a3cb-9f4279704fc5',
        edge: 'explicit',
      },
      { node: 'a4e5517e-0563-4158-88d3-a0492fe18cd5', edge: 'explicit' },
    ],
  },
  nodes: {
    '0bf159aa-01ea-4742-a6a2-becef1178827': {
      name: 'kafka-config',
      apiVersion: 'v1',
      kind: 'ConfigMap',
      status: 'ok',
      details: [
        { metadata: { type: 'text' }, config: { value: 'v1 ConfigMap is OK' } },
      ],
      path: {
        metadata: {
          type: 'link',
          title: [{ metadata: { type: 'text' }, config: { value: '' } }],
        },
        config: {
          value: 'kafka-config',
          ref:
            '/overview/namespace/milan/config-and-storage/config-maps/kafka-config',
        },
      },
    },
    '14eda8ed-87c3-4aa1-a3cb-9f4279704fc5': {
      name: 'kafka-headless',
      apiVersion: 'v1',
      kind: 'Service',
      status: 'ok',
      details: [
        { metadata: { type: 'text' }, config: { value: 'Service is OK' } },
      ],
      path: {
        metadata: {
          type: 'link',
          title: [{ metadata: { type: 'text' }, config: { value: '' } }],
        },
        config: {
          value: 'kafka-headless',
          ref:
            '/overview/namespace/milan/discovery-and-load-balancing/services/kafka-headless',
        },
      },
    },
    '3c81e771-d723-403d-a19b-be7ce87ff7f2': {
      name: 'default-token-4dln7',
      apiVersion: 'v1',
      kind: 'Secret',
      status: 'ok',
      details: [
        { metadata: { type: 'text' }, config: { value: 'v1 Secret is OK' } },
      ],
      path: {
        metadata: {
          type: 'link',
          title: [{ metadata: { type: 'text' }, config: { value: '' } }],
        },
        config: {
          value: 'default-token-4dln7',
          ref:
            '/overview/namespace/milan/config-and-storage/secrets/default-token-4dln7',
        },
      },
    },
    '9cd5e4f0-4979-4119-9c93-7df18bd88059': {
      name: 'kafka',
      apiVersion: 'apps/v1',
      kind: 'StatefulSet',
      status: 'ok',
      details: [
        { metadata: { type: 'text' }, config: { value: 'Stateful Set is OK' } },
      ],
      path: {
        metadata: {
          type: 'link',
          title: [{ metadata: { type: 'text' }, config: { value: '' } }],
        },
        config: {
          value: 'kafka',
          ref: '/overview/namespace/milan/workloads/stateful-sets/kafka',
        },
      },
    },
    'a4e5517e-0563-4158-88d3-a0492fe18cd5': {
      name: 'default',
      apiVersion: 'v1',
      kind: 'ServiceAccount',
      status: 'ok',
      details: [
        {
          metadata: { type: 'text' },
          config: { value: 'v1 ServiceAccount is OK' },
        },
      ],
      path: {
        metadata: {
          type: 'link',
          title: [{ metadata: { type: 'text' }, config: { value: '' } }],
        },
        config: {
          value: 'default',
          ref:
            '/overview/namespace/milan/config-and-storage/service-accounts/default',
        },
      },
    },
    'kafka pods': {
      name: 'kafka pods',
      apiVersion: 'v1',
      kind: 'Pod',
      status: 'ok',
      details: [
        {
          metadata: { type: 'podStatus' },
          config: {
            pods: {
              'kafka-0': {
                details: [
                  { metadata: { type: 'text' }, config: { value: '' } },
                ],
                status: 'ok',
              },
            },
          },
        },
      ],
    },
  },
};

export const REAL_DATA_DAEMON_SET: NodeDataDef = {
  edges: {
    'f93575bb-0f33-4aa0-8d64-6ebb1cbdf7ce': [
      {
        node: 'f5beb4cb-2c7b-474d-9719-0ac02fd8b8b7',
        edge: 'explicit',
      },
    ],
    'hubble pods': [
      {
        node: 'f69e1b15-a257-42fa-a367-d4a5eb70d8cf',
        edge: 'explicit',
      },
      { node: 'f93575bb-0f33-4aa0-8d64-6ebb1cbdf7ce', edge: 'explicit' },
    ],
  },
  nodes: {
    '2ca0da85-f263-4087-a732-73e5501c0a47': {
      name: 'hubble',
      apiVersion: 'apps/v1',
      kind: 'DaemonSet',
      status: 'ok',
      details: [
        { metadata: { type: 'text' }, config: { value: 'Daemon Set is OK' } },
      ],
      path: {
        metadata: {
          type: 'link',
          title: [{ metadata: { type: 'text' }, config: { value: '' } }],
        },
        config: {
          value: 'hubble',
          ref: '/overview/namespace/kube-system/workloads/daemon-sets/hubble',
        },
      },
    },
    'f5beb4cb-2c7b-474d-9719-0ac02fd8b8b7': {
      name: 'hubble-token-smc5q',
      apiVersion: 'v1',
      kind: 'Secret',
      status: 'ok',
      details: [
        { metadata: { type: 'text' }, config: { value: 'v1 Secret is OK' } },
      ],
      path: {
        metadata: {
          type: 'link',
          title: [{ metadata: { type: 'text' }, config: { value: '' } }],
        },
        config: {
          value: 'hubble-token-smc5q',
          ref:
            '/overview/namespace/kube-system/config-and-storage/secrets/hubble-token-smc5q',
        },
      },
    },
    'f69e1b15-a257-42fa-a367-d4a5eb70d8cf': {
      name: 'hubble-grpc',
      apiVersion: 'v1',
      kind: 'Service',
      status: 'warning',
      details: [
        {
          metadata: { type: 'text' },
          config: { value: 'Service has no endpoint addresses' },
        },
      ],
      path: {
        metadata: {
          type: 'link',
          title: [{ metadata: { type: 'text' }, config: { value: '' } }],
        },
        config: {
          value: 'hubble-grpc',
          ref:
            '/overview/namespace/kube-system/discovery-and-load-balancing/services/hubble-grpc',
        },
      },
    },
    'f93575bb-0f33-4aa0-8d64-6ebb1cbdf7ce': {
      name: 'hubble',
      apiVersion: 'v1',
      kind: 'ServiceAccount',
      status: 'ok',
      details: [
        {
          metadata: { type: 'text' },
          config: { value: 'v1 ServiceAccount is OK' },
        },
      ],
      path: {
        metadata: {
          type: 'link',
          title: [{ metadata: { type: 'text' }, config: { value: '' } }],
        },
        config: {
          value: 'hubble',
          ref:
            '/overview/namespace/kube-system/config-and-storage/service-accounts/hubble',
        },
      },
    },
    'hubble pods': {
      name: 'hubble pods',
      apiVersion: 'v1',
      kind: 'Pod',
      status: 'ok',
      details: [
        {
          metadata: { type: 'podStatus' },
          config: {
            pods: {
              'hubble-6ghb8': {
                details: [
                  {
                    metadata: { type: 'text' },
                    config: { value: '' },
                  },
                ],
                status: 'ok',
              },
              'hubble-h7gvf': {
                details: [
                  { metadata: { type: 'text' }, config: { value: '' } },
                ],
                status: 'ok',
              },
              'hubble-wm8rn': {
                details: [
                  { metadata: { type: 'text' }, config: { value: '' } },
                ],
                status: 'ok',
              },
            },
          },
        },
      ],
    },
  },
};

export const REAL_DATA_DAEMON_SET2: NodeDataDef = {
  nodes: {
    '16428c94-a848-47d5-b1e3-c8245b57959b': {
      name: 'metadata-proxy-v0.1',
      apiVersion: 'apps/v1',
      kind: 'DaemonSet',
      status: 'ok',
      details: [
        { metadata: { type: 'text' }, config: { value: 'Daemon Set is OK' } },
      ],
      path: {
        metadata: {
          type: 'link',
          title: [{ metadata: { type: 'text' }, config: { value: '' } }],
        },
        config: {
          value: 'metadata-proxy-v0.1',
          ref:
            '/overview/namespace/kube-system/workloads/daemon-sets/metadata-proxy-v0.1',
        },
      },
    },
  },
};

export const REAL_DATA_DEPLOYMENT: NodeDataDef = {
  edges: {
    '96dcb87c-0d5e-49f8-a084-cf79e054a4bd': [
      {
        node: 'elasticsearch-dbf4fc4df pods',
        edge: 'explicit',
      },
    ],
    'a4e5517e-0563-4158-88d3-a0492fe18cd5': [
      { node: '3c81e771-d723-403d-a19b-be7ce87ff7f2', edge: 'explicit' },
    ],
    'elasticsearch-dbf4fc4df pods': [
      { node: 'a4e5517e-0563-4158-88d3-a0492fe18cd5', edge: 'explicit' },
    ],
  },
  nodes: {
    '04ddee7a-342c-46b0-8c57-ec8682aff2ef': {
      name: 'elasticsearch-dbf4fc4df',
      apiVersion: 'apps/v1',
      kind: 'ReplicaSet',
      status: 'ok',
      details: [
        { metadata: { type: 'text' }, config: { value: 'Replica Set is OK' } },
      ],
      path: {
        metadata: {
          type: 'link',
          title: [{ metadata: { type: 'text' }, config: { value: '' } }],
        },
        config: {
          value: 'elasticsearch-dbf4fc4df',
          ref:
            '/overview/namespace/milan/workloads/replica-sets/elasticsearch-dbf4fc4df',
        },
      },
    },
    '3c81e771-d723-403d-a19b-be7ce87ff7f2': {
      name: 'default-token-4dln7',
      apiVersion: 'v1',
      kind: 'Secret',
      status: 'ok',
      details: [
        { metadata: { type: 'text' }, config: { value: 'v1 Secret is OK' } },
      ],
      path: {
        metadata: {
          type: 'link',
          title: [{ metadata: { type: 'text' }, config: { value: '' } }],
        },
        config: {
          value: 'default-token-4dln7',
          ref:
            '/overview/namespace/milan/config-and-storage/secrets/default-token-4dln7',
        },
      },
    },
    '5b287e6a-94f2-4ac3-8241-17fd87d3a114': {
      name: 'elasticsearch',
      apiVersion: 'apps/v1',
      kind: 'Deployment',
      status: 'ok',
      details: [
        { metadata: { type: 'text' }, config: { value: 'Deployment is OK' } },
      ],
      path: {
        metadata: {
          type: 'link',
          title: [{ metadata: { type: 'text' }, config: { value: '' } }],
        },
        config: {
          value: 'elasticsearch',
          ref: '/overview/namespace/milan/workloads/deployments/elasticsearch',
        },
      },
    },
    '96dcb87c-0d5e-49f8-a084-cf79e054a4bd': {
      name: 'elasticsearch',
      apiVersion: 'v1',
      kind: 'Service',
      status: 'ok',
      details: [
        { metadata: { type: 'text' }, config: { value: 'Service is OK' } },
      ],
      path: {
        metadata: {
          type: 'link',
          title: [{ metadata: { type: 'text' }, config: { value: '' } }],
        },
        config: {
          value: 'elasticsearch',
          ref:
            '/overview/namespace/milan/discovery-and-load-balancing/services/elasticsearch',
        },
      },
    },
    'a4e5517e-0563-4158-88d3-a0492fe18cd5': {
      name: 'default',
      apiVersion: 'v1',
      kind: 'ServiceAccount',
      status: 'ok',
      details: [
        {
          metadata: { type: 'text' },
          config: { value: 'v1 ServiceAccount is OK' },
        },
      ],
      path: {
        metadata: {
          type: 'link',
          title: [{ metadata: { type: 'text' }, config: { value: '' } }],
        },
        config: {
          value: 'default',
          ref:
            '/overview/namespace/milan/config-and-storage/service-accounts/default',
        },
      },
    },
    'elasticsearch-dbf4fc4df pods': {
      name: 'elasticsearch-dbf4fc4df pods',
      apiVersion: 'v1',
      kind: 'Pod',
      status: 'ok',
      details: [
        {
          metadata: { type: 'podStatus' },
          config: {
            pods: {
              'elasticsearch-dbf4fc4df-t4dlh': {
                details: [
                  {
                    metadata: { type: 'text' },
                    config: { value: '' },
                  },
                ],
                status: 'ok',
              },
            },
          },
        },
      ],
    },
  },
};
