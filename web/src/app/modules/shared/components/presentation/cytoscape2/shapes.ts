import { BaseShape } from './base.shape';

enum OverflowDirectionType {
  DOWN,
  RIGHT,
  LEFT,
  UP,
}

export abstract class Shape extends BaseShape {
  protected constructor(
    id: string,
    public status: string,
    kind: string,
    public label: string,
    public preferedWidth: any,
    public preferedHeight: any,
    public shape: string,
    public hasChildren: boolean,
    public parentId?: string
  ) {
    super(id, kind);
  }
  overflowDirection = OverflowDirectionType.DOWN;
  classes: string;

  element: any;

  ports: Shape[] = [];

  abstract preferredPosition(shapes: Shape[]): { x: number; y: number };

  getWidth(shapes: Shape[]): number {
    return this.preferedWidth;
  }

  getHeight(shapes: Shape[]): number {
    return this.preferedHeight;
  }

  nextPortPosition(shapes: Shape[], port: Port, preferred: number): number {
    if (this.ports.length === 0) {
      this.ports.push(port);
      return preferred;
    }

    if (this.ports.includes(port)) {
      return port.getPosition(shapes).y;
    }

    const total = this.ports.filter(
      (shape: Port) =>
        shape.parentId === this.id && shape.location === port.location
    ).length;
    this.ports.push(port);
    return total > 0 ? preferred + this.getHeight(shapes) / 3 : preferred;
  }

  preferredPortPosition(shapes: Shape[]): number {
    return this.preferredPosition(shapes).y - this.getHeight(shapes) / 10;
  }

  getPosition(shapes: Shape[]): { x: number; y: number } {
    const preferred = this.preferredPosition(shapes);
    const sameKind = shapes.filter(shape => shape.kind === this.kind);

    if (sameKind.length > 1 && this.parentId) {
      const parentNode = this.getParent(shapes);
      return parentNode.getChildPosition(shapes, this);
    }

    const isFirst = sameKind.length > 1 && sameKind[0].id === this.id;
    const sameIndex = sameKind.findIndex(shape => shape.id === this.id);

    return sameKind.length > 1 && !isFirst
      ? this.getOverflowPosition(shapes, preferred, sameIndex)
      : preferred;
  }

  getOverflowPosition(
    shapes: Shape[],
    preferred: { x: number; y: number },
    index: number
  ): { x: number; y: number } {
    switch (this.overflowDirection) {
      default:
      case OverflowDirectionType.DOWN:
        return {
          x: preferred.x,
          y: preferred.y + (4 * index * this.getHeight(shapes)) / 3,
        };
      case OverflowDirectionType.RIGHT:
        return {
          x: preferred.x + (5 * index * this.getWidth(shapes)) / 4,
          y: preferred.y + (index * this.getHeight(shapes)) / 2,
        };
    }
  }

  getChildPosition(shapes: Shape[], target: Shape): { x: number; y: number } {
    const defaultPos = this.getPosition(shapes);
    return { x: defaultPos.x + 25, y: defaultPos.y + 25 };
  }

  getPortPosition(shapes: Shape[], port: Port): { x: number; y: number } {
    const textWidth = this.getTextWidth(port.label) + 10;
    const { x } = this.getPosition(shapes);
    const portY = this.nextPortPosition(
      shapes,
      port,
      this.preferredPortPosition(shapes)
    );

    switch (port.location) {
      default:
      case 'left':
        return { x: x - this.getWidth(shapes) / 2 + textWidth / 2, y: portY };
      case 'right':
        return { x: x + this.getWidth(shapes) / 2 - textWidth / 2, y: portY };
    }
  }

  isMovable(): boolean {
    return this.parentId === undefined;
  }

  isSelectable(): boolean {
    return true;
  }

  getTextWidth(txt) {
    const fontName = 'Metropolis';
    const fontSize = 14;
    //    this.cytoscape.nodes('#glyph20')[0]._private.rstyle.labelWidth

    if (!this.element) {
      this.element = document.createElement('span');
      document.body.appendChild(this.element);
    }
    if (this.element.style.fontSize !== fontSize) {
      this.element.style.fontSize = fontSize;
    }
    if (this.element.style.fontFamily !== fontName) {
      this.element.style.fontFamily = fontName;
    }
    this.element.innerText = txt;
    return this.element.offsetWidth;
  }

