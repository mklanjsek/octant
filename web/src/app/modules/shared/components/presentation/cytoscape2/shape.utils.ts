import { BaseShape } from './base.shape';
import {
  ClusterRole,
  ClusterRoleBinding,
  ConfigMap,
  CRD,
  CronJob,
  DaemonSet,
  Deployment,
  Event,
  HorizontalPodAutoscaler,
  Ingress,
  Job,
  Namespace,
  NetworkPolicy,
  Node,
  PersistentVolume,
  PersistentVolumeClaim,
  Pod,
  PodMetrics,
  Port,
  ReplicaSet,
  ReplicationController,
  Role,
  RoleBinding,
  Secret,
  Service,
  ServiceAccount,
  Shape,
  StatefulSet,
  Unknown,
} from './shapes';
import { Edge } from './edges';

interface BackendSingleEdgeDef {
  node: string;
  edge: string;
  connector: string;
  connectorType: string;
}

interface BackendEdgeDef {
  source: BackendSingleEdgeDef;
  destination: BackendSingleEdgeDef;
}

type BackendEdgesDef = Record<string, BackendEdgeDef>;

export abstract class ShapeUtils {
  static loadShapes(data): any {
    const newShapes = Object.entries(data.nodes).map(([key, value]) =>
      ShapeUtils.fromDataStream(key, value)
    );

    if (data.edges) {
      ShapeUtils.createEdges(newShapes, data.edges);
    }

    newShapes.sort(
      (a: BaseShape, b: BaseShape) =>
        ShapeUtils.shapeOrder(a.kind) - ShapeUtils.shapeOrder(b.kind)
    );

    const nodes = newShapes.map(shape => shape && shape.toNode(newShapes));
    return ShapeUtils.addHeaderNodes(newShapes, nodes);
  }

  static addHeaderNodes(shapes: BaseShape[], nodes: any) {
    shapes.forEach((shape: Shape) => {
      if (shape.label && shape.kind !== 'Port') {
        const labels = shape.label.split('\n');
        labels.forEach((label, index) => {
          const { x, y } = shape.getPosition(shapes as Shape[]);
          const headerWidth = (shape.getWidth(shapes as Shape[]) * 9) / 10;

          const headerNode = {
            data: {
              id: `${shape.id}-header-${index}`,
              label,
              owner: shape.id,
              width: headerWidth,
              height: 24,
              x:
                x - shape.getWidth(shapes as Shape[]) / 2 + headerWidth / 2 - 6,
              y: y - shape.getHeight(shapes as Shape[]) / 2 + 8 + index * 24,
              hasChildren: false,
            },
            group: 'nodes',
            removed: false,
            selected: false,
            selectable: false,
            locked: false,
            grabbable: false,
            pannable: false,
            classes: `header header-${index + 1}`,
          };
          nodes.push(headerNode);
        });
        shape.label = '';
      }
    });
    return nodes;
  }

  static createEdges(shapes: BaseShape[], edges: BackendEdgesDef) {
    if (edges) {
      Object.entries(edges).map(([key, value]) => {
        if (value.source && value.destination) {
          const sourceId = value.source.node;
          const targetId = value.destination.node;

          const src: BaseShape = ShapeUtils.findById(shapes, sourceId)[0];
          const trg: BaseShape = ShapeUtils.findById(shapes, targetId)[0];

          if (src && trg && src.kind !== trg.kind) {
            const {
              edge,
              firsPosition,
              secondPosition,
            } = ShapeUtils.verifyEdge(shapes, value, src, trg);
            const sourcePort = ShapeUtils.addPort(
              shapes,
              edge.source,
              firsPosition
            );
            const targetPort = ShapeUtils.addPort(
              shapes,
              edge.destination,
              secondPosition
            );
            const source =
              sourcePort && sourcePort.length > 0 ? sourcePort : sourceId;
            const target =
              targetPort && targetPort.length > 0 ? targetPort : targetId;
            const edgeClass =
              sourcePort.length > 0 || targetPort.length > 0 ? 'unbundled' : '';

            const nEdge = new Edge(
              `${source}-${target}`,
              target,
              source,
              edgeClass
            );
            shapes.push(nEdge);
          }
        }
      });
    }
  }

