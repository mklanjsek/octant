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
  Ingress,
  Job,
  Namespace,
  Node,
  Pod,
  ReplicaSet,
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

    const nodes = newShapes.map(shape => shape && shape.toNode(newShapes));
    return ShapeUtils.addHeaderNodes(newShapes, nodes);
  }

  static addHeaderNodes(shapes: BaseShape[], nodes: any) {
    shapes.forEach((shape: Shape) => {
      if (shape.label && shape.constructor.name !== 'Port') {
        const labels = shape.label.split('\n');

        labels.forEach((label, index) => {
          const { x, y } = shape.getPosition(shapes as Shape[]);
          const headerNode = {
            data: {
              id: `${shape.id}-header-${index}`,
              label,
              owner: shape.id,
              width: 300,
              height: 24,
              x: x - shape.getWidth(shapes as Shape[]) / 2 + 150 - 6,
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
          data.kind,
          data.hasChildren,
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