  toNode(shapes: Shape[]) {
    const { x, y } = this.getPosition(shapes);
    return {
      data: {
        id: this.id,
        label: this.constructor.name === 'Port' ? this.label : '',
        owner: this.parentId,
        width: this.getWidth(shapes),
        height: this.getHeight(shapes),
        status: this.status,
        x,
        y,
        hasChildren: this.hasChildren,
      },
      group: 'nodes',
      removed: false,
      selected: false,
      selectable: this.isSelectable(),
      locked: false,
      grabbable: this.isMovable(),
      pannable: false,
      classes: this.classes,
    };
  }

  protected getParent(shapes: Shape[]) {
    return shapes.find((shape: Shape) => shape.id === this.parentId);
  }
}

export class Deployment extends Shape {
  constructor(
    id: string,
    status: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      status,
      'Deployment',
      label,
      700,
      500,
      'polygon',
      hasChildren,
      parentId
    );
    this.classes = 'deployment status';
    this.overflowDirection = OverflowDirectionType.RIGHT;
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    const replicas = this.totalReplicas(shapes);
    return { x: 800 + (replicas - 1) * (this.preferedWidth / 2 - 25), y: 475 };
  }

  preferredPortPosition(shapes: Shape[]): number {
    return (2 * this.preferredPosition(shapes).y) / 3;
  }

  getWidth(shapes: Shape[]): number {
    const replicas = this.totalReplicas(shapes);
    return this.preferedWidth + (replicas - 1) * (this.preferedWidth - 100);
  }

  getHeight(shapes: Shape[]): number {
    return this.preferedHeight;
  }

  private totalReplicas(shapes: Shape[]): number {
    return shapes.filter(
      shape => shape.parentId === this.id && shape.kind === 'ReplicaSet'
    ).length;
  }

  getChildPosition(shapes: Shape[], target: Shape): { x: number; y: number } {
    const replicas = this.totalReplicas(shapes);
    const defaultPos =
      replicas > 1
        ? target.preferredPosition(shapes)
        : this.getPosition(shapes);

    const childIndex = shapes
      .filter((shape: Shape) => shape.parentId === this.id)
      .findIndex(shape => shape.id === target.id);

    return {
      x: defaultPos.x + (5 * childIndex * target.getWidth(shapes)) / 4,
      y: defaultPos.y,
    };
  }
}

export class DaemonSet extends Shape {
  constructor(
    id: string,
    status: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      status,
      'DaemonSet',
      label,
      550,
      400,
      'roundrectangle',
      hasChildren,
      parentId
    );
    this.classes = 'sets status';
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return { x: 825, y: 475 };
  }
}

export class Job extends Shape {
  constructor(
    id: string,
    status: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      status,
      'Job',
      label,
      550,
      400,
      'roundrectangle',
      hasChildren,
      parentId
    );
    this.classes = 'sets status';
    this.overflowDirection = OverflowDirectionType.RIGHT;
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return { x: 825, y: 475 };
  }
}

export class CronJob extends Shape {
  constructor(
    id: string,
    status: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      status,
      'CronJob',
      label,
      350,
      200,
      'roundrectangle',
      hasChildren,
      parentId
    );
    this.classes = 'secret status';
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return { x: 0, y: 200 };
  }
}

export class StatefulSet extends Shape {
  constructor(
    id: string,
    status: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      status,
      'StatefulSet',
      label,
      550,
      400,
      'roundrectangle',
      hasChildren,
      parentId
    );
    this.classes = 'sets status';
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return { x: 825, y: 475 };
  }
}

export class Secret extends Shape {
  constructor(
    id: string,
    status: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      status,
      'Secret',
      label,
      350,
      200,
      'roundrectangle',
      hasChildren,
      parentId
    );
    this.classes = 'secret status';
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return { x: 100, y: 1100 };
  }
}

export class ServiceAccount extends Shape {
  constructor(
    id: string,
    status: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      status,
      'ServiceAccount',
      label,
      350,
      200,
      'roundrectangle',
      hasChildren,
      parentId
    );
    this.classes = 'secret status';
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return { x: 600, y: 1100 };
  }
}

export class Service extends Shape {
  constructor(
    id: string,
    status: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      status,
      'Service',
      label,
      350,
      200,
      'roundrectangle',
      hasChildren,
      parentId
    );
    this.classes = 'secret status';
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return { x: 0, y: 525 };
  }
}

