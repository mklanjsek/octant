import { BaseShape } from './base.shape';
import { BackendEdgeDef } from '../../../models/content';
import { Options } from './graph.options';

export class Edge extends BaseShape {
  constructor(
    id: string,
    public sourceId: string,
    public targetId: string,
    public edge: BackendEdgeDef,
    public firstPosition: string,
    public secondPosition: string,
    public classes?: string
  ) {
    super(id, 'Edge');
  }

  toNode(shapes: BaseShape[], options: Options): any {
    return {
      data: {
        id: this.id,
        source: this.sourceId,
        target: this.targetId,
        label: this.id,
        'sourceLabel': options.showDetails && !options.usePorts ? this.edge.destination.connector : '',
        'targetLabel': options.showDetails && !options.usePorts ? this.edge.source.connector : '',
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
