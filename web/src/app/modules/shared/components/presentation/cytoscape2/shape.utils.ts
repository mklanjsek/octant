import { BaseShape } from './base.shape';
import {
  ClusterRole,
  ClusterRoleBinding,
  ConfigMap,
  CRD,
  DaemonSet,
  Deployment,
  Event,
  Namespace,
  Node,
  Pod,
  ReplicaSet,
  Secret,
  Service,
  ServiceAccount,
  StatefulSet,
  Unknown,
} from './shapes';
import { Edge } from './edges';

interface BackendEdgeDef {
  node: string;
  edge: string;
}

type BackendEdgesDef = Record<string, BackendEdgeDef[]>;

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

    return newShapes.map(shape => shape && shape.toNode(newShapes));
  }

  static createEdges(shapes: BaseShape[], edges: BackendEdgesDef) {
    if (edges) {
      Object.entries(edges).map(([key, value]) => {
        value.forEach(val => {
          const sourceShape: BaseShape = ShapeUtils.findById(shapes, key)[0];
          const targetShape: BaseShape = ShapeUtils.findById(
            shapes,
            val.node
          )[0];

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

  static fromDataStream(id: string, data: any): BaseShape {
    switch (data.kind) {
      case 'Service':
        return new Service(
          id,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'ReplicaSet':
        return new ReplicaSet(
          id,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'ServiceAccount':
        return new ServiceAccount(
          id,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'Secret':
        return new Secret(
          id,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'Pod':
        return new Pod(
          id,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'Deployment':
        return new Deployment(
          id,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'ConfigMap':
        return new ConfigMap(
          id,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'DaemonSet':
        return new DaemonSet(
          id,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'StatefulSet':
        return new StatefulSet(
          id,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'Node':
        return new Node(
          id,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'Namespace':
        return new Namespace(
          id,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'Event':
        return new Event(
          id,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'ClusterRole':
        return new ClusterRole(
          id,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'ClusterRoleBinding':
        return new ClusterRoleBinding(
          id,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      case 'CustomResourceDefinition':
        return new CRD(
          id,
          ShapeUtils.getLabel(data),
          data.hasChildren,
          data.parentId
        );
      default:
        return new Unknown(id, data.kind, data.hasChildren, data.parentId);
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
