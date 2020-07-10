import { BaseShape } from './base.shape';

export abstract class Shape extends BaseShape {
  protected constructor(
    id: string,
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
  x: number;
  y: number;
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
      return port.y;
    }

    const total = this.ports.filter(
      (shape: Port) =>
        shape.parentId === this.id && shape.location === port.location
    ).length;
    this.ports.push(port);
    return total > 0 ? preferred + this.getHeight(shapes) / 3 : preferred;
  }

  preferredPortPosition(shapes: Shape[]): number {
    return this.preferredPosition(shapes).y - this.getHeight(shapes) / 6;
  }

  getPosition(shapes: Shape[]): { x: number; y: number } {
    const preferred = this.preferredPosition(shapes);
    const sameKind = shapes.filter(shape => shape.kind === this.kind);
    if (sameKind.length > 1 && this.parentId) {
      const parentNode = this.getParent(shapes);
      return parentNode.getChildPosition(shapes, this);
    }

    const isFirst = sameKind.length > 1 && sameKind[0].id === this.id;

    return sameKind.length > 1 && !isFirst
      ? { x: preferred.x, y: preferred.y + (4 * this.getHeight(shapes)) / 3 }
      : preferred;
  }

  getChildPosition(shapes: Shape[], target: Shape): { x: number; y: number } {
    const defaultPos = target.preferredPosition(shapes);
    const childIndex = shapes
      .filter((shape: Shape) => shape.parentId === this.id)
      .findIndex(shape => shape.id === target.id);

    return childIndex === 0
      ? defaultPos
      : {
          x: defaultPos.x + (5 * target.getWidth(shapes)) / 4,
          y: defaultPos.y,
        };
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
        label: this.label,
        owner: this.parentId,
        width: this.getWidth(shapes),
        height: this.getHeight(shapes),
        x,
        y,
        hasChildren: this.hasChildren,
        shape: this.shape,
      },
      group: 'nodes',
      removed: false,
      selected: false,
      selectable: this.isMovable(),
      locked: false,
      grabbable: this.isMovable(),
      pannable: false,
      classes: this.classes,
    };
  }

  protected getParent(shapes: Shape[]) {
    const parentNode: Shape = shapes.find(
      (shape: Shape) => shape.id === this.parentId
    );
    return parentNode;
  }
}

export class Deployment extends Shape {
  constructor(
    id: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      'Deployment',
      label,
      700,
      500,
      'rectangle',
      hasChildren,
      parentId
    );
    this.classes = 'deployment';
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return this.totalReplicas(shapes) > 1
      ? { x: 1125, y: 475 }
      : { x: 800, y: 475 };
  }

  preferredPortPosition(shapes: Shape[]): number {
    return (2 * this.preferredPosition(shapes).y) / 3;
  }

  getWidth(shapes: Shape[]): number {
    return this.totalReplicas(shapes) > 1
      ? 2 * this.preferedWidth - 100
      : this.preferedWidth;
  }

  getHeight(shapes: Shape[]): number {
    return this.preferedHeight;
  }

  private totalReplicas(shapes: Shape[]): number {
    const totalChildren = shapes.filter(
      shape => shape.parentId === this.id && shape.kind === 'ReplicaSet'
    ).length;
    return totalChildren;
  }
}

export class DaemonSet extends Shape {
  constructor(
    id: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      'DaemonSet',
      label,
      550,
      400,
      'roundrectangle',
      hasChildren,
      parentId
    );
    this.classes = 'deployment';
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return { x: 825, y: 475 };
  }
}

export class Job extends Shape {
  constructor(
    id: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      'DaemonSet',
      label,
      550,
      400,
      'roundrectangle',
      hasChildren,
      parentId
    );
    this.classes = 'deployment';
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return { x: 825, y: 475 };
  }
}

export class StatefulSet extends Shape {
  constructor(
    id: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      'StatefulSet',
      label,
      550,
      400,
      'roundrectangle',
      hasChildren,
      parentId
    );
    this.classes = 'deployment';
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return { x: 825, y: 475 };
  }
}

export class Secret extends Shape {
  constructor(
    id: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      'Secret',
      label,
      350,
      200,
      'roundrectangle',
      hasChildren,
      parentId
    );
    this.classes = 'secret';
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return { x: 100, y: 1000 };
  }
}

export class ServiceAccount extends Shape {
  constructor(
    id: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      'ServiceAccount',
      label,
      350,
      200,
      'roundrectangle',
      hasChildren,
      parentId
    );
    this.classes = 'secret';
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return { x: 600, y: 1000 };
  }
}

export class Service extends Shape {
  constructor(
    id: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      'Service',
      label,
      350,
      200,
      'roundrectangle',
      hasChildren,
      parentId
    );
    this.classes = 'secret';
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return { x: 0, y: 525 };
  }
}

export class ConfigMap extends Shape {
  constructor(
    id: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(id, 'ConfigMap', label, 350, 200, 'rectangle', hasChildren, parentId);
    this.classes = 'secret';
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return { x: 1100, y: 1000 };
  }
}

export class Node extends Shape {
  constructor(
    id: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(id, 'Node', label, 350, 200, 'rectangle', hasChildren, parentId);
    this.classes = 'secret';
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return { x: 0, y: 0 };
  }
}

export class Namespace extends Shape {
  constructor(
    id: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(id, 'Namespace', label, 350, 200, 'rectangle', hasChildren, parentId);
    this.classes = 'secret';
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return { x: 0, y: 0 };
  }
}

export class Event extends Shape {
  constructor(
    id: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(id, 'Event', label, 350, 200, 'rectangle', hasChildren, parentId);
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return { x: 0, y: 0 };
  }
}

export class ClusterRole extends Shape {
  constructor(
    id: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
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
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
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

export class CRD extends Shape {
  constructor(
    id: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
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
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
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
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      'ReplicaSet',
      label,
      500,
      350,
      'rectangle',
      hasChildren,
      parentId
    );
    this.classes = 'replicaset';
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return { x: 850, y: 500 };
  }

  getChildPosition(shapes: Shape[], target: Shape): { x: number; y: number } {
    const defaultPos = this.getPosition(shapes);
    return { x: defaultPos.x + 25, y: defaultPos.y + 25 };
  }
}

export class Pod extends Shape {
  constructor(
    id: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(id, 'Pod', label, 350, 200, 'roundrectangle', hasChildren, parentId);
    this.classes = 'pod';
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return { x: 875, y: 525 };
  }
}

export class Port extends Shape {
  constructor(
    id: string,
    label: string,
    public location: string,
    className: string,
    parentId?: string
  ) {
    super(id, 'Port', label, 'label', 'label', 'rectangle', false, parentId);
    this.classes = className;
  }

  isMovable(): boolean {
    return false;
  }

  preferredPosition(shapes: Shape[]): { x: number; y: number } {
    return { x: 750, y: 450 };
  }

  getPosition(shapes: Shape[]): { x: number; y: number } {
    const parentNode = this.getParent(shapes);
    const portPosition = parentNode.getPortPosition(shapes, this);
    this.x = portPosition.x;
    this.y = portPosition.y;

    return portPosition;
  }
}
