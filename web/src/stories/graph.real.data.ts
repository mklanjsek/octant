
interface NodeDataDef {
  nodes: any;
  edges?: any;
}

export const REAL_DATA_STATEFUL_SET: NodeDataDef = {
  'edges': {
    '0bf159aa-01ea-4742-a6a2-becef1178827-kafka pods': {
      'source': {
        'node': 'kafka pods',
        'connector': 'name: kafka-config',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': '0bf159aa-01ea-4742-a6a2-becef1178827',
        'connector': 'configMap.name: kafka-config',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
    '3c81e771-d723-403d-a19b-be7ce87ff7f2-a4e5517e-0563-4158-88d3-a0492fe18cd5': {
      'source': {
        'node': 'a4e5517e-0563-4158-88d3-a0492fe18cd5',
        'connector': 'secrets.name: default-token-4dln7',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': '3c81e771-d723-403d-a19b-be7ce87ff7f2',
        'connector': 'name: default-token-4dln7',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
    'a4e5517e-0563-4158-88d3-a0492fe18cd5-kafka pods': {
      'source': {
        'node': 'kafka pods',
        'connector': 'serviceAccount: default',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': 'a4e5517e-0563-4158-88d3-a0492fe18cd5',
        'connector': 'name: default',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
    'kafka pods-14eda8ed-87c3-4aa1-a3cb-9f4279704fc5': {
      'source': {
        'node': 'kafka pods',
        'connector': 'app: kafka',
        'connectorType': 'label',
        'edge': 'explicit',
      },
      'destination': {
        'node': '14eda8ed-87c3-4aa1-a3cb-9f4279704fc5',
        'connector': 'app: kafka',
        'connectorType': 'selector',
        'edge': 'explicit',
      },
    },
  },
  'nodes': {
    '0bf159aa-01ea-4742-a6a2-becef1178827': {
      'name': 'kafka-config',
      'apiVersion': 'v1',
      'kind': 'ConfigMap',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'v1 ConfigMap is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': {
          'value': 'kafka-config',
          'ref': '/overview/namespace/milan/config-and-storage/config-maps/kafka-config',
        },
      },
      'hasChildren': false,
      'namespace': 'milan',
      'created': 1594045849,
    },
    '14eda8ed-87c3-4aa1-a3cb-9f4279704fc5': {
      'name': 'kafka-headless',
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
          'value': 'kafka-headless',
          'ref': '/overview/namespace/milan/discovery-and-load-balancing/services/kafka-headless',
        },
      },
      'hasChildren': false,
      'namespace': 'milan',
      'created': 1594045849,
    },
    '3c81e771-d723-403d-a19b-be7ce87ff7f2': {
      'name': 'default-token-4dln7',
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
          'value': 'default-token-4dln7',
          'ref': '/overview/namespace/milan/config-and-storage/secrets/default-token-4dln7',
        },
      },
      'hasChildren': false,
      'namespace': 'milan',
      'created': 1592846412,
    },
    '9cd5e4f0-4979-4119-9c93-7df18bd88059': {
      'name': 'kafka',
      'apiVersion': 'apps/v1',
      'kind': 'StatefulSet',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'Stateful Set is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        }, 'config': { 'value': 'kafka', 'ref': '/overview/namespace/milan/workloads/stateful-sets/kafka' },
      },
      'hasChildren': true,
      'namespace': 'milan',
      'created': 1594045849,
    },
    'a4e5517e-0563-4158-88d3-a0492fe18cd5': {
      'name': 'default',
      'apiVersion': 'v1',
      'kind': 'ServiceAccount',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'v1 ServiceAccount is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': { 'value': 'default', 'ref': '/overview/namespace/milan/config-and-storage/service-accounts/default' },
      },
      'hasChildren': false,
      'namespace': 'milan',
      'created': 1592846412,
    },
    'kafka pods': {
      'name': 'kafka pods',
      'apiVersion': 'v1',
      'kind': 'Pod',
      'status': 'ok',
      'details': [{
        'metadata': { 'type': 'podStatus' },
        'config': {
          'pods': {
            'kafka-0': {
              'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
              'status': 'ok',
            },
          },
        },
      }],
      'parentId': '9cd5e4f0-4979-4119-9c93-7df18bd88059',
      'hasChildren': false,
      'namespace': 'milan',
      'created': 1594831998,
    },
  },
};

