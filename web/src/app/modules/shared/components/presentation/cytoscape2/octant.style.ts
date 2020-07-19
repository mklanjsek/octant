import NodeShape = cytoscape.Css.NodeShape;
import { Stylesheet } from 'cytoscape';

const polygonPoints = (header: number) => {
  return `-1, -1,   -1, ${header},   1, ${header},   1, 1,  -1, 1,   -1, ${header},   1, ${header},   1, -1,   -1, -1`;
};

const renderImage = ele => {
  const status = ele.data('status');

  const svgHealthy = `<svg version="1.1" width="36" height="36" viewBox="0 0 36 36" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
        <title>check-circle-solid</title>
        <path class="clr-i-solid clr-i-solid-path-1" d="M30,18A12,12,0,1,1,18,6,12,12,0,0,1,30,18Zm-4.77-2.16a1.4,1.4,0,0,0-2-2l-6.77,6.77L13,17.16a1.4,1.4,0,0,0-2,2l5.45,5.45Z" fill="#62A420"></path>
        <rect x="0" y="0" width="36" height="36" fill-opacity="0"/></svg>`;
  const svgWarning = `<svg version="1.1" width="36" height="36" viewBox="0 0 36 36" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
    <title>exclamation-triangle-solid</title>
    <path class="clr-i-solid clr-i-solid-path-1" d="M30.33,25.54,20.59,7.6a3,3,0,0,0-5.27,0L5.57,25.54A3,3,0,0,0,8.21,30H27.69a3,3,0,0,0,2.64-4.43ZM16.46,12.74a1.49,1.49,0,0,1,3,0v6.89a1.49,1.49,0,1,1-3,0ZM18,26.25a1.72,1.72,0,1,1,1.72-1.72A1.72,1.72,0,0,1,18,26.25Z" fill="#EFC006"></path>
    <rect x="0" y="0" width="36" height="36" fill-opacity="0"/></svg>`;
  const svgError = `<svg version="1.1" width="36" height="36" viewBox="0 0 36 36" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
    <title>exclamation-circle-solid</title>
    <path class="clr-i-solid clr-i-solid-path-1" d="M18,6A12,12,0,1,0,30,18,12,12,0,0,0,18,6Zm-1.49,6a1.49,1.49,0,0,1,3,0v6.89a1.49,1.49,0,1,1-3,0ZM18,25.5a1.72,1.72,0,1,1,1.72-1.72A1.72,1.72,0,0,1,18,25.5Z" fill="#E62700"></path>
    <rect x="0" y="0" width="36" height="36" fill-opacity="0"/></svg>`;

  const image =
    status === 'ok' ? svgHealthy : status === 'error' ? svgError : svgWarning;
  return 'data:image/svg+xml;base64,' + btoa(image);
};

export const ELEMENTS_STYLE: Stylesheet[] = [
  {
    selector: 'node',
    css: {
      shape: 'polygon',
      'shape-polygon-points': polygonPoints(-0.44),
      width: 'data(width)',
      height: 'data(height)',
      content: 'data(label)',
      'background-color': 'white',
      color: 'black',
      'border-color': node => nodeColor(node),
      'border-width': '2px',
      'border-style': 'solid',
      ghost: 'no',
      'text-wrap': 'wrap',
      'text-valign': 'top',
      'text-halign': 'left',
      'text-margin-y': 30,
      'padding-left': '10px',
      'padding-right': '10px',
      'padding-top': '10px',
      'padding-bottom': '10px',
      'z-index': 1,
    },
  },
  {
    selector: 'node:selected',
    css: {
      'curve-style': 'bezier',
      'border-width': 2,
      'border-color': '#0079B8',
      'border-style': 'solid',
      'overlay-opacity': 0,
    },
  },
  {
    selector: 'edge',
    css: {
      'curve-style': 'bezier',
      opacity: 1,
      width: 1.5,
      'line-color': 'black',
      'source-arrow-color': 'black',
      'source-arrow-fill': 'hollow',
      'source-arrow-shape': 'tee',
      'target-arrow-color': 'black',
      'target-arrow-fill': 'hollow',
      'target-arrow-shape': 'triangle-backcurve',
      'arrow-scale': 2,
      // @ts-ignore: cytoscape type definitions are out of date
      'z-compound-depth': 'top',
    },
  },
  {
    selector: '.unbundled',
    css: {
      'curve-style': 'unbundled-bezier',
      // @ts-ignore: cytoscape type definitions are out of date
      'source-endpoint': '90deg',
      // @ts-ignore: cytoscape type definitions are out of date
      'target-endpoint': '270deg',
    },
  },
  {
    selector: '.pod',
    css: {
      ghost: 'yes',
      'ghost-opacity': 1,
      'ghost-offset-x': 10,
      'ghost-offset-y': 10,
      'border-width': 1.5,
      'z-index': 3,
    },
  },
  {
    selector: '.deployment',
    css: {
      'border-width': '1px',
      'shape-polygon-points': polygonPoints(-0.76),
    },
  },
  {
    selector: '.sets',
    css: {
      'border-width': '1px',
      'shape-polygon-points': polygonPoints(-0.7),
    },
  },
  {
    selector: '.secret',
    css: {},
  },
  {
    selector: '.replicaset',
    css: {
      'border-style': 'dashed',
      'border-width': 3,
      'z-index': 2,
      'shape-polygon-points': polygonPoints(-0.64),
    },
  },
  {
    selector: '.label',
    css: {
      'background-color': '#13C6CE',
      'text-halign': 'center',
      'border-width': '0px',
      'z-index': 10,
    },
  },
  {
    selector: '.port',
    css: {
      'border-width': '0px',
      'text-halign': 'center',
      'z-index': 10,
    },
  },
  {
    selector: '.header',
    css: {
      shape: 'rectangle',
      'background-color': 'white',
      'border-width': '0px',
      'font-family': 'Metropolis',
      'text-halign': 'right',
      'text-valign': 'center',
      'padding-left': '0px',
      'padding-right': '0px',
      'padding-top': '0px',
      'padding-bottom': '0px',
      'text-margin-x': -294,
      'text-margin-y': 0,
      'z-index': 10,
    },
  },
  {
    selector: '.header-1',
    css: {
      'font-size': '22px',
    },
  },
  {
    selector: '.header-2',
    css: {
      'font-size': '14px',
      color: 'gray',
    },
  },
  {
    selector: '.selector',
    css: {
      'background-color': '#F9C011',
      'text-halign': 'center',
      'border-width': '0px',
      'z-index': 10,
    },
  },
  {
    selector: '[owner]',
    css: {
      // @ts-ignore: cytoscape type definitions are out of date
      visibility: 'hidden',
    },
  },
  {
    selector: '.status',
    css: {
      'background-image': renderImage,
      'background-width': '36px',
      'background-height': '36px',
      'background-position-x': '95%',
      'background-position-y': '5%',
    },
  },
];

function nodeColor(node): string {
  switch (node.data('status')) {
    case 'error':
      return '#E62700';
    case 'warning':
      return '#EFC006';
    default:
      return '#C1CDD4';
  }
}
