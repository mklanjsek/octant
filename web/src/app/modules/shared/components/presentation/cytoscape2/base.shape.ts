import { ElementDefinition } from 'cytoscape';
import { Options } from './graph.options';

export abstract class BaseShape {
  protected constructor(public id: string, public kind: string) {}

  abstract toNode(shapes: BaseShape[], options: Options): ElementDefinition;
}
