import {
  AnimatedLayoutOptions,
  BaseLayoutOptions,
  NodeSingular,
} from 'cytoscape';
import cytoscape from 'cytoscape';
import { isFunction } from 'rxjs/internal-compatibility';

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

export function positionChildren(
  cy: cytoscape.Core,
  node: cytoscape.NodeSingular
) {
  moveChildren(cy, node, { x: 0, y: 0 });
  const options: OctantLayoutOptions = { name: 'octant', fit: false };
  cy.nodes(`[id = '${node.id()}']`).layout(options).run();
}

export function layoutChildren(
  cy: cytoscape.Core,
  node: cytoscape.NodeSingular
) {
  const offset = {
    x: node.position().x - node.data('x'),
    y: node.position().y - node.data('y'),
  };
  moveChildren(cy, node, offset);
  moveNode(node, offset);
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

export function moveChildren(
  cy: cytoscape.Core,
  node: cytoscape.NodeSingular,
  offset
) {
  const children = cy.nodes(`[owner = "${node.data('id')}"]`);

  children.map(child => {
    moveNode(child, offset);
    child.style('visibility', 'visible');
    moveChildren(cy, child, offset);
  });
  return children;
}

function moveNode(node: NodeSingular, offset: cytoscape.Position) {
  const x= node.data('x') + offset.x;
  const y= node.data('y') + offset.y;
  node.data('x', x);
  node.data('y', y);
  node.position('x', x);
  node.position('y', y);
  node.style('visibility', 'visible');
}

export default OctantLayout;
