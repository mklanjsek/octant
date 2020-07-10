import {storiesOf} from '@storybook/angular';
import {
  REAL_DATA_DAEMON_SET, REAL_DATA_DAEMON_SET2,
  REAL_DATA_DEPLOYMENT,
  REAL_DATA_STATEFUL_SET, REAL_DATA_TWO_REPLICAS,
} from './graph.real.data';
import {object} from "@storybook/addon-knobs";
import {
  Deployment,
  Pod,
  Port,
  ReplicaSet,
  Secret,
  Service,
  ServiceAccount,
} from "../app/modules/shared/components/presentation/cytoscape2/shapes";
import {ShapeUtils} from "../app/modules/shared/components/presentation/cytoscape2/shape.utils";
import {BaseShape} from "../app/modules/shared/components/presentation/cytoscape2/base.shape";
import {Edge} from "../app/modules/shared/components/presentation/cytoscape2/edges";

const layout = {name: 'cose-bilkent', padding: 30, fit: false, animateFilter: () => false};

const zoom = {
  min: 0.1,
  max: 2.0,
};

storiesOf('Resources', module).add('with ports', () => {
  const oldShapesWithPorts: BaseShape[] = [
    new Deployment('glyph0', 'Deployment', true),
    new Secret('glyph2', 'Secret', true),
    new ServiceAccount('glyph3', 'ServiceAccount', false),
    new Service('glyph1', 'Service', true),
    new ReplicaSet('glyph10', 'ReplicaSet: 3', true, 'glyph0'),
    new Pod('glyph30', 'Pods', true, 'glyph10'),
    new Port('glyph20', 'image: nginx', 'left', 'port', 'glyph0'),
    new Port('glyph21', 'metadata.annotations', 'right', 'port', 'glyph2'),
    new Port('glyph41', 'app: demo', 'left', 'label', 'glyph30'),
    new Port('glyph42', 'app: demo', 'right', 'selector', 'glyph1'),
    new Port('glyph50', 'name', 'right', 'port', 'glyph3'),
    new Port('glyph51', 'serviceAccount', 'left', 'port', 'glyph30'),
    new Port('glyph52', 'secrets.name', 'left', 'port', 'glyph3'),
    new Edge('glyph42-glyph41', 'glyph42', 'glyph41'),
    new Edge('glyph52-glyph21', 'glyph52', 'glyph21'),
    new Edge('glyph50-glyph51', 'glyph50', 'glyph51', 'unbundled'),
  ];

  const eles = object('elements', oldShapesWithPorts.map(shape => shape.toNode(oldShapesWithPorts)));

  return {
    props: {
      elements: eles,
      layout: layout,
      zoom: zoom,
    },
    template: `
      <div class="main-container">
          <div class="content-container">
              <div class="content-area" style="background-color: white;">
                  <app-cytoscape2
                    [elements]="elements" 
                    [layout]="layout" 
                    [zoom]="zoom"> 
                  </app-cytoscape2>
              </div>
          </div>
      </div>
      `,
  }
});

const testCases= [{title:'Deployment', data: REAL_DATA_DEPLOYMENT},
 {title:'StatefulSet', data: REAL_DATA_STATEFUL_SET},
 {title:'DaemonSet', data: REAL_DATA_DAEMON_SET},
 {title:'single DaemonSet', data: REAL_DATA_DAEMON_SET2},
 {title:'two ReplicaSets', data: REAL_DATA_TWO_REPLICAS},
];

testCases.map(story =>
  storiesOf('Resources', module).add(`with ${story.title}`, () => {
    const newShapes= ShapeUtils.loadShapes(story.data);

    const eles = object('elements', newShapes);

    return {
      props: {
        elements: eles,
        layout: layout,
        zoom: zoom,
      },
      template: `
        <div class="main-container">
            <div class="content-container">
                <div class="content-area" style="background-color: white;">
                    <app-cytoscape2
                      [elements]="elements" 
                      [layout]="layout" 
                      [zoom]="zoom"> 
                    </app-cytoscape2>
                </div>
            </div>
        </div>
        `,
    }
}));
