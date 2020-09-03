import { BaseShape } from './base.shape';
import { ElementDefinition } from 'cytoscape';

export class Edge extends BaseShape {
  constructor(
    id: string,
    public sourceId: string,
    public targetId: string,
    public classes?: string
  ) {
    super(id, 'Edge');
  }

  toNode(shapes: BaseShape[]): ElementDefinition {
    return {
      data: {
        id: this.id,
        source: this.sourceId,
        target: this.targetId,
      },
      group: 'edges',
      selected: false,
      selectable: true,
      locked: false,
      grabbable: true,
      classes: this.classes,
    };
  }
}
