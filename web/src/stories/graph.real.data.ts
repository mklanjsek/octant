
interface NodeDataDef {
  nodes: any;
  edges?: any;
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
      hasChildren: false,
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
      hasChildren: false,
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
      hasChildren: false,
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
      hasChildren: true,
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
      hasChildren: false,
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
      hasChildren: false,
      parentId: '9cd5e4f0-4979-4119-9c93-7df18bd88059',
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
      hasChildren: true,
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
      hasChildren: false,
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
      hasChildren: false,
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
      hasChildren: false,
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
      hasChildren: false,
      parentId: '2ca0da85-f263-4087-a732-73e5501c0a47',
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
      hasChildren: false,
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
      hasChildren: true,
      parentId: '5b287e6a-94f2-4ac3-8241-17fd87d3a114',
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
      hasChildren: false,
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
      hasChildren: true,
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
      hasChildren: false,
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
      hasChildren: false,
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
      hasChildren: false,
      parentId: '04ddee7a-342c-46b0-8c57-ec8682aff2ef',
    },
  },
};

export const REAL_DATA_TWO_REPLICAS: NodeDataDef = {
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
      name: 'elasticsearch-1',
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
      hasChildren: true,
      parentId: '5b287e6a-94f2-4ac3-8241-17fd87d3a114',
    },
    '04ddee7a-342c-46b0-8c57-ec8682aff2ff': {
      name: 'elasticsearch-2',
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
      hasChildren: true,
      parentId: '5b287e6a-94f2-4ac3-8241-17fd87d3a114',
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
      hasChildren: false,
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
      hasChildren: true,
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
      hasChildren: false,
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
      hasChildren: false,
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
      hasChildren: false,
      parentId: '04ddee7a-342c-46b0-8c57-ec8682aff2ef',
    },
    'elasticsearch-pod2': {
      name: 'elasticsearch-pod2',
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
      hasChildren: false,
      parentId: '04ddee7a-342c-46b0-8c57-ec8682aff2ff',
    },
  },
};

export const REAL_DATA_JOB: NodeDataDef = {
  'edges': {
    '22bd5a20-320d-478d-95c1-d86018607fe1': [{
      'node': '8da7c4b4-bcd2-4805-a868-343831ee7c6f',
      'edge': 'explicit',
    }],
    'contour-certgen-v1.5.0 pods': [{
      'node': '22bd5a20-320d-478d-95c1-d86018607fe1',
      'edge': 'explicit',
    }],
  },
  'nodes': {
    '22bd5a20-320d-478d-95c1-d86018607fe1': {
      'name': 'contour-certgen',
      'apiVersion': 'v1',
      'kind': 'ServiceAccount',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'v1 ServiceAccount is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': {
          'value': 'contour-certgen',
          'ref': '/overview/namespace/projectcontour/config-and-storage/service-accounts/contour-certgen',
        },
      },
      'hasChildren': false,
      'namespace': 'projectcontour',
      'created': 1592934214,
    },
    '8da7c4b4-bcd2-4805-a868-343831ee7c6f': {
      'name': 'contour-certgen-token-pxq5j',
      'apiVersion': 'v1',
      'kind': 'Secret',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'v1 Secret is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': {
          'value': 'contour-certgen-token-pxq5j',
          'ref': '/overview/namespace/projectcontour/config-and-storage/secrets/contour-certgen-token-pxq5j',
        },
      },
      'hasChildren': false,
      'namespace': 'projectcontour',
      'created': 1592934214,
    },
    'cd0c78b8-99c7-4230-bf7b-e77a857d8499': {
      'name': 'contour-certgen-v1.5.0',
      'apiVersion': 'batch/v1',
      'kind': 'Job',
      'status': 'ok',
      'details': [{
        'metadata': { 'type': 'text' },
        'config': { 'value': 'Job has succeeded 1 time' },
      }, { 'metadata': { 'type': 'text' }, 'config': { 'value': 'Job completed in 5s' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': {
          'value': 'contour-certgen-v1.5.0',
          'ref': '/overview/namespace/projectcontour/workloads/jobs/contour-certgen-v1.5.0',
        },
      },
      'hasChildren': true,
      'namespace': 'projectcontour',
      'created': 1592934215,
    },
    'contour-certgen-v1.5.0 pods': {
      'name': 'contour-certgen-v1.5.0 pods',
      'apiVersion': 'v1',
      'kind': 'Pod',
      'status': 'warning',
      'details': [{
        'metadata': { 'type': 'podStatus' },
        'config': {
          'pods': {
            'contour-certgen-v1.5.0-8qxhm': {
              'details': [{
                'metadata': { 'type': 'text' },
                'config': { 'value': '' },
              }], 'status': 'warning',
            },
          },
        },
      }],
      'parentId': 'cd0c78b8-99c7-4230-bf7b-e77a857d8499',
      'hasChildren': false,
      'namespace': 'projectcontour',
      'created': 1592934215,
    },
  },
};