  static verifyEdge(
    shapes: BaseShape[],
    edge: BackendEdgeDef,
    sourceShape: BaseShape,
    targetShape: BaseShape
  ): { edge: any; firsPosition: string; secondPosition: string } {
    const flow = sourceShape.kind + '-' + targetShape.kind;
    const firstPosition = 'left';
    const secondPosition = 'right';
    let swap = false;

    switch (flow) {
      case 'Service-Pod':
      case 'Ingress-Service':
      case 'ServiceAccount-Pod':
      case 'ConfigMap-Pod':
      case 'Secret-ServiceAccount':
        //      case 'HorizontalPodAutoscaler-Deployment'
        //      case 'HorizontalPodAutoscaler-ReplicaSet'
        //      case 'HorizontalPodAutoscaler-ReplicationController'
        swap = true;
        break;
    }
    if (swap) {
      edge = { source: edge.destination, destination: edge.source };
    }
    return { edge, firsPosition: firstPosition, secondPosition };
  }

  static addPort(
    shapes: BaseShape[],
    edge: BackendSingleEdgeDef,
    location: string
  ): string {
    if (edge.connectorType !== 'unknown') {
      const id = `port ${edge.node}-${edge.connector}`;
      const className =
        edge.connectorType === 'selector' || edge.connectorType === 'label'
          ? edge.connectorType
          : 'port';

      if (ShapeUtils.findById(shapes, id).length === 0) {
        shapes.push(
          new Port(id, 'ok', edge.connector, location, className, edge.node)
        );
      }
      return id;
    }
    return '';
  }

  static fromDataStream(id: string, data: any): BaseShape {
    switch (data.kind) {
      case 'Service':
        return new Service(
          id,
          data.status,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'Ingress':
        return new Ingress(
          id,
          data.status,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'ReplicaSet':
        return new ReplicaSet(
          id,
          data.status,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'ServiceAccount':
        return new ServiceAccount(
          id,
          data.status,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'Secret':
        return new Secret(
          id,
          data.status,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'Pod':
        return new Pod(
          id,
          data.status,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'Deployment':
        return new Deployment(
          id,
          data.status,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'ConfigMap':
        return new ConfigMap(
          id,
          data.status,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'DaemonSet':
        return new DaemonSet(
          id,
          data.status,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'StatefulSet':
        return new StatefulSet(
          id,
          data.status,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'Node':
        return new Node(
          id,
          data.status,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'Namespace':
        return new Namespace(
          id,
          data.status,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'Event':
        return new Event(
          id,
          data.status,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'Role':
        return new Role(
          id,
          data.status,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'RoleBinding':
        return new RoleBinding(
          id,
          data.status,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'PersistentVolume':
        return new PersistentVolume(
          id,
          data.status,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'PersistentVolumeClaim':
        return new PersistentVolumeClaim(
          id,
          data.status,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'HorizontalPodAutoscaler':
        return new HorizontalPodAutoscaler(
          id,
          data.status,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'NetworkPolicy':
        return new NetworkPolicy(
          id,
          data.status,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'PodMetrics':
        return new PodMetrics(
          id,
          data.status,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'ReplicationController':
        return new ReplicationController(
          id,
          data.status,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'ClusterRole':
        return new ClusterRole(
          id,
          data.status,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'ClusterRoleBinding':
        return new ClusterRoleBinding(
          id,
          data.status,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'CustomResourceDefinition':
        return new CRD(
          id,
          data.status,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'Job':
        return new Job(
          id,
          data.status,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'CronJob':
        return new CronJob(
          id,
          data.status,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      default:
        return new Unknown(
          id,
          data.status,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.kind,
          data.parentId
        );
    }
  }

  static getLabel(data: any): string {
    return data.name + '\n' + data.apiVersion + ' ' + data.kind;
  }

  static findByKind(shapes: BaseShape[], kind: string): BaseShape[] {
    return shapes.filter(shape => shape && shape.kind === kind);
  }

  static findById(shapes: BaseShape[], id: string): BaseShape[] {
    return shapes.filter(shape => shape && shape.id === id);
  }

  static shapeOrder(kind: string): number {
    switch (kind) {
      case 'Deployment':
      case 'DaemonSet':
      case 'StatefulSet':
        return 1;
      case 'ReplicaSet':
        return 2;
      case 'Edge':
        return 4;
      default:
        return 3;
    }
  }
}
