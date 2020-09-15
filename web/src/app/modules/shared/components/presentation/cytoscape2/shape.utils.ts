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
import {
  BackendEdgeDef,
  BackendEdgesDef,
  BackendSingleEdgeDef,
} from '../../../models/content';
import cytoscape from 'cytoscape';
import { Options } from './graph.options';

export abstract class ShapeUtils {
  static consolidatePosition(shapes: BaseShape[], cyNodes: any) {
    shapes.forEach((baseShape: BaseShape) => {
      const shape = baseShape as Shape;
      const node = cyNodes.nodes(`[id = '${shape.id}']`);
      node.data('x', node.position('x'));
      node.data('y', node.position('y'));
    });
  }

  static addHeaderNodes(shapes: BaseShape[], cyNodes: any) {
    const nodes: any = [];
    shapes.forEach((baseShape: BaseShape) => {
      const shape = baseShape as Shape;
      if (shape.label && shape.kind !== 'Port') {
        const labels = shape.label.split('\n');
        labels.forEach((label, index) => {
          const node = cyNodes.nodes(`[id = '${shape.id}']`);
          const headerWidth = (shape.getWidth(shapes as Shape[]) * 9) / 10;
          const x =
            node.data('x') -
            shape.getWidth(shapes as Shape[]) / 2 +
            headerWidth / 2 -
            6;
          const y =
            node.data('y') -
            shape.getHeight(shapes as Shape[]) / 2 +
            8 +
            index * 24;
          const headerNode = {
            position: {
              x,
              y,
            },
            data: {
              id: `${shape.id}-header-${index}`,
              label,
              owner: shape.id,
              width: headerWidth,
              height: 24,
              x,
              y,
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

  static getParentNode(shapes: BaseShape[], nodeId: string) {
    let edgeNode: string;
    let parentNode = nodeId;

    do {
      edgeNode = parentNode;
      const node: Shape = ShapeUtils.findById(shapes, edgeNode)[0] as Shape;
      parentNode = node.parentId;
    } while (parentNode && parentNode.length > 0);

    return edgeNode;
  }

  static createEdges(
    shapes: BaseShape[],
    edges: BackendEdgesDef,
    options: Options,
    useParents: boolean
  ) {
    if (edges) {
      Object.entries(edges).map(([key, value]) => {
        if (value.source && value.destination) {
          const parentSourceId = ShapeUtils.getParentNode(
            shapes,
            value.source.node
          );
          const parentTargetId = ShapeUtils.getParentNode(
            shapes,
            value.destination.node
          );

          const src: Shape = ShapeUtils.findById(
            shapes,
            parentSourceId
          )[0] as Shape;
          const trg: Shape = ShapeUtils.findById(
            shapes,
            parentTargetId
          )[0] as Shape;

          if (src && trg && src.kind !== trg.kind) {
            const {
              edge,
              firstPosition,
              secondPosition,
            } = ShapeUtils.verifyEdge(shapes, value, src, trg);

            if (options.usePorts && options.showDetails) {
              src.hasChildren = true;
              trg.hasChildren = true;
            }
            const nEdge = new Edge(
              `${value.source.node}-${value.destination.node}`,
              value.source.node,
              value.destination.node,
              parentTargetId,
              parentSourceId,
              src.parentId && src.parentId.length > 0
                ? src.parentId
                : value.source.node,
              trg.parentId && trg.parentId.length > 0
                ? trg.parentId
                : value.destination.node,
              edge,
              firstPosition,
              secondPosition,
              ''
            );
            shapes.push(nEdge);
          }
        }
      });
    }
  }

  static createPorts(
    cy: cytoscape.Core,
    shapes: BaseShape[],
    cyNodes: any,
    options: Options
  ) {
    const edges = ShapeUtils.findByKind(shapes, 'Edge') as Edge[];
    if (options.showDetails && options.usePorts) {
      edges.forEach(edge => {
        if (edge.edge.source.connectorType !== 'unknown') {
          const sourcePort = ShapeUtils.addPort(
            shapes,
            edge.edge.source,
            edge.firstPosition
          );
          const targetPort = ShapeUtils.addPort(
            shapes,
            edge.edge.destination,
            edge.secondPosition
          );
          edge.sourceId = sourcePort;
          edge.targetId = targetPort;
        }
      });
      cy.add(
        ShapeUtils.findByKind(shapes, 'Port').map(
          port => port && port.toNode(shapes, options)
        )
      );
    }

    edges.forEach(edge => {
      let cyEdge = cy.edges(`[id = '${edge.id}']`)[0];
      if (!cyEdge) {
        cyEdge = cy.add(edge.toNode(shapes, options));
      }
      if (
        edge.getSourceId(options) !== cyEdge.data('source') ||
        edge.getTargetId(options) !== cyEdge.data('target')
      ) {
        cyEdge.move({
          source: edge.getSourceId(options),
          target: edge.getTargetId(options),
        });
      }
      cyEdge.data('sourceLabel', edge.getSourceLabel(options));
      cyEdge.data('targetLabel', edge.getTargetLabel(options));
      if (options.showDetails && options.usePorts) {
        cyEdge.addClass('unbundled');
      } else {
        cyEdge.removeClass('unbundled');
      }
    });
  }

  static verifyEdge(
    shapes: BaseShape[],
    edge: BackendEdgeDef,
    sourceShape: BaseShape,
    targetShape: BaseShape
  ): { edge: any; firstPosition: string; secondPosition: string } {
    const flow = sourceShape.kind + '-' + targetShape.kind;
    const firstPosition = 'right';
    const secondPosition = 'left';
    let swap = true;

    switch (flow) {
      case 'Service-Deployment':
      case 'Service-Pod':
      case 'Ingress-Service':
      case 'ServiceAccount-Pod':
      case 'ConfigMap-Pod':
      case 'Secret-ServiceAccount':
        //      case 'HorizontalPodAutoscaler-Deployment'
        //      case 'HorizontalPodAutoscaler-ReplicaSet'
        //      case 'HorizontalPodAutoscaler-ReplicationController'
        swap = false;
        break;
    }
    if (swap) {
      edge = { source: edge.destination, destination: edge.source };
    }
    return { edge, firstPosition, secondPosition };
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