export const REAL_DATA_DAEMON_SET: NodeDataDef = {
  edges: {
    'f5beb4cb-2c7b-474d-9719-0ac02fd8b8b7-f93575bb-0f33-4aa0-8d64-6ebb1cbdf7ce': {
      'source': {
        'node': 'f93575bb-0f33-4aa0-8d64-6ebb1cbdf7ce',
        'connector': 'secrets.name: hubble-token-smc5q',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': 'f5beb4cb-2c7b-474d-9719-0ac02fd8b8b7',
        'connector': 'name: hubble-token-smc5q',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
    'f69e1b15-a257-42fa-a367-d4a5eb70d8cf-hubble pods': {
      'source': {
        'node': 'hubble pods',
        'connector': 'k8s-app: hubble',
        'connectorType': 'label',
        'edge': 'explicit',
      },
      'destination': {
        'node': 'f69e1b15-a257-42fa-a367-d4a5eb70d8cf',
        'connector': 'k8s-app: hubble',
        'connectorType': 'selector',
        'edge': 'explicit',
      },
    },
    'f93575bb-0f33-4aa0-8d64-6ebb1cbdf7ce-hubble pods': {
      'source': {
        'node': 'hubble pods',
        'connector': 'serviceAccount: hubble',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': 'f93575bb-0f33-4aa0-8d64-6ebb1cbdf7ce',
        'connector': 'name: hubble',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
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
    '3c81e771-d723-403d-a19b-be7ce87ff7f2-a4e5517e-0563-4158-88d3-a0492fe18cd5': {
      'source': {
        'node': 'a4e5517e-0563-4158-88d3-a0492fe18cd5',
        'connector': 'secrets.name: default-token-4dln7',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': '3c81e771-d723-403d-a19b-be7ce87ff7f2',
        'connector': 'name: default-token-4dln7',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
    'a4e5517e-0563-4158-88d3-a0492fe18cd5-elasticsearch-dbf4fc4df pods': {
      'source': {
        'node': 'elasticsearch-dbf4fc4df pods',
        'connector': 'serviceAccount: default',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': 'a4e5517e-0563-4158-88d3-a0492fe18cd5',
        'connector': 'name: default',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
    'elasticsearch-dbf4fc4df pods-96dcb87c-0d5e-49f8-a084-cf79e054a4bd': {
      'source': {
        'node': 'elasticsearch-dbf4fc4df pods',
        'connector': 'app: elasticsearch',
        'connectorType': 'label',
        'edge': 'explicit',
      },
      'destination': {
        'node': '96dcb87c-0d5e-49f8-a084-cf79e054a4bd',
        'connector': 'app: elasticsearch',
        'connectorType': 'selector',
        'edge': 'explicit',
      },
    },
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
  'edges': {
    '3c81e771-d723-403d-a19b-be7ce87ff7f2-a4e5517e-0563-4158-88d3-a0492fe18cd5': {
      'source': {
        'node': 'a4e5517e-0563-4158-88d3-a0492fe18cd5',
        'connector': 'secrets.name: default-token-4dln7',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': '3c81e771-d723-403d-a19b-be7ce87ff7f2',
        'connector': 'name: default-token-4dln7',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
    '96dcb87c-0d5e-49f8-a084-cf79e054a4bd-elasticsearch-dbf4fc4df pods': {
      'source': {
        'node': '96dcb87c-0d5e-49f8-a084-cf79e054a4bd',
        'connector': 'app: elasticsearch',
        'connectorType': 'selector',
        'edge': 'explicit',
      },
      'destination': {
        'node': 'elasticsearch-dbf4fc4df pods',
        'connector': 'app: elasticsearch',
        'connectorType': 'label',
        'edge': 'explicit',
      },
    },
    'a4e5517e-0563-4158-88d3-a0492fe18cd5-elasticsearch-569cc48595 pods': {
      'source': {
        'node': 'elasticsearch-569cc48595 pods',
        'connector': 'serviceAccount: default',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': 'a4e5517e-0563-4158-88d3-a0492fe18cd5',
        'connector': 'name: default',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
    'a4e5517e-0563-4158-88d3-a0492fe18cd5-elasticsearch-dbf4fc4df pods': {
      'source': {
        'node': 'elasticsearch-dbf4fc4df pods',
        'connector': 'serviceAccount: default',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': 'a4e5517e-0563-4158-88d3-a0492fe18cd5',
        'connector': 'name: default',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
    'elasticsearch-569cc48595 pods-96dcb87c-0d5e-49f8-a084-cf79e054a4bd': {
      'source': {
        'node': 'elasticsearch-569cc48595 pods',
        'connector': 'app: elasticsearch',
        'connectorType': 'label',
        'edge': 'explicit',
      },
      'destination': {
        'node': '96dcb87c-0d5e-49f8-a084-cf79e054a4bd',
        'connector': 'app: elasticsearch',
        'connectorType': 'selector',
        'edge': 'explicit',
      },
    },
  },
  'nodes': {
    '04ddee7a-342c-46b0-8c57-ec8682aff2ef': {
      'name': 'elasticsearch-dbf4fc4df',
      'apiVersion': 'apps/v1',
      'kind': 'ReplicaSet',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'Replica Set is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': {
          'value': 'elasticsearch-dbf4fc4df',
          'ref': '/overview/namespace/milan/workloads/replica-sets/elasticsearch-dbf4fc4df',
        },
      },
      'parentId': '5b287e6a-94f2-4ac3-8241-17fd87d3a114',
      'hasChildren': true,
      'namespace': 'milan',
      'created': 1594045849,
    },
    '3c81e771-d723-403d-a19b-be7ce87ff7f2': {
      'name': 'default-token-4dln7',
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
          'value': 'default-token-4dln7',
          'ref': '/overview/namespace/milan/config-and-storage/secrets/default-token-4dln7',
        },
      },
      'hasChildren': false,
      'namespace': 'milan',
      'created': 1592846412,
    },
    '5b287e6a-94f2-4ac3-8241-17fd87d3a114': {
      'name': 'elasticsearch',
      'apiVersion': 'apps/v1',
      'kind': 'Deployment',
      'status': 'warning',
      'details': [{
        'metadata': { 'type': 'text' },
        'config': { 'value': 'Expected 2 replicas, but 1 are available' },
      }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': { 'value': 'elasticsearch', 'ref': '/overview/namespace/milan/workloads/deployments/elasticsearch' },
      },
      'hasChildren': true,
      'namespace': 'milan',
      'created': 1594045849,
    },
    '96dcb87c-0d5e-49f8-a084-cf79e054a4bd': {
      'name': 'elasticsearch',
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
          'value': 'elasticsearch',
          'ref': '/overview/namespace/milan/discovery-and-load-balancing/services/elasticsearch',
        },
      },
      'hasChildren': false,
      'namespace': 'milan',
      'created': 1594045849,
    },
    'a4e5517e-0563-4158-88d3-a0492fe18cd5': {
      'name': 'default',
      'apiVersion': 'v1',
      'kind': 'ServiceAccount',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'v1 ServiceAccount is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': { 'value': 'default', 'ref': '/overview/namespace/milan/config-and-storage/service-accounts/default' },
      },
      'hasChildren': false,
      'namespace': 'milan',
      'created': 1592846412,
    },
    'e3817b88-c76d-4afb-b05a-72344dd41cf2': {
      'name': 'elasticsearch-569cc48595',
      'apiVersion': 'apps/v1',
      'kind': 'ReplicaSet',
      'status': 'warning',
      'details': [{
        'metadata': { 'type': 'text' },
        'config': { 'value': 'Expected 1 replicas, but 0 are available' },
      }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': {
          'value': 'elasticsearch-569cc48595',
          'ref': '/overview/namespace/milan/workloads/replica-sets/elasticsearch-569cc48595',
        },
      },
      'parentId': '5b287e6a-94f2-4ac3-8241-17fd87d3a114',
      'hasChildren': true,
      'namespace': 'milan',
      'created': 1596204899,
    },
    'elasticsearch-569cc48595 pods': {
      'name': 'elasticsearch-569cc48595 pods',
      'apiVersion': 'v1',
      'kind': 'Pod',
      'status': 'warning',
      'details': [{
        'metadata': { 'type': 'podStatus' },
        'config': {
          'pods': {
            'elasticsearch-569cc48595-mr2xs': {
              'details': [{
                'metadata': { 'type': 'text' },
                'config': { 'value': '' },
              }], 'status': 'warning',
            },
          },
        },
      }],
      'parentId': 'e3817b88-c76d-4afb-b05a-72344dd41cf2',
      'hasChildren': false,
      'namespace': 'milan',
      'created': 1596204899,
    },
    'elasticsearch-dbf4fc4df pods': {
      'name': 'elasticsearch-dbf4fc4df pods',
      'apiVersion': 'v1',
      'kind': 'Pod',
      'status': 'ok',
      'details': [{
        'metadata': { 'type': 'podStatus' },
        'config': {
          'pods': {
            'elasticsearch-dbf4fc4df-pqqxw': {
              'details': [{
                'metadata': { 'type': 'text' },
                'config': { 'value': '' },
              }], 'status': 'ok',
            },
          },
        },
      }],
      'parentId': '04ddee7a-342c-46b0-8c57-ec8682aff2ef',
      'hasChildren': false,
      'namespace': 'milan',
      'created': 1594831985,
    },
  },
};

export const REAL_DATA_JOB: NodeDataDef = {
  'edges': {
    '3c81e771-d723-403d-a19b-be7ce87ff7f2-a4e5517e-0563-4158-88d3-a0492fe18cd5': {
      'source': {
        'node': 'a4e5517e-0563-4158-88d3-a0492fe18cd5',
        'connector': 'secrets.name: default-token-4dln7',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': '3c81e771-d723-403d-a19b-be7ce87ff7f2',
        'connector': 'name: default-token-4dln7',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
    'a4e5517e-0563-4158-88d3-a0492fe18cd5-pi pods': {
      'source': {
        'node': 'pi pods',
        'connector': 'serviceAccount: default',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': 'a4e5517e-0563-4158-88d3-a0492fe18cd5',
        'connector': 'name: default',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
  },
  'nodes': {
    '380ecb10-9cd8-415d-b69a-91a63dfa7095': {
      'name': 'pi',
      'apiVersion': 'batch/v1',
      'kind': 'Job',
      'status': 'ok',
      'details': [{
        'metadata': { 'type': 'text' },
        'config': { 'value': 'Job has succeeded 1 time' },
      }, { 'metadata': { 'type': 'text' }, 'config': { 'value': 'Job completed in 36s' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        }, 'config': { 'value': 'pi', 'ref': '/overview/namespace/milan/workloads/jobs/pi' },
      },
      'hasChildren': true,
      'namespace': 'milan',
      'created': 1596401256,
    },
    '3c81e771-d723-403d-a19b-be7ce87ff7f2': {
      'name': 'default-token-4dln7',
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
          'value': 'default-token-4dln7',
          'ref': '/overview/namespace/milan/config-and-storage/secrets/default-token-4dln7',
        },
      },
      'hasChildren': false,
      'namespace': 'milan',
      'created': 1592846412,
    },
    'a4e5517e-0563-4158-88d3-a0492fe18cd5': {
      'name': 'default',
      'apiVersion': 'v1',
      'kind': 'ServiceAccount',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'v1 ServiceAccount is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': { 'value': 'default', 'ref': '/overview/namespace/milan/config-and-storage/service-accounts/default' },
      },
      'hasChildren': false,
      'namespace': 'milan',
      'created': 1592846412,
    },
    'pi pods': {
      'name': 'pi pods',
      'apiVersion': 'v1',
      'kind': 'Pod',
      'status': 'warning',
      'details': [{
        'metadata': { 'type': 'podStatus' },
        'config': {
          'pods': {
            'pi-j47wx': {
              'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
              'status': 'warning',
            },
          },
        },
      }],
      'parentId': '380ecb10-9cd8-415d-b69a-91a63dfa7095',
      'hasChildren': false,
      'namespace': 'milan',
      'created': 1596401256,
    },
  },
};

export const REAL_DATA_TWO_SECRETS: NodeDataDef = {
  'edges': {
    '3e040fc9-b214-465a-b465-b6f3ada2d910-51ba286e-2610-4c95-bb91-ab6d0b7bf563': {
      'source': {
        'node': '51ba286e-2610-4c95-bb91-ab6d0b7bf563',
        'connector': 'secrets.name: envoycert',
        'connectorType': 'name',
        'edge': 'explicit'
      },
      'destination': {
        'node': '3e040fc9-b214-465a-b465-b6f3ada2d910',
        'connector': 'name: envoycert',
        'connectorType': 'name',
        'edge': 'explicit'
      }
    },
    '51ba286e-2610-4c95-bb91-ab6d0b7bf563-envoy pods': {
      'source': {
        'node': 'envoy pods',
        'connector': 'serviceAccount: envoy',
        'connectorType': 'name',
        'edge': 'explicit'
      },
      'destination': {
        'node': '51ba286e-2610-4c95-bb91-ab6d0b7bf563',
        'connector': 'name: envoy',
        'connectorType': 'name',
        'edge': 'explicit'
      }
    },
    '6c7c57e7-4b67-4ee9-a71c-30fb1e13e86d-51ba286e-2610-4c95-bb91-ab6d0b7bf563': {
      'source': {
        'node': '51ba286e-2610-4c95-bb91-ab6d0b7bf563',
        'connector': 'secrets.name: envoy-token-vw5h5',
        'connectorType': 'name',
        'edge': 'explicit'
      },
      'destination': {
        'node': '6c7c57e7-4b67-4ee9-a71c-30fb1e13e86d',
        'connector': 'name: envoy-token-vw5h5',
        'connectorType': 'name',
        'edge': 'explicit'
      }
    },
    'd0fb763c-32a7-4c14-a105-011664e93e72-envoy pods': {
      'source': {
        'node': 'envoy pods',
        'connector': 'app: envoy',
        'connectorType': 'label',
        'edge': 'explicit'
      },
      'destination': {
        'node': 'd0fb763c-32a7-4c14-a105-011664e93e72',
        'connector': 'app: envoy',
        'connectorType': 'selector',
        'edge': 'explicit'
      }
    }
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

export const REAL_DATA_INGRESS: NodeDataDef = {
  'edges': {
    '3c81e771-d723-403d-a19b-be7ce87ff7f2-a4e5517e-0563-4158-88d3-a0492fe18cd5': {
      'source': {
        'node': 'a4e5517e-0563-4158-88d3-a0492fe18cd5',
        'connector': 'secrets.name: default-token-4dln7',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': '3c81e771-d723-403d-a19b-be7ce87ff7f2',
        'connector': 'name: default-token-4dln7',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
    '6cf421e2-c3c8-4a88-81ef-e6d336fdb748-web-557f59c6cf pods': {
      'source': {
        'node': '6cf421e2-c3c8-4a88-81ef-e6d336fdb748',
        'connector': 'app: web',
        'connectorType': 'selector',
        'edge': 'explicit',
      },
      'destination': {
        'node': 'web-557f59c6cf pods',
        'connector': 'app: web',
        'connectorType': 'label',
        'edge': 'explicit',
      },
    },
    '89b930ac-01df-4e7b-8cf9-4880ec64e887-web2-644ffbbb4 pods': {
      'source': {
        'node': '89b930ac-01df-4e7b-8cf9-4880ec64e887',
        'connector': 'app: web2',
        'connectorType': 'selector',
        'edge': 'explicit',
      },
      'destination': {
        'node': 'web2-644ffbbb4 pods',
        'connector': 'app: web2',
        'connectorType': 'label',
        'edge': 'explicit',
      },
    },
    'a4e5517e-0563-4158-88d3-a0492fe18cd5-web-557f59c6cf pods': {
      'source': {
        'node': 'web-557f59c6cf pods',
        'connector': 'serviceAccount: default',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': 'a4e5517e-0563-4158-88d3-a0492fe18cd5',
        'connector': 'name: default',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
    'a4e5517e-0563-4158-88d3-a0492fe18cd5-web2-644ffbbb4 pods': {
      'source': {
        'node': 'web2-644ffbbb4 pods',
        'connector': 'serviceAccount: default',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': 'a4e5517e-0563-4158-88d3-a0492fe18cd5',
        'connector': 'name: default',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
    'fd5d811f-205a-4196-a872-80c0308389c4-6cf421e2-c3c8-4a88-81ef-e6d336fdb748': {
      'source': {
        'node': 'fd5d811f-205a-4196-a872-80c0308389c4',
        'connector': 'paths.backend.serviceName: web',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': '6cf421e2-c3c8-4a88-81ef-e6d336fdb748',
        'connector': 'name: web',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
    'fd5d811f-205a-4196-a872-80c0308389c4-89b930ac-01df-4e7b-8cf9-4880ec64e887': {
      'source': {
        'node': 'fd5d811f-205a-4196-a872-80c0308389c4',
        'connector': 'paths.backend.serviceName: web2',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': '89b930ac-01df-4e7b-8cf9-4880ec64e887',
        'connector': 'name: web2',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
  },
  'nodes': {
    '1965b0bb-86e2-4180-9746-228e5939cce2': {
      'name': 'web',
      'apiVersion': 'apps/v1',
      'kind': 'Deployment',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'Deployment is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        }, 'config': { 'value': 'web', 'ref': '/overview/namespace/milan/workloads/deployments/web' },
      },
      'hasChildren': true,
      'namespace': 'milan',
      'created': 1596139041,
    },
    '3b9fff3a-7f1f-48d7-b0c2-e05e1e5d63f8': {
      'name': 'web2',
      'apiVersion': 'apps/v1',
      'kind': 'Deployment',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'Deployment is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        }, 'config': { 'value': 'web2', 'ref': '/overview/namespace/milan/workloads/deployments/web2' },
      },
      'hasChildren': true,
      'namespace': 'milan',
      'created': 1596139214,
    },
    '3c81e771-d723-403d-a19b-be7ce87ff7f2': {
      'name': 'default-token-4dln7',
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
          'value': 'default-token-4dln7',
          'ref': '/overview/namespace/milan/config-and-storage/secrets/default-token-4dln7',
        },
      },
      'hasChildren': false,
      'namespace': 'milan',
      'created': 1592846412,
    },
    '6cf421e2-c3c8-4a88-81ef-e6d336fdb748': {
      'name': 'web',
      'apiVersion': 'v1',
      'kind': 'Service',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'Service is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        }, 'config': { 'value': 'web', 'ref': '/overview/namespace/milan/discovery-and-load-balancing/services/web' },
      },
      'hasChildren': false,
      'namespace': 'milan',
      'created': 1596139056,
    },
    '7981dc4b-9674-4708-a080-ec4d00f3582d': {
      'name': 'web-557f59c6cf',
      'apiVersion': 'apps/v1',
      'kind': 'ReplicaSet',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'Replica Set is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': {
          'value': 'web-557f59c6cf',
          'ref': '/overview/namespace/milan/workloads/replica-sets/web-557f59c6cf',
        },
      },
      'parentId': '1965b0bb-86e2-4180-9746-228e5939cce2',
      'hasChildren': true,
      'namespace': 'milan',
      'created': 1596139041,
    },
    '89b930ac-01df-4e7b-8cf9-4880ec64e887': {
      'name': 'web2',
      'apiVersion': 'v1',
      'kind': 'Service',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'Service is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        }, 'config': { 'value': 'web2', 'ref': '/overview/namespace/milan/discovery-and-load-balancing/services/web2' },
      },
      'hasChildren': false,
      'namespace': 'milan',
      'created': 1596139223,
    },
    'a4e5517e-0563-4158-88d3-a0492fe18cd5': {
      'name': 'default',
      'apiVersion': 'v1',
      'kind': 'ServiceAccount',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'v1 ServiceAccount is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': { 'value': 'default', 'ref': '/overview/namespace/milan/config-and-storage/service-accounts/default' },
      },
      'hasChildren': false,
      'namespace': 'milan',
      'created': 1592846412,
    },
    'fd5d811f-205a-4196-a872-80c0308389c4': {
      'name': 'example-ingress',
      'apiVersion': 'extensions/v1beta1',
      'kind': 'Ingress',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'Ingress is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': {
          'value': 'example-ingress',
          'ref': '/overview/namespace/milan/discovery-and-load-balancing/ingresses/example-ingress',
        },
      },
      'hasChildren': false,
      'namespace': 'milan',
      'created': 1596139166,
    },
    'fe97a40c-85c2-4cbe-9384-1c896c5ffe1b': {
      'name': 'web2-644ffbbb4',
      'apiVersion': 'apps/v1',
      'kind': 'ReplicaSet',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'Replica Set is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': {
          'value': 'web2-644ffbbb4',
          'ref': '/overview/namespace/milan/workloads/replica-sets/web2-644ffbbb4',
        },
      },
      'parentId': '3b9fff3a-7f1f-48d7-b0c2-e05e1e5d63f8',
      'hasChildren': true,
      'namespace': 'milan',
      'created': 1596139214,
    },
    'web-557f59c6cf pods': {
      'name': 'web-557f59c6cf pods',
      'apiVersion': 'v1',
      'kind': 'Pod',
      'status': 'ok',
      'details': [{
        'metadata': { 'type': 'podStatus' },
        'config': {
          'pods': {
            'web-557f59c6cf-vxhjk': {
              'details': [{
                'metadata': { 'type': 'text' },
                'config': { 'value': '' },
              }], 'status': 'ok',
            },
          },
        },
      }],
      'parentId': '7981dc4b-9674-4708-a080-ec4d00f3582d',
      'hasChildren': false,
      'namespace': 'milan',
      'created': 1596139041,
    },
    'web2-644ffbbb4 pods': {
      'name': 'web2-644ffbbb4 pods',
      'apiVersion': 'v1',
      'kind': 'Pod',
      'status': 'ok',
      'details': [{
        'metadata': { 'type': 'podStatus' },
        'config': {
          'pods': {
            'web2-644ffbbb4-62pqg': {
              'details': [{
                'metadata': { 'type': 'text' },
                'config': { 'value': '' },
              }], 'status': 'ok',
            },
          },
        },
      }],
      'parentId': 'fe97a40c-85c2-4cbe-9384-1c896c5ffe1b',
      'hasChildren': false,
      'namespace': 'milan',
      'created': 1596139215,
    },
  },
};

export const REAL_DATA_CRDS: NodeDataDef = {
  "edges": {
    "16771a1b-5620-4086-ad37-0446c14904a8-35129712-a86a-47e8-9128-b7196dfa7032": {
      "source": {
        "node": "16771a1b-5620-4086-ad37-0446c14904a8",
        "connector": "",
        "connectorType": "unknown",
        "edge": "explicit"
      },
      "destination": {
        "node": "35129712-a86a-47e8-9128-b7196dfa7032",
        "connector": "",
        "connectorType": "unknown",
        "edge": "explicit"
      }
    },
    "16771a1b-5620-4086-ad37-0446c14904a8-da7ee8c2-c869-44fa-9723-aee422d92986": {
      "source": {
        "node": "da7ee8c2-c869-44fa-9723-aee422d92986",
        "connector": "",
        "connectorType": "unknown",
        "edge": "explicit"
      },
      "destination": {
        "node": "16771a1b-5620-4086-ad37-0446c14904a8",
        "connector": "",
        "connectorType": "unknown",
        "edge": "explicit"
      }
    },
    "2a720370-6289-4be0-a711-4912ba1212d8-9c00e060-fbcb-47e5-8722-c78a8adc3ffa": {
      "source": {
        "node": "9c00e060-fbcb-47e5-8722-c78a8adc3ffa",
        "connector": "",
        "connectorType": "unknown",
        "edge": "explicit"
      },
      "destination": {
        "node": "2a720370-6289-4be0-a711-4912ba1212d8",
        "connector": "",
        "connectorType": "unknown",
        "edge": "explicit"
      }
    },
    "9979ec07-27b4-44b5-b2a8-17a225516fa4-da7ee8c2-c869-44fa-9723-aee422d92986": {
      "source": {
        "node": "da7ee8c2-c869-44fa-9723-aee422d92986",
        "connector": "",
        "connectorType": "unknown",
        "edge": "explicit"
      },
      "destination": {
        "node": "9979ec07-27b4-44b5-b2a8-17a225516fa4",
        "connector": "",
        "connectorType": "unknown",
        "edge": "explicit"
      }
    },
    "9c00e060-fbcb-47e5-8722-c78a8adc3ffa-16771a1b-5620-4086-ad37-0446c14904a8": {
      "source": {
        "node": "16771a1b-5620-4086-ad37-0446c14904a8",
        "connector": "",
        "connectorType": "unknown",
        "edge": "explicit"
      },
      "destination": {
        "node": "9c00e060-fbcb-47e5-8722-c78a8adc3ffa",
        "connector": "",
        "connectorType": "unknown",
        "edge": "explicit"
      }
    },
    "9c00e060-fbcb-47e5-8722-c78a8adc3ffa-4fb08940-a61e-481c-957b-02482e200796": {
      "source": {
        "node": "9c00e060-fbcb-47e5-8722-c78a8adc3ffa",
        "connector": "",
        "connectorType": "unknown",
        "edge": "explicit"
      },
      "destination": {
        "node": "4fb08940-a61e-481c-957b-02482e200796",
        "connector": "",
        "connectorType": "unknown",
        "edge": "explicit"
      }
    },
    "9c00e060-fbcb-47e5-8722-c78a8adc3ffa-52194142-6aef-41b2-be2b-0ad0ecb18fcd": {
      "source": {
        "node": "9c00e060-fbcb-47e5-8722-c78a8adc3ffa",
        "connector": "",
        "connectorType": "unknown",
        "edge": "explicit"
      },
      "destination": {
        "node": "52194142-6aef-41b2-be2b-0ad0ecb18fcd",
        "connector": "",
        "connectorType": "unknown",
        "edge": "explicit"
      }
    },
    "9c00e060-fbcb-47e5-8722-c78a8adc3ffa-9979ec07-27b4-44b5-b2a8-17a225516fa4": {
      "source": {
        "node": "9979ec07-27b4-44b5-b2a8-17a225516fa4",
        "connector": "",
        "connectorType": "unknown",
        "edge": "explicit"
      },
      "destination": {
        "node": "9c00e060-fbcb-47e5-8722-c78a8adc3ffa",
        "connector": "",
        "connectorType": "unknown",
        "edge": "explicit"
      }
    },
    "9c00e060-fbcb-47e5-8722-c78a8adc3ffa-9fcb7c82-677d-414e-9294-e3b14724796b": {
      "source": {
        "node": "9c00e060-fbcb-47e5-8722-c78a8adc3ffa",
        "connector": "",
        "connectorType": "unknown",
        "edge": "explicit"
      },
      "destination": {
        "node": "9fcb7c82-677d-414e-9294-e3b14724796b",
        "connector": "",
        "connectorType": "unknown",
        "edge": "explicit"
      }
    },
    "9c00e060-fbcb-47e5-8722-c78a8adc3ffa-cd91e9c2-cfe5-4810-bd49-ffca80f4cabe": {
      "source": {
        "node": "9c00e060-fbcb-47e5-8722-c78a8adc3ffa",
        "connector": "",
        "connectorType": "unknown",
        "edge": "explicit"
      },
      "destination": {
        "node": "cd91e9c2-cfe5-4810-bd49-ffca80f4cabe",
        "connector": "",
        "connectorType": "unknown",
        "edge": "explicit"
      }
    },
    "9c00e060-fbcb-47e5-8722-c78a8adc3ffa-da7ee8c2-c869-44fa-9723-aee422d92986": {
      "source": {
        "node": "9c00e060-fbcb-47e5-8722-c78a8adc3ffa",
        "connector": "",
        "connectorType": "unknown",
        "edge": "explicit"
      },
      "destination": {
        "node": "da7ee8c2-c869-44fa-9723-aee422d92986",
        "connector": "",
        "connectorType": "unknown",
        "edge": "explicit"
      }
    },
    "9c00e060-fbcb-47e5-8722-c78a8adc3ffa-dfa02c83-cbc0-4fad-923c-bd056bd92a69": {
      "source": {
        "node": "9c00e060-fbcb-47e5-8722-c78a8adc3ffa",
        "connector": "",
        "connectorType": "unknown",
        "edge": "explicit"
      },
      "destination": {
        "node": "dfa02c83-cbc0-4fad-923c-bd056bd92a69",
        "connector": "",
        "connectorType": "unknown",
        "edge": "explicit"
      }
    }
  },
  "nodes": {
    "16771a1b-5620-4086-ad37-0446c14904a8": {
      "name": "tkg-cluster-wc-355-control-plane-sk4d6",
      "apiVersion": "bootstrap.cluster.x-k8s.io/v1alpha3",
      "kind": "KubeadmConfig",
      "status": "ok",
      "details": [
        {
          "metadata": {
            "type": "text"
          },
          "config": {
            "value": "bootstrap.cluster.x-k8s.io/v1alpha3 KubeadmConfig is OK"
          }
        }
      ],
      "path": {
        "metadata": {
          "type": "link",
          "title": [
            {
              "metadata": {
                "type": "text"
              },
              "config": {
                "value": ""
              }
            }
          ]
        },
        "config": {
          "value": "tkg-cluster-wc-355-control-plane-sk4d6",
          "ref": "/overview/namespace/default/custom-resources/kubeadmconfigs.bootstrap.cluster.x-k8s.io/v1alpha3/tkg-cluster-wc-355-control-plane-sk4d6"
        }
      },
      "hasChildren": false,
      "namespace": "default",
      "created": 1596478117
    },
    "2a720370-6289-4be0-a711-4912ba1212d8": {
      "name": "tkg-cluster-wc-355",
      "apiVersion": "cluster.x-k8s.io/v1alpha3",
      "kind": "Cluster",
      "status": "ok",
      "details": [
        {
          "metadata": {
            "type": "text"
          },
          "config": {
            "value": "cluster.x-k8s.io/v1alpha3 Cluster is OK"
          }
        }
      ],
      "path": {
        "metadata": {
          "type": "link",
          "title": [
            {
              "metadata": {
                "type": "text"
              },
              "config": {
                "value": ""
              }
            }
          ]
        },
        "config": {
          "value": "tkg-cluster-wc-355",
          "ref": "/overview/namespace/default/custom-resources/clusters.cluster.x-k8s.io/v1alpha3/tkg-cluster-wc-355"
        }
      },
      "hasChildren": false,
      "namespace": "default",
      "created": 1596477895
    },
    "35129712-a86a-47e8-9128-b7196dfa7032": {
      "name": "tkg-cluster-wc-355-control-plane-sk4d6",
      "apiVersion": "v1",
      "kind": "Secret",
      "status": "ok",
      "details": [
        {
          "metadata": {
            "type": "text"
          },
          "config": {
            "value": "v1 Secret is OK"
          }
        }
      ],
      "path": {
        "metadata": {
          "type": "link",
          "title": [
            {
              "metadata": {
                "type": "text"
              },
              "config": {
                "value": ""
              }
            }
          ]
        },
        "config": {
          "value": "tkg-cluster-wc-355-control-plane-sk4d6",
          "ref": "/overview/namespace/default/config-and-storage/secrets/tkg-cluster-wc-355-control-plane-sk4d6"
        }
      },
      "hasChildren": false,
      "namespace": "default",
      "created": 1596478118
    },
    "4fb08940-a61e-481c-957b-02482e200796": {
      "name": "tkg-cluster-wc-355-etcd",
      "apiVersion": "v1",
      "kind": "Secret",
      "status": "ok",
      "details": [
        {
          "metadata": {
            "type": "text"
          },
          "config": {
            "value": "v1 Secret is OK"
          }
        }
      ],
      "path": {
        "metadata": {
          "type": "link",
          "title": [
            {
              "metadata": {
                "type": "text"
              },
              "config": {
                "value": ""
              }
            }
          ]
        },
        "config": {
          "value": "tkg-cluster-wc-355-etcd",
          "ref": "/overview/namespace/default/config-and-storage/secrets/tkg-cluster-wc-355-etcd"
        }
      },
      "hasChildren": false,
      "namespace": "default",
      "created": 1596478117
    },
    "52194142-6aef-41b2-be2b-0ad0ecb18fcd": {
      "name": "tkg-cluster-wc-355-ca",
      "apiVersion": "v1",
      "kind": "Secret",
      "status": "ok",
      "details": [
        {
          "metadata": {
            "type": "text"
          },
          "config": {
            "value": "v1 Secret is OK"
          }
        }
      ],
      "path": {
        "metadata": {
          "type": "link",
          "title": [
            {
              "metadata": {
                "type": "text"
              },
              "config": {
                "value": ""
              }
            }
          ]
        },
        "config": {
          "value": "tkg-cluster-wc-355-ca",
          "ref": "/overview/namespace/default/config-and-storage/secrets/tkg-cluster-wc-355-ca"
        }
      },
      "hasChildren": false,
      "namespace": "default",
      "created": 1596478117
    },
    "9979ec07-27b4-44b5-b2a8-17a225516fa4": {
      "name": "tkg-cluster-wc-355-control-plane-xm5pl",
      "apiVersion": "infrastructure.cluster.x-k8s.io/v1alpha3",
      "kind": "VSphereMachine",
      "status": "ok",
      "details": [
        {
          "metadata": {
            "type": "text"
          },
          "config": {
            "value": "infrastructure.cluster.x-k8s.io/v1alpha3 VSphereMachine is OK"
          }
        }
      ],
      "path": {
        "metadata": {
          "type": "link",
          "title": [
            {
              "metadata": {
                "type": "text"
              },
              "config": {
                "value": ""
              }
            }
          ]
        },
        "config": {
          "value": "tkg-cluster-wc-355-control-plane-xm5pl",
          "ref": "/overview/namespace/default/custom-resources/vspheremachines.infrastructure.cluster.x-k8s.io/v1alpha3/tkg-cluster-wc-355-control-plane-xm5pl"
        }
      },
      "hasChildren": false,
      "namespace": "default",
      "created": 1596478117
    },
    "9c00e060-fbcb-47e5-8722-c78a8adc3ffa": {
      "name": "tkg-cluster-wc-355-control-plane",
      "apiVersion": "controlplane.cluster.x-k8s.io/v1alpha3",
      "kind": "KubeadmControlPlane",
      "status": "ok",
      "details": [
        {
          "metadata": {
            "type": "text"
          },
          "config": {
            "value": "controlplane.cluster.x-k8s.io/v1alpha3 KubeadmControlPlane is OK"
          }
        }
      ],
      "path": {
        "metadata": {
          "type": "link",
          "title": [
            {
              "metadata": {
                "type": "text"
              },
              "config": {
                "value": ""
              }
            }
          ]
        },
        "config": {
          "value": "tkg-cluster-wc-355-control-plane",
          "ref": "/overview/namespace/default/custom-resources/kubeadmcontrolplanes.controlplane.cluster.x-k8s.io/v1alpha3/tkg-cluster-wc-355-control-plane"
        }
      },
      "hasChildren": false,
      "namespace": "default",
      "created": 1596477896
    },
    "9fcb7c82-677d-414e-9294-e3b14724796b": {
      "name": "tkg-cluster-wc-355-proxy",
      "apiVersion": "v1",
      "kind": "Secret",
      "status": "ok",
      "details": [
        {
          "metadata": {
            "type": "text"
          },
          "config": {
            "value": "v1 Secret is OK"
          }
        }
      ],
      "path": {
        "metadata": {
          "type": "link",
          "title": [
            {
              "metadata": {
                "type": "text"
              },
              "config": {
                "value": ""
              }
            }
          ]
        },
        "config": {
          "value": "tkg-cluster-wc-355-proxy",
          "ref": "/overview/namespace/default/config-and-storage/secrets/tkg-cluster-wc-355-proxy"
        }
      },
      "hasChildren": false,
      "namespace": "default",
      "created": 1596478117
    },
    "cd91e9c2-cfe5-4810-bd49-ffca80f4cabe": {
      "name": "tkg-cluster-wc-355-kubeconfig",
      "apiVersion": "v1",
      "kind": "Secret",
      "status": "ok",
      "details": [
        {
          "metadata": {
            "type": "text"
          },
          "config": {
            "value": "v1 Secret is OK"
          }
        }
      ],
      "path": {
        "metadata": {
          "type": "link",
          "title": [
            {
              "metadata": {
                "type": "text"
              },
              "config": {
                "value": ""
              }
            }
          ]
        },
        "config": {
          "value": "tkg-cluster-wc-355-kubeconfig",
          "ref": "/overview/namespace/default/config-and-storage/secrets/tkg-cluster-wc-355-kubeconfig"
        }
      },
      "hasChildren": false,
      "namespace": "default",
      "created": 1596478117
    },
    "da7ee8c2-c869-44fa-9723-aee422d92986": {
      "name": "tkg-cluster-wc-355-control-plane-t87v5",
      "apiVersion": "cluster.x-k8s.io/v1alpha3",
      "kind": "Machine",
      "status": "ok",
      "details": [
        {
          "metadata": {
            "type": "text"
          },
          "config": {
            "value": "cluster.x-k8s.io/v1alpha3 Machine is OK"
          }
        }
      ],
      "path": {
        "metadata": {
          "type": "link",
          "title": [
            {
              "metadata": {
                "type": "text"
              },
              "config": {
                "value": ""
              }
            }
          ]
        },
        "config": {
          "value": "tkg-cluster-wc-355-control-plane-t87v5",
          "ref": "/overview/namespace/default/custom-resources/machines.cluster.x-k8s.io/v1alpha3/tkg-cluster-wc-355-control-plane-t87v5"
        }
      },
      "hasChildren": false,
      "namespace": "default",
      "created": 1596478118
    },
    "dfa02c83-cbc0-4fad-923c-bd056bd92a69": {
      "name": "tkg-cluster-wc-355-sa",
      "apiVersion": "v1",
      "kind": "Secret",
      "status": "ok",
      "details": [
        {
          "metadata": {
            "type": "text"
          },
          "config": {
            "value": "v1 Secret is OK"
          }
        }
      ],
      "path": {
        "metadata": {
          "type": "link",
          "title": [
            {
              "metadata": {
                "type": "text"
              },
              "config": {
                "value": ""
              }
            }
          ]
        },
        "config": {
          "value": "tkg-cluster-wc-355-sa",
          "ref": "/overview/namespace/default/config-and-storage/secrets/tkg-cluster-wc-355-sa"
        }
      },
      "hasChildren": false,
      "namespace": "default",
      "created": 1596478117
    }
  }
}

export const REAL_DATA_CRDS2: NodeDataDef = {
  'edges': {
    '06903339-7ab2-47db-b7cb-5e3a9fdcff1a-jenkins-x-chartmuseum-774f8b95b pods': {
      'source': {
        'node': 'jenkins-x-chartmuseum-774f8b95b pods',
        'connector': 'serviceAccount: default',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': '06903339-7ab2-47db-b7cb-5e3a9fdcff1a',
        'connector': 'name: default',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
    '06903339-7ab2-47db-b7cb-5e3a9fdcff1a-jenkins-x-docker-registry-ccdddd564 pods': {
      'source': {
        'node': 'jenkins-x-docker-registry-ccdddd564 pods',
        'connector': 'serviceAccount: default',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': '06903339-7ab2-47db-b7cb-5e3a9fdcff1a',
        'connector': 'name: default',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
    '06903339-7ab2-47db-b7cb-5e3a9fdcff1a-jenkins-x-nexus-65cdf58f64 pods': {
      'source': {
        'node': 'jenkins-x-nexus-65cdf58f64 pods',
        'connector': 'serviceAccount: default',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': '06903339-7ab2-47db-b7cb-5e3a9fdcff1a',
        'connector': 'name: default',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
    '20ba468d-0321-4f6f-b5c0-9f2a32746972-06903339-7ab2-47db-b7cb-5e3a9fdcff1a': {
      'source': {
        'node': '06903339-7ab2-47db-b7cb-5e3a9fdcff1a',
        'connector': 'secrets.name: jenkins-x-docker-registry-secret',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': '20ba468d-0321-4f6f-b5c0-9f2a32746972',
        'connector': 'name: jenkins-x-docker-registry-secret',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
    '20ce0f7f-c1af-47d4-a505-f682b3cbc7c9-c391ca3d-29c0-4c6c-86c7-01eba3d50325': {
      'source': {
        'node': '20ce0f7f-c1af-47d4-a505-f682b3cbc7c9',
        'connector': '',
        'connectorType': 'unknown',
        'edge': 'explicit',
      },
      'destination': {
        'node': 'c391ca3d-29c0-4c6c-86c7-01eba3d50325',
        'connector': '',
        'connectorType': 'unknown',
        'edge': 'explicit',
      },
    },
    '217ab9fa-53aa-4ed0-bef1-eaeaa8f964a4-06903339-7ab2-47db-b7cb-5e3a9fdcff1a': {
      'source': {
        'node': '06903339-7ab2-47db-b7cb-5e3a9fdcff1a',
        'connector': 'secrets.name: jenkins-x-chartmuseum',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': '217ab9fa-53aa-4ed0-bef1-eaeaa8f964a4',
        'connector': 'name: jenkins-x-chartmuseum',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
    '346ffda2-f9e2-4b28-854e-016b7b4e418a-06903339-7ab2-47db-b7cb-5e3a9fdcff1a': {
      'source': {
        'node': '06903339-7ab2-47db-b7cb-5e3a9fdcff1a',
        'connector': 'secrets.name: nexus',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': '346ffda2-f9e2-4b28-854e-016b7b4e418a',
        'connector': 'name: nexus',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
    '39f21e06-3e85-41c4-9660-9421d110c9f6-e0d30408-47f1-42b5-8aea-1daadbac6373': {
      'source': {
        'node': 'e0d30408-47f1-42b5-8aea-1daadbac6373',
        'connector': 'secrets.name: jenkins-x-controllerrole-token-dvmv4',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': '39f21e06-3e85-41c4-9660-9421d110c9f6',
        'connector': 'name: jenkins-x-controllerrole-token-dvmv4',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
    '3c4ac7d1-02f1-4822-8362-0525d0624532-545dfd0b-51fd-408f-99e6-d02962eb8ff0': {
      'source': {
        'node': '3c4ac7d1-02f1-4822-8362-0525d0624532',
        'connector': 'name: jenkins-x-docker-registry',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': '545dfd0b-51fd-408f-99e6-d02962eb8ff0',
        'connector': 'paths.backend.serviceName: jenkins-x-docker-registry',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
    '4dbf04f8-7ae7-4e2b-a6dc-652f5bcb4877-jenkins-x-gcpods-1598821200 pods': {
      'source': {
        'node': 'jenkins-x-gcpods-1598821200 pods',
        'connector': 'serviceAccount: jenkins-x-gcpods',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': '4dbf04f8-7ae7-4e2b-a6dc-652f5bcb4877',
        'connector': 'name: jenkins-x-gcpods',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
    '529445fc-81a3-49af-bbc0-9bbcfb85375b-jenkins-x-nexus-65cdf58f64 pods': {
      'source': {
        'node': 'jenkins-x-nexus-65cdf58f64 pods',
        'connector': 'name: nexus',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': '529445fc-81a3-49af-bbc0-9bbcfb85375b',
        'connector': 'configMap.name: nexus',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
    '5433e159-236c-4327-89ab-1e6eb73473c6-jenkins-x-gcpreviews-1598821200 pods': {
      'source': {
        'node': 'jenkins-x-gcpreviews-1598821200 pods',
        'connector': 'serviceAccount: jenkins-x-gcpreviews',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': '5433e159-236c-4327-89ab-1e6eb73473c6',
        'connector': 'name: jenkins-x-gcpreviews',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
    '57f7145d-6579-46fd-aef2-342f56b609db-e8f04f4f-c8c7-4e66-80e1-1aa3bed5ba7f': {
      'source': {
        'node': '57f7145d-6579-46fd-aef2-342f56b609db',
        'connector': 'name: nexus',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': 'e8f04f4f-c8c7-4e66-80e1-1aa3bed5ba7f',
        'connector': 'paths.backend.serviceName: nexus',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
    '9ba8190d-43c7-4507-b93a-66338d7acafc-5433e159-236c-4327-89ab-1e6eb73473c6': {
      'source': {
        'node': '5433e159-236c-4327-89ab-1e6eb73473c6',
        'connector': 'secrets.name: jenkins-x-gcpreviews-token-w52p2',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': '9ba8190d-43c7-4507-b93a-66338d7acafc',
        'connector': 'name: jenkins-x-gcpreviews-token-w52p2',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
    'a283f9b5-8c47-4cc8-8a09-a16597c116ec-jenkins-x-gcactivities-1598821200 pods': {
      'source': {
        'node': 'jenkins-x-gcactivities-1598821200 pods',
        'connector': 'serviceAccount: jenkins-x-gcactivities',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': 'a283f9b5-8c47-4cc8-8a09-a16597c116ec',
        'connector': 'name: jenkins-x-gcactivities',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
    'aa35034d-8dd3-4e6f-a533-dd72cdf63a6a-4dbf04f8-7ae7-4e2b-a6dc-652f5bcb4877': {
      'source': {
        'node': '4dbf04f8-7ae7-4e2b-a6dc-652f5bcb4877',
        'connector': 'secrets.name: jenkins-x-gcpods-token-txhml',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': 'aa35034d-8dd3-4e6f-a533-dd72cdf63a6a',
        'connector': 'name: jenkins-x-gcpods-token-txhml',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
    'af95a67d-8fbc-4a15-b494-80215114dbaf-a283f9b5-8c47-4cc8-8a09-a16597c116ec': {
      'source': {
        'node': 'a283f9b5-8c47-4cc8-8a09-a16597c116ec',
        'connector': 'secrets.name: jenkins-x-gcactivities-token-dkkq5',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': 'af95a67d-8fbc-4a15-b494-80215114dbaf',
        'connector': 'name: jenkins-x-gcactivities-token-dkkq5',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
    'c391ca3d-29c0-4c6c-86c7-01eba3d50325-b884b92e-b497-4f4b-8a96-8c6826d30088': {
      'source': {
        'node': 'c391ca3d-29c0-4c6c-86c7-01eba3d50325',
        'connector': '',
        'connectorType': 'unknown',
        'edge': 'explicit',
      },
      'destination': {
        'node': 'b884b92e-b497-4f4b-8a96-8c6826d30088',
        'connector': '',
        'connectorType': 'unknown',
        'edge': 'explicit',
      },
    },
    'c8d6b645-0e50-41e7-99c0-94c087b4e812-9998f7d5-88e2-46c1-8034-3113d8150680': {
      'source': {
        'node': 'c8d6b645-0e50-41e7-99c0-94c087b4e812',
        'connector': 'name: jenkins-x-chartmuseum',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': '9998f7d5-88e2-46c1-8034-3113d8150680',
        'connector': 'paths.backend.serviceName: jenkins-x-chartmuseum',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
    'e0d30408-47f1-42b5-8aea-1daadbac6373-jenkins-x-controllerrole-75d874445f pods': {
      'source': {
        'node': 'jenkins-x-controllerrole-75d874445f pods',
        'connector': 'serviceAccount: jenkins-x-controllerrole',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': 'e0d30408-47f1-42b5-8aea-1daadbac6373',
        'connector': 'name: jenkins-x-controllerrole',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
    'f8c8e8ce-c8f8-4b0a-94f6-aad8eab52c83-06903339-7ab2-47db-b7cb-5e3a9fdcff1a': {
      'source': {
        'node': '06903339-7ab2-47db-b7cb-5e3a9fdcff1a',
        'connector': 'secrets.name: default-token-6gvhb',
        'connectorType': 'name',
        'edge': 'explicit',
      },
      'destination': {
        'node': 'f8c8e8ce-c8f8-4b0a-94f6-aad8eab52c83',
        'connector': 'name: default-token-6gvhb',
        'connectorType': 'name',
        'edge': 'explicit',
      },
    },
    'jenkins-x-chartmuseum-774f8b95b pods-b884b92e-b497-4f4b-8a96-8c6826d30088': {
      'source': {
        'node': 'b884b92e-b497-4f4b-8a96-8c6826d30088',
        'connector': '',
        'connectorType': 'selector',
        'edge': 'explicit',
      },
      'destination': {
        'node': 'jenkins-x-chartmuseum-774f8b95b pods',
        'connector': '',
        'connectorType': 'label',
        'edge': 'explicit',
      },
    },
    'jenkins-x-chartmuseum-774f8b95b pods-c8d6b645-0e50-41e7-99c0-94c087b4e812': {
      'source': {
        'node': 'jenkins-x-chartmuseum-774f8b95b pods',
        'connector': 'app: chartmuseum, release: jenkins-x',
        'connectorType': 'label',
        'edge': 'explicit',
      },
      'destination': {
        'node': 'c8d6b645-0e50-41e7-99c0-94c087b4e812',
        'connector': 'app: chartmuseum, release: jenkins-x',
        'connectorType': 'selector',
        'edge': 'explicit',
      },
    },
    'jenkins-x-controllerrole-75d874445f pods-b884b92e-b497-4f4b-8a96-8c6826d30088': {
      'source': {
        'node': 'b884b92e-b497-4f4b-8a96-8c6826d30088',
        'connector': '',
        'connectorType': 'selector',
        'edge': 'explicit',
      },
      'destination': {
        'node': 'jenkins-x-controllerrole-75d874445f pods',
        'connector': '',
        'connectorType': 'label',
        'edge': 'explicit',
      },
    },
    'jenkins-x-docker-registry-ccdddd564 pods-3c4ac7d1-02f1-4822-8362-0525d0624532': {
      'source': {
        'node': 'jenkins-x-docker-registry-ccdddd564 pods',
        'connector': 'app: docker-registry, release: jenkins-x',
        'connectorType': 'label',
        'edge': 'explicit',
      },
      'destination': {
        'node': '3c4ac7d1-02f1-4822-8362-0525d0624532',
        'connector': 'app: docker-registry, release: jenkins-x',
        'connectorType': 'selector',
        'edge': 'explicit',
      },
    },
    'jenkins-x-docker-registry-ccdddd564 pods-b884b92e-b497-4f4b-8a96-8c6826d30088': {
      'source': {
        'node': 'b884b92e-b497-4f4b-8a96-8c6826d30088',
        'connector': '',
        'connectorType': 'selector',
        'edge': 'explicit',
      },
      'destination': {
        'node': 'jenkins-x-docker-registry-ccdddd564 pods',
        'connector': '',
        'connectorType': 'label',
        'edge': 'explicit',
      },
    },
    'jenkins-x-gcactivities-1598821200 pods-b884b92e-b497-4f4b-8a96-8c6826d30088': {
      'source': {
        'node': 'b884b92e-b497-4f4b-8a96-8c6826d30088',
        'connector': '',
        'connectorType': 'selector',
        'edge': 'explicit',
      },
      'destination': {
        'node': 'jenkins-x-gcactivities-1598821200 pods',
        'connector': '',
        'connectorType': 'label',
        'edge': 'explicit',
      },
    },
    'jenkins-x-gcpods-1598821200 pods-b884b92e-b497-4f4b-8a96-8c6826d30088': {
      'source': {
        'node': 'b884b92e-b497-4f4b-8a96-8c6826d30088',
        'connector': '',
        'connectorType': 'selector',
        'edge': 'explicit',
      },
      'destination': {
        'node': 'jenkins-x-gcpods-1598821200 pods',
        'connector': '',
        'connectorType': 'label',
        'edge': 'explicit',
      },
    },
    'jenkins-x-gcpreviews-1598821200 pods-b884b92e-b497-4f4b-8a96-8c6826d30088': {
      'source': {
        'node': 'b884b92e-b497-4f4b-8a96-8c6826d30088',
        'connector': '',
        'connectorType': 'selector',
        'edge': 'explicit',
      },
      'destination': {
        'node': 'jenkins-x-gcpreviews-1598821200 pods',
        'connector': '',
        'connectorType': 'label',
        'edge': 'explicit',
      },
    },
    'jenkins-x-nexus-65cdf58f64 pods-57f7145d-6579-46fd-aef2-342f56b609db': {
      'source': {
        'node': 'jenkins-x-nexus-65cdf58f64 pods',
        'connector': 'app: nexus, release: jenkins-x',
        'connectorType': 'label',
        'edge': 'explicit',
      },
      'destination': {
        'node': '57f7145d-6579-46fd-aef2-342f56b609db',
        'connector': 'app: nexus, release: jenkins-x',
        'connectorType': 'selector',
        'edge': 'explicit',
      },
    },
    'jenkins-x-nexus-65cdf58f64 pods-b884b92e-b497-4f4b-8a96-8c6826d30088': {
      'source': {
        'node': 'b884b92e-b497-4f4b-8a96-8c6826d30088',
        'connector': '',
        'connectorType': 'selector',
        'edge': 'explicit',
      },
      'destination': {
        'node': 'jenkins-x-nexus-65cdf58f64 pods',
        'connector': '',
        'connectorType': 'label',
        'edge': 'explicit',
      },
    },
  },
  'nodes': {
    '06903339-7ab2-47db-b7cb-5e3a9fdcff1a': {
      'name': 'default',
      'apiVersion': 'v1',
      'kind': 'ServiceAccount',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'v1 ServiceAccount is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        }, 'config': { 'value': 'default', 'ref': '/overview/namespace/jx/config-and-storage/service-accounts/default' },
      },
      'hasChildren': false,
      'namespace': 'jx',
      'created': 1597163347,
    },
    '14fcf092-65d9-41e3-8724-70bc235520c0': {
      'name': 'jenkins-x-controllerrole-75d874445f',
      'apiVersion': 'apps/v1',
      'kind': 'ReplicaSet',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'Replica Set is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': {
          'value': 'jenkins-x-controllerrole-75d874445f',
          'ref': '/overview/namespace/jx/workloads/replica-sets/jenkins-x-controllerrole-75d874445f',
        },
      },
      'parentId': 'd18ad47e-0e3e-4214-a860-3830b2a42940',
      'hasChildren': true,
      'namespace': 'jx',
      'created': 1597163998,
    },
    '195de9bb-15ad-4237-8ecd-4056a1790a64': {
      'name': 'jenkins-x-gcpreviews-1598821200',
      'apiVersion': 'batch/v1',
      'kind': 'Job',
      'status': 'ok',
      'details': [{
        'metadata': { 'type': 'text' },
        'config': { 'value': 'Job has succeeded 1 time' },
      }, { 'metadata': { 'type': 'text' }, 'config': { 'value': 'Job completed in 14s' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': {
          'value': 'jenkins-x-gcpreviews-1598821200',
          'ref': '/overview/namespace/jx/workloads/jobs/jenkins-x-gcpreviews-1598821200',
        },
      },
      'hasChildren': true,
      'namespace': 'jx',
      'created': 1598821208,
    },
    '20ba468d-0321-4f6f-b5c0-9f2a32746972': {
      'name': 'jenkins-x-docker-registry-secret',
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
          'value': 'jenkins-x-docker-registry-secret',
          'ref': '/overview/namespace/jx/config-and-storage/secrets/jenkins-x-docker-registry-secret',
        },
      },
      'hasChildren': false,
      'namespace': 'jx',
      'created': 1597163999,
    },
    '20ce0f7f-c1af-47d4-a505-f682b3cbc7c9': {
      'name': 'default',
      'apiVersion': 'eventing.knative.dev/v1',
      'kind': 'Broker',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'eventing.knative.dev/v1 Broker is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': {
          'value': 'default',
          'ref': '/overview/namespace/jx/custom-resources/brokers.eventing.knative.dev/v1/default',
        },
      },
      'hasChildren': false,
      'namespace': 'jx',
      'created': 1597163348,
    },
    '217ab9fa-53aa-4ed0-bef1-eaeaa8f964a4': {
      'name': 'jenkins-x-chartmuseum',
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
          'value': 'jenkins-x-chartmuseum',
          'ref': '/overview/namespace/jx/config-and-storage/secrets/jenkins-x-chartmuseum',
        },
      },
      'hasChildren': false,
      'namespace': 'jx',
      'created': 1597163997,
    },
    '26911527-e9c6-48ae-811e-f6384a6d90fc': {
      'name': 'jenkins-x-gcpreviews',
      'apiVersion': 'batch/v1beta1',
      'kind': 'CronJob',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'batch/v1beta1 CronJob is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': {
          'value': 'jenkins-x-gcpreviews',
          'ref': '/overview/namespace/jx/workloads/cron-jobs/jenkins-x-gcpreviews',
        },
      },
      'hasChildren': false,
      'namespace': 'jx',
      'created': 1597164000,
    },
    '2e0f688d-bd0a-45a8-9422-2928aefe44b4': {
      'name': 'jenkins-x-gcpods',
      'apiVersion': 'batch/v1beta1',
      'kind': 'CronJob',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'batch/v1beta1 CronJob is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': { 'value': 'jenkins-x-gcpods', 'ref': '/overview/namespace/jx/workloads/cron-jobs/jenkins-x-gcpods' },
      },
      'hasChildren': false,
      'namespace': 'jx',
      'created': 1597164000,
    },
    '346ffda2-f9e2-4b28-854e-016b7b4e418a': {
      'name': 'nexus',
      'apiVersion': 'v1',
      'kind': 'Secret',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'v1 Secret is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        }, 'config': { 'value': 'nexus', 'ref': '/overview/namespace/jx/config-and-storage/secrets/nexus' },
      },
      'hasChildren': false,
      'namespace': 'jx',
      'created': 1597164001,
    },
    '39f21e06-3e85-41c4-9660-9421d110c9f6': {
      'name': 'jenkins-x-controllerrole-token-dvmv4',
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
          'value': 'jenkins-x-controllerrole-token-dvmv4',
          'ref': '/overview/namespace/jx/config-and-storage/secrets/jenkins-x-controllerrole-token-dvmv4',
        },
      },
      'hasChildren': false,
      'namespace': 'jx',
      'created': 1597163998,
    },
    '3c4ac7d1-02f1-4822-8362-0525d0624532': {
      'name': 'jenkins-x-docker-registry',
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
          'value': 'jenkins-x-docker-registry',
          'ref': '/overview/namespace/jx/discovery-and-load-balancing/services/jenkins-x-docker-registry',
        },
      },
      'hasChildren': false,
      'namespace': 'jx',
      'created': 1597163999,
    },
    '4375571f-044a-498e-a6f4-1f8f54358be1': {
      'name': 'jenkins-x-chartmuseum-774f8b95b',
      'apiVersion': 'apps/v1',
      'kind': 'ReplicaSet',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'Replica Set is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': {
          'value': 'jenkins-x-chartmuseum-774f8b95b',
          'ref': '/overview/namespace/jx/workloads/replica-sets/jenkins-x-chartmuseum-774f8b95b',
        },
      },
      'parentId': '6be48a28-2963-47b3-96ed-a9203de613da',
      'hasChildren': true,
      'namespace': 'jx',
      'created': 1597163997,
    },
    '48229755-50eb-4b6d-a1b9-c6b9b415c25e': {
      'name': 'jenkins-x-gcpods-1598821200',
      'apiVersion': 'batch/v1',
      'kind': 'Job',
      'status': 'ok',
      'details': [{
        'metadata': { 'type': 'text' },
        'config': { 'value': 'Job has succeeded 1 time' },
      }, { 'metadata': { 'type': 'text' }, 'config': { 'value': 'Job completed in 14s' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': {
          'value': 'jenkins-x-gcpods-1598821200',
          'ref': '/overview/namespace/jx/workloads/jobs/jenkins-x-gcpods-1598821200',
        },
      },
      'hasChildren': true,
      'namespace': 'jx',
      'created': 1598821208,
    },
    '4dbf04f8-7ae7-4e2b-a6dc-652f5bcb4877': {
      'name': 'jenkins-x-gcpods',
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
          'value': 'jenkins-x-gcpods',
          'ref': '/overview/namespace/jx/config-and-storage/service-accounts/jenkins-x-gcpods',
        },
      },
      'hasChildren': false,
      'namespace': 'jx',
      'created': 1597164000,
    },
    '529445fc-81a3-49af-bbc0-9bbcfb85375b': {
      'name': 'nexus',
      'apiVersion': 'v1',
      'kind': 'ConfigMap',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'v1 ConfigMap is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        }, 'config': { 'value': 'nexus', 'ref': '/overview/namespace/jx/config-and-storage/config-maps/nexus' },
      },
      'hasChildren': false,
      'namespace': 'jx',
      'created': 1597164001,
    },
    '5433e159-236c-4327-89ab-1e6eb73473c6': {
      'name': 'jenkins-x-gcpreviews',
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
          'value': 'jenkins-x-gcpreviews',
          'ref': '/overview/namespace/jx/config-and-storage/service-accounts/jenkins-x-gcpreviews',
        },
      },
      'hasChildren': false,
      'namespace': 'jx',
      'created': 1597164001,
    },
    '545dfd0b-51fd-408f-99e6-d02962eb8ff0': {
      'name': 'docker-registry',
      'apiVersion': 'extensions/v1beta1',
      'kind': 'Ingress',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'Ingress is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': {
          'value': 'docker-registry',
          'ref': '/overview/namespace/jx/discovery-and-load-balancing/ingresses/docker-registry',
        },
      },
      'hasChildren': false,
      'namespace': 'jx',
      'created': 1597164010,
    },
    '56106e11-5e17-48c2-aae4-826508d809df': {
      'name': 'jenkins-x-docker-registry-ccdddd564',
      'apiVersion': 'apps/v1',
      'kind': 'ReplicaSet',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'Replica Set is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': {
          'value': 'jenkins-x-docker-registry-ccdddd564',
          'ref': '/overview/namespace/jx/workloads/replica-sets/jenkins-x-docker-registry-ccdddd564',
        },
      },
      'parentId': '7b1a37a9-bb5e-4df5-9cd2-8e65f5ba1b55',
      'hasChildren': true,
      'namespace': 'jx',
      'created': 1597163998,
    },
    '57f7145d-6579-46fd-aef2-342f56b609db': {
      'name': 'nexus',
      'apiVersion': 'v1',
      'kind': 'Service',
      'status': 'warning',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'Service has no endpoint addresses' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        }, 'config': { 'value': 'nexus', 'ref': '/overview/namespace/jx/discovery-and-load-balancing/services/nexus' },
      },
      'hasChildren': false,
      'namespace': 'jx',
      'created': 1597164001,
    },
    '6b872570-18c9-49c8-8d2d-1a65b9c759a2': {
      'name': 'jenkins-x-nexus',
      'apiVersion': 'apps/v1',
      'kind': 'Deployment',
      'status': 'error',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'No replicas exist for this deployment' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': { 'value': 'jenkins-x-nexus', 'ref': '/overview/namespace/jx/workloads/deployments/jenkins-x-nexus' },
      },
      'hasChildren': true,
      'namespace': 'jx',
      'created': 1597164001,
    },
    '6be48a28-2963-47b3-96ed-a9203de613da': {
      'name': 'jenkins-x-chartmuseum',
      'apiVersion': 'apps/v1',
      'kind': 'Deployment',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'Deployment is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': {
          'value': 'jenkins-x-chartmuseum',
          'ref': '/overview/namespace/jx/workloads/deployments/jenkins-x-chartmuseum',
        },
      },
      'hasChildren': true,
      'namespace': 'jx',
      'created': 1597163997,
    },
    '7b1a37a9-bb5e-4df5-9cd2-8e65f5ba1b55': {
      'name': 'jenkins-x-docker-registry',
      'apiVersion': 'apps/v1',
      'kind': 'Deployment',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'Deployment is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': {
          'value': 'jenkins-x-docker-registry',
          'ref': '/overview/namespace/jx/workloads/deployments/jenkins-x-docker-registry',
        },
      },
      'hasChildren': true,
      'namespace': 'jx',
      'created': 1597163998,
    },
    '8dc54020-f237-4f7e-9021-eac6f3f6940f': {
      'name': 'jenkins-x-gcactivities-1598821200',
      'apiVersion': 'batch/v1',
      'kind': 'Job',
      'status': 'ok',
      'details': [{
        'metadata': { 'type': 'text' },
        'config': { 'value': 'Job has succeeded 1 time' },
      }, { 'metadata': { 'type': 'text' }, 'config': { 'value': 'Job completed in 14s' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': {
          'value': 'jenkins-x-gcactivities-1598821200',
          'ref': '/overview/namespace/jx/workloads/jobs/jenkins-x-gcactivities-1598821200',
        },
      },
      'hasChildren': true,
      'namespace': 'jx',
      'created': 1598821208,
    },
    '9998f7d5-88e2-46c1-8034-3113d8150680': {
      'name': 'chartmuseum',
      'apiVersion': 'extensions/v1beta1',
      'kind': 'Ingress',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'Ingress is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': {
          'value': 'chartmuseum',
          'ref': '/overview/namespace/jx/discovery-and-load-balancing/ingresses/chartmuseum',
        },
      },
      'hasChildren': false,
      'namespace': 'jx',
      'created': 1597164010,
    },
    '99b1ef07-f564-4756-aaca-a358ad71f4f3': {
      'name': 'jenkins-x-gcactivities',
      'apiVersion': 'batch/v1beta1',
      'kind': 'CronJob',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'batch/v1beta1 CronJob is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': {
          'value': 'jenkins-x-gcactivities',
          'ref': '/overview/namespace/jx/workloads/cron-jobs/jenkins-x-gcactivities',
        },
      },
      'hasChildren': false,
      'namespace': 'jx',
      'created': 1597163999,
    },
    '9ba8190d-43c7-4507-b93a-66338d7acafc': {
      'name': 'jenkins-x-gcpreviews-token-w52p2',
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
          'value': 'jenkins-x-gcpreviews-token-w52p2',
          'ref': '/overview/namespace/jx/config-and-storage/secrets/jenkins-x-gcpreviews-token-w52p2',
        },
      },
      'hasChildren': false,
      'namespace': 'jx',
      'created': 1597164001,
    },
    'a283f9b5-8c47-4cc8-8a09-a16597c116ec': {
      'name': 'jenkins-x-gcactivities',
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
          'value': 'jenkins-x-gcactivities',
          'ref': '/overview/namespace/jx/config-and-storage/service-accounts/jenkins-x-gcactivities',
        },
      },
      'hasChildren': false,
      'namespace': 'jx',
      'created': 1597164000,
    },
    'aa35034d-8dd3-4e6f-a533-dd72cdf63a6a': {
      'name': 'jenkins-x-gcpods-token-txhml',
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
          'value': 'jenkins-x-gcpods-token-txhml',
          'ref': '/overview/namespace/jx/config-and-storage/secrets/jenkins-x-gcpods-token-txhml',
        },
      },
      'hasChildren': false,
      'namespace': 'jx',
      'created': 1597164000,
    },
    'af95a67d-8fbc-4a15-b494-80215114dbaf': {
      'name': 'jenkins-x-gcactivities-token-dkkq5',
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
          'value': 'jenkins-x-gcactivities-token-dkkq5',
          'ref': '/overview/namespace/jx/config-and-storage/secrets/jenkins-x-gcactivities-token-dkkq5',
        },
      },
      'hasChildren': false,
      'namespace': 'jx',
      'created': 1597164000,
    },
    'b884b92e-b497-4f4b-8a96-8c6826d30088': {
      'name': 'default-kne-trigger-kn-channel',
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
          'value': 'default-kne-trigger-kn-channel',
          'ref': '/overview/namespace/jx/discovery-and-load-balancing/services/default-kne-trigger-kn-channel',
        },
      },
      'hasChildren': false,
      'namespace': 'jx',
      'created': 1597163349,
    },
    'c391ca3d-29c0-4c6c-86c7-01eba3d50325': {
      'name': 'default-kne-trigger',
      'apiVersion': 'messaging.knative.dev/v1',
      'kind': 'InMemoryChannel',
      'status': 'ok',
      'details': [{
        'metadata': { 'type': 'text' },
        'config': { 'value': 'messaging.knative.dev/v1 InMemoryChannel is OK' },
      }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': {
          'value': 'default-kne-trigger',
          'ref': '/overview/namespace/jx/custom-resources/inmemorychannels.messaging.knative.dev/v1/default-kne-trigger',
        },
      },
      'hasChildren': false,
      'namespace': 'jx',
      'created': 1597163349,
    },
    'c8aa4ba5-0d0f-4050-a256-5fc008d39d6e': {
      'name': 'jenkins-x-nexus-65cdf58f64',
      'apiVersion': 'apps/v1',
      'kind': 'ReplicaSet',
      'status': 'warning',
      'details': [{
        'metadata': { 'type': 'text' },
        'config': { 'value': 'Expected 1 replicas, but 0 are available' },
      }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': {
          'value': 'jenkins-x-nexus-65cdf58f64',
          'ref': '/overview/namespace/jx/workloads/replica-sets/jenkins-x-nexus-65cdf58f64',
        },
      },
      'parentId': '6b872570-18c9-49c8-8d2d-1a65b9c759a2',
      'hasChildren': true,
      'namespace': 'jx',
      'created': 1597164001,
    },
    'c8d6b645-0e50-41e7-99c0-94c087b4e812': {
      'name': 'jenkins-x-chartmuseum',
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
          'value': 'jenkins-x-chartmuseum',
          'ref': '/overview/namespace/jx/discovery-and-load-balancing/services/jenkins-x-chartmuseum',
        },
      },
      'hasChildren': false,
      'namespace': 'jx',
      'created': 1597163997,
    },
    'd18ad47e-0e3e-4214-a860-3830b2a42940': {
      'name': 'jenkins-x-controllerrole',
      'apiVersion': 'apps/v1',
      'kind': 'Deployment',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'Deployment is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        },
        'config': {
          'value': 'jenkins-x-controllerrole',
          'ref': '/overview/namespace/jx/workloads/deployments/jenkins-x-controllerrole',
        },
      },
      'hasChildren': true,
      'namespace': 'jx',
      'created': 1597163998,
    },
    'e0d30408-47f1-42b5-8aea-1daadbac6373': {
      'name': 'jenkins-x-controllerrole',
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
          'value': 'jenkins-x-controllerrole',
          'ref': '/overview/namespace/jx/config-and-storage/service-accounts/jenkins-x-controllerrole',
        },
      },
      'hasChildren': false,
      'namespace': 'jx',
      'created': 1597163998,
    },
    'e8f04f4f-c8c7-4e66-80e1-1aa3bed5ba7f': {
      'name': 'nexus',
      'apiVersion': 'extensions/v1beta1',
      'kind': 'Ingress',
      'status': 'ok',
      'details': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': 'Ingress is OK' } }],
      'path': {
        'metadata': {
          'type': 'link',
          'title': [{ 'metadata': { 'type': 'text' }, 'config': { 'value': '' } }],
        }, 'config': { 'value': 'nexus', 'ref': '/overview/namespace/jx/discovery-and-load-balancing/ingresses/nexus' },
      },
      'hasChildren': false,
      'namespace': 'jx',
      'created': 1597164010,
    },
    'f8c8e8ce-c8f8-4b0a-94f6-aad8eab52c83': {
      'name': 'default-token-6gvhb',
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
          'value': 'default-token-6gvhb',
          'ref': '/overview/namespace/jx/config-and-storage/secrets/default-token-6gvhb',
        },
      },
      'hasChildren': false,
      'namespace': 'jx',
      'created': 1597163347,
    },
    'jenkins-x-chartmuseum-774f8b95b pods': {
      'name': 'jenkins-x-chartmuseum-774f8b95b pods',
      'apiVersion': 'v1',
      'kind': 'Pod',
      'status': 'ok',
      'details': [{
        'metadata': { 'type': 'podStatus' },
        'config': {
          'pods': {
            'jenkins-x-chartmuseum-774f8b95b-qrkw2': {
              'details': [{
                'metadata': { 'type': 'text' },
                'config': { 'value': '' },
              }], 'status': 'ok',
            },
          },
        },
      }],
      'parentId': '4375571f-044a-498e-a6f4-1f8f54358be1',
      'hasChildren': false,
      'namespace': 'jx',
      'created': 1598788081,
    },
    'jenkins-x-controllerrole-75d874445f pods': {
      'name': 'jenkins-x-controllerrole-75d874445f pods',
      'apiVersion': 'v1',
      'kind': 'Pod',
      'status': 'ok',
      'details': [{
        'metadata': { 'type': 'podStatus' },
        'config': {
          'pods': {
            'jenkins-x-controllerrole-75d874445f-w9lp2': {
              'details': [{
                'metadata': { 'type': 'text' },
                'config': { 'value': '' },
              }], 'status': 'ok',
            },
          },
        },
      }],
      'parentId': '14fcf092-65d9-41e3-8724-70bc235520c0',
      'hasChildren': false,
      'namespace': 'jx',
      'created': 1597163998,
    },
    'jenkins-x-docker-registry-ccdddd564 pods': {
      'name': 'jenkins-x-docker-registry-ccdddd564 pods',
      'apiVersion': 'v1',
      'kind': 'Pod',
      'status': 'ok',
      'details': [{
        'metadata': { 'type': 'podStatus' },
        'config': {
          'pods': {
            'jenkins-x-docker-registry-ccdddd564-hkhd6': {
              'details': [{
                'metadata': { 'type': 'text' },
                'config': { 'value': '' },
              }], 'status': 'ok',
            },
          },
        },
      }],
      'parentId': '56106e11-5e17-48c2-aae4-826508d809df',
      'hasChildren': false,
      'namespace': 'jx',
      'created': 1597163998,
    },
    'jenkins-x-gcactivities-1598821200 pods': {
      'name': 'jenkins-x-gcactivities-1598821200 pods',
      'apiVersion': 'v1',
      'kind': 'Pod',
      'status': 'warning',
      'details': [{
        'metadata': { 'type': 'podStatus' },
        'config': {
          'pods': {
            'jenkins-x-gcactivities-1598821200-qvsl4': {
              'details': [{
                'metadata': { 'type': 'text' },
                'config': { 'value': '' },
              }], 'status': 'warning',
            },
          },
        },
      }],
      'parentId': '8dc54020-f237-4f7e-9021-eac6f3f6940f',
      'hasChildren': false,
      'namespace': 'jx',
      'created': 1598821208,
    },
    'jenkins-x-gcpods-1598821200 pods': {
      'name': 'jenkins-x-gcpods-1598821200 pods',
      'apiVersion': 'v1',
      'kind': 'Pod',
      'status': 'warning',
      'details': [{
        'metadata': { 'type': 'podStatus' },
        'config': {
          'pods': {
            'jenkins-x-gcpods-1598821200-d29pw': {
              'details': [{
                'metadata': { 'type': 'text' },
                'config': { 'value': '' },
              }], 'status': 'warning',
            },
          },
        },
      }],
      'parentId': '48229755-50eb-4b6d-a1b9-c6b9b415c25e',
      'hasChildren': false,
      'namespace': 'jx',
      'created': 1598821208,
    },
    'jenkins-x-gcpreviews-1598821200 pods': {
      'name': 'jenkins-x-gcpreviews-1598821200 pods',
      'apiVersion': 'v1',
      'kind': 'Pod',
      'status': 'warning',
      'details': [{
        'metadata': { 'type': 'podStatus' },
        'config': {
          'pods': {
            'jenkins-x-gcpreviews-1598821200-m5ldl': {
              'details': [{
                'metadata': { 'type': 'text' },
                'config': { 'value': '' },
              }], 'status': 'warning',
            },
          },
        },
      }],
      'parentId': '195de9bb-15ad-4237-8ecd-4056a1790a64',
      'hasChildren': false,
      'namespace': 'jx',
      'created': 1598821208,
    },
    'jenkins-x-nexus-65cdf58f64 pods': {
      'name': 'jenkins-x-nexus-65cdf58f64 pods',
      'apiVersion': 'v1',
      'kind': 'Pod',
      'status': 'ok',
      'details': [{
        'metadata': { 'type': 'podStatus' },
        'config': {
          'pods': {
            'jenkins-x-nexus-65cdf58f64-wc6tf': {
              'details': [{
                'metadata': { 'type': 'text' },
                'config': { 'value': '' },
              }], 'status': 'ok',
            },
          },
        },
      }],
      'parentId': 'c8aa4ba5-0d0f-4050-a256-5fc008d39d6e',
      'hasChildren': false,
      'namespace': 'jx',
      'created': 1597541558,
    },
  },
};

