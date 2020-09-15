import {
  AnimatedLayoutOptions,
  BaseLayoutOptions,
  NodeSingular,
} from 'cytoscape';
import cytoscape from 'cytoscape';
import { isFunction } from 'rxjs/internal-compatibility';
import { BaseShape } from './base.shape';
import { ShapeUtils } from './shape.utils';
import { Shape } from './shapes';

export interface OctantLayoutOptions
  extends BaseLayoutOptions,
    AnimatedLayoutOptions {
  name: 'octant';
  fit: boolean;
  padding?: number;
}

const defaults = {
  positions: undefined,
  zoom: undefined,
  pan: undefined,
  fit: true,
  padding: 30,
  animate: false,
  animationDuration: 500,
  animationEasing: undefined,
  animateFilter(node, i) {
    return true;
  },
  ready: undefined,
  stop: undefined,
  transform(node, position) {
    return position;
  },
};

export function layoutChildren(
  shapes: BaseShape[],
  cy: cytoscape.Core,
  node: cytoscape.NodeSingular,
  showNodes: boolean
) {
  const offset = {
    x: node.position().x - node.data('x'),
    y: node.position().y - node.data('y'),
  };
  moveChildren(shapes, cy, node, offset, showNodes);
  moveNode(shapes, node, offset, showNodes);
}

export function hideChildren(cy: cytoscape.Core, node: cytoscape.NodeSingular) {
  const children = cy.nodes(`[owner = "${node.data('id')}"]`);
  children.map(child => {
    hideChildren(cy, child);
    child.style('visibility', 'hidden');
  });
}

function OctantLayout(options) {
  this.options = { ...defaults, ...options };
}

OctantLayout.prototype.run = function () {
  const options = this.options;
  const eles = options.eles;

  const nodes = eles.nodes();
  const posIsFn = isFunction(options.positions);

  function getPosition(node) {
    if (options.positions == null) {
      return { x: node.position().x, y: node.position().y };
    }

    if (posIsFn) {
      return options.positions(node);
    }

    const pos = options.positions[node._private.data.id];

    if (pos == null) {
      return null;
    }

    return pos;
  }

  nodes.layoutPositions(this, options, node => {
    const position = getPosition(node);

    if (node.locked() || position === null) {
      return { x: 0, y: 0 };
    }

    return { x: node.data('x'), y: node.data('y') };
  });

  return this; // chaining
};

function moveChildren(
  shapes: BaseShape[],
  cy: cytoscape.Core,
  node: cytoscape.NodeSingular,
  offset,
  showNodes: boolean
) {
  const children = cy.nodes(`[owner = "${node.data('id')}"]`);

  children.map(child => {
    moveNode(shapes, child, offset, showNodes);
    moveChildren(shapes, cy, child, offset, showNodes);
  });
  return children;
}

function moveNode(
  shapes: BaseShape[],
  node: NodeSingular,
  offset: cytoscape.Position,
  showNodes: boolean
) {
  const x = node.data('x') + offset.x;
  const y = node.data('y') + offset.y;
  const shape = ShapeUtils.findById(shapes, node.data('id'))[0] as Shape;

  node.data('x', x);
  node.data('y', y);
  node.position('x', x);
  node.position('y', y);
  if (shape) {
    shape.setCurrentPosition({ x, y });
  }
  if (showNodes) {
    node.style('visibility', 'visible');
  }
}

export default OctantLayout;
