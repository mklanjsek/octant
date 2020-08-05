
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