export class Ingress extends Shape {
  constructor(
    id: string,
    status: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      status,
      'Ingress',
      label,
      350,
      200,
      'roundrectangle',
      hasChildren,
      parentId
    );
    this.classes = 'secret status';
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return { x: -450, y: 525 };
  }
}

export class ConfigMap extends Shape {
  constructor(
    id: string,
    status: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      status,
      'ConfigMap',
      label,
      350,
      200,
      'rectangle',
      hasChildren,
      parentId
    );
    this.classes = 'secret status';
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return { x: 1100, y: 1100 };
  }
}

export class Node extends Shape {
  constructor(
    id: string,
    status: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      status,
      'Node',
      label,
      350,
      200,
      'rectangle',
      hasChildren,
      parentId
    );
    this.classes = 'secret status';
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return { x: 0, y: 0 };
  }
}

export class Namespace extends Shape {
  constructor(
    id: string,
    status: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      status,
      'Namespace',
      label,
      350,
      200,
      'rectangle',
      hasChildren,
      parentId
    );
    this.classes = 'secret status';
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return { x: 0, y: 0 };
  }
}

export class Event extends Shape {
  constructor(
    id: string,
    status: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      status,
      'Event',
      label,
      350,
      200,
      'rectangle',
      hasChildren,
      parentId
    );
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return { x: 0, y: 0 };
  }
}

export class ClusterRole extends Shape {
  constructor(
    id: string,
    status: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      status,
      'ClusterRole',
      label,
      350,
      200,
      'rectangle',
      hasChildren,
      parentId
    );
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return { x: 0, y: 0 };
  }
}

export class ClusterRoleBinding extends Shape {
  constructor(
    id: string,
    status: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      status,
      'ClusterRoleBinding',
      label,
      350,
      200,
      'rectangle',
      hasChildren,
      parentId
    );
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return { x: 0, y: 0 };
  }
}

export class Role extends Shape {
  constructor(
    id: string,
    status: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      status,
      'Role',
      label,
      350,
      200,
      'rectangle',
      hasChildren,
      parentId
    );
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return { x: 0, y: 0 };
  }
}

export class RoleBinding extends Shape {
  constructor(
    id: string,
    status: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      status,
      'RoleBinding',
      label,
      350,
      200,
      'rectangle',
      hasChildren,
      parentId
    );
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return { x: 0, y: 0 };
  }
}

export class CRD extends Shape {
  constructor(
    id: string,
    status: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      status,
      'CustomResourceDefinition',
      label,
      350,
      200,
      'rectangle',
      hasChildren,
      parentId
    );
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return { x: 0, y: 0 };
  }
}

export class Unknown extends Shape {
  constructor(
    id: string,
    status: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      status,
      'Unknown',
      `Unknown resource: ${label}`,
      350,
      200,
      'rectangle',
      hasChildren,
      parentId
    );
    this.classes = 'secret';
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return { x: 0, y: 0 };
  }
}

export class ReplicaSet extends Shape {
  constructor(
    id: string,
    status: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      status,
      'ReplicaSet',
      label,
      500,
      350,
      'rectangle',
      hasChildren,
      parentId
    );
    this.classes = 'replicaset status';
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return { x: 850, y: 500 };
  }
}

export class Pod extends Shape {
  constructor(
    id: string,
    status: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      status,
      'Pod',
      label,
      350,
      200,
      'roundrectangle',
      hasChildren,
      parentId
    );
    this.classes = 'pod status';
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return { x: 875, y: 525 };
  }
}

export class Port extends Shape {
  constructor(
    id: string,
    status: string,
    label: string,
    public location: string,
    className: string,
    parentId?: string
  ) {
    super(
      id,
      status,
      'Port',
      label,
      'label',
      'label',
      'rectangle',
      false,
      parentId
    );
    this.classes = className;
  }

  isMovable(): boolean {
    return false;
  }

  isSelectable(): boolean {
    return false;
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return { x: 750, y: 450 };
  }

  getPosition(shapes: Shape[]): { x: number; y: number } {
    const parentNode = this.getParent(shapes);
    const portPosition = parentNode.getPortPosition(shapes, this);

    return portPosition;
  }
}
