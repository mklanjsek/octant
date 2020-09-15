import { BaseShape } from './base.shape';
import { BackendEdgeDef } from '../../../models/content';
import { Options } from './graph.options';

export class Edge extends BaseShape {
  constructor(
    id: string,
    public sourceId: string,
    public targetId: string,
    public parentSourceId: string,
    public parentTargetId: string,
    public ownerSourceId: string,
    public ownerTargetId: string,
    public edge: BackendEdgeDef,
    public firstPosition: string,
    public secondPosition: string,
    public classes?: string
  ) {
    super(id, 'Edge');
  }

  public getSourceId(options) {
    return options.usePorts && options.showDetails
      ? this.sourceId
      : options.showDetails
      ? this.ownerSourceId
      : this.parentSourceId;
  }

  public getTargetId(options) {
    return options.usePorts && options.showDetails
      ? this.targetId
      : options.showDetails
      ? this.ownerTargetId
      : this.parentTargetId;
  }

  public getSourceLabel(options) {
    return options.showDetails && !options.usePorts
      ? this.edge.destination.connector
      : '';
  }

  public getTargetLabel(options) {
    return options.showDetails && !options.usePorts
      ? this.edge.source.connector
      : '';
  }

  toNode(shapes: BaseShape[], options: Options): any {
    return {
      data: {
        id: this.id,
        source: this.getSourceId(options),
        target: this.getTargetId(options),
        label: this.id,
        sourceLabel: this.getSourceLabel(options),
        targetLabel: this.getTargetLabel(options),
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