export const REAL_DATA_TWO_SECRETS: NodeDataDef = {
  'edges': {
    '51ba286e-2610-4c95-bb91-ab6d0b7bf563': [{
      'node': '3e040fc9-b214-465a-b465-b6f3ada2d910',
      'edge': 'explicit',
    }, { 'node': '6c7c57e7-4b67-4ee9-a71c-30fb1e13e86d', 'edge': 'explicit' }],
    'envoy pods': [{
      'node': '51ba286e-2610-4c95-bb91-ab6d0b7bf563',
      'edge': 'explicit',
    }, { 'node': 'd0fb763c-32a7-4c14-a105-011664e93e72', 'edge': 'explicit' }],
  },
  'nodes': {
    '3e040fc9-b214-465a-b465-b6f3ada2d910': {
      'name': 'envoycert',
      'apiVersion': 'v1',
      'kind': 'Secret',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'v1 Secret is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': {
          'value': 'envoycert',
          'ref': '/overview/namespace/projectcontour/config-and-storage/secrets/envoycert',
        },
      },
      'hasChildren': false,
      'namespace': 'projectcontour',
      'created': 1592934220,
    },
    '51ba286e-2610-4c95-bb91-ab6d0b7bf563': {
      'name': 'envoy',
      'apiVersion': 'v1',
      'kind': 'ServiceAccount',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'v1 ServiceAccount is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': {
          'value': 'envoy',
          'ref': '/overview/namespace/projectcontour/config-and-storage/service-accounts/envoy',
        },
      },
      'hasChildren': false,
      'namespace': 'projectcontour',
      'created': 1592934213,
    },
    '6c7c57e7-4b67-4ee9-a71c-30fb1e13e86d': {
      'name': 'envoy-token-vw5h5',
      'apiVersion': 'v1',
      'kind': 'Secret',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'v1 Secret is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': {
          'value': 'envoy-token-vw5h5',
          'ref': '/overview/namespace/projectcontour/config-and-storage/secrets/envoy-token-vw5h5',
        },
      },
      'hasChildren': false,
      'namespace': 'projectcontour',
      'created': 1592934213,
    },
    'd0fb763c-32a7-4c14-a105-011664e93e72': {
      'name': 'envoy',
      'apiVersion': 'v1',
      'kind': 'Service',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'Service is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': {
          'value': 'envoy',
          'ref': '/overview/namespace/projectcontour/discovery-and-load-balancing/services/envoy',
        },
      },
      'hasChildren': false,
      'namespace': 'projectcontour',
      'created': 1592934216,
    },
    'eb588004-f2d3-4bb9-b3ff-03e6bba3a216': {
      'name': 'envoy',
      'apiVersion': 'apps/v1',
      'kind': 'DaemonSet',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'Daemon Set is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        }, 'config': { 'value': 'envoy', 'ref': '/overview/namespace/projectcontour/workloads/daemon-sets/envoy' },
      },
      'hasChildren': true,
      'namespace': 'projectcontour',
      'created': 1592934217,
    },
    'envoy pods': {
      'name': 'envoy pods',
      'apiVersion': 'v1',
      'kind': 'Pod',
      'status': 'ok',
      'details': [{
        'metadata': { 'type': 'podStatus' },
        'config': {
          'pods': {
            'envoy-5b9zx': {
              'details': [{
                'metadata': { 'type': 'text' },
                'config': { 'value': '' },
              }], 'status': 'ok',
            },
            'envoy-8cp4j': {
              'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
              'status': 'ok',
            },
            'envoy-v5t6q': {
              'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
              'status': 'ok',
            },
          },
        },
      }],
      'parentId': 'eb588004-f2d3-4bb9-b3ff-03e6bba3a216',
      'hasChildren': false,
      'namespace': 'projectcontour',
      'created': 1592934217,
    },
  },
}

