import { ElementDefinition } from 'cytoscape';

export abstract class BaseShape {
  protected constructor(public id: string, public kind: string) {}

  abstract toNode(shapes: BaseShape[]): ElementDefinition;
}
