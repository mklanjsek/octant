import {storiesOf} from '@storybook/angular';
import {
  REAL_DATA_DAEMON_SET, REAL_DATA_DAEMON_SET2,
  REAL_DATA_DEPLOYMENT, REAL_DATA_INGRESS, REAL_DATA_JOB,
  REAL_DATA_STATEFUL_SET, REAL_DATA_TWO_REPLICAS, REAL_DATA_TWO_SECRETS,
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
    new Deployment('glyph0', 'ok', 'Deployment', true),
    new Secret('glyph2', 'ok', 'Secret', true),
    new ServiceAccount('glyph3', 'warning', 'ServiceAccount', false),
    new Service('glyph1', 'error', 'Service', true),
    new ReplicaSet('glyph10', 'ok', 'ReplicaSet: 3', true, 'glyph0'),
    new Pod('glyph30', 'ok', 'Pods', true, 'glyph10'),
    new Port('glyph20', 'ok', 'image: nginx', 'left', 'port', 'glyph0'),
    new Port('glyph21', 'ok', 'metadata.annotations', 'right', 'port', 'glyph2'),
    new Port('glyph41', 'ok', 'app: demo', 'left', 'label', 'glyph30'),
    new Port('glyph42', 'ok', 'app: demo', 'right', 'selector', 'glyph1'),
    new Port('glyph50', 'ok', 'name', 'right', 'port', 'glyph3'),
    new Port('glyph51', 'ok', 'serviceAccount', 'left', 'port', 'glyph30'),
    new Port('glyph52', 'ok', 'secrets.name', 'left', 'port', 'glyph3'),
    new Edge('glyph42-glyph41', 'glyph42', 'glyph41'),
    new Edge('glyph52-glyph21', 'glyph52', 'glyph21'),
    new Edge('glyph50-glyph51', 'glyph50', 'glyph51', 'unbundled'),
  ];

  const nodes=  oldShapesWithPorts.map(shape => shape.toNode(oldShapesWithPorts));
  const eles = object('elements', ShapeUtils.addHeaderNodes(oldShapesWithPorts, nodes));

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
 {title:'two Secrets', data: REAL_DATA_TWO_SECRETS},
 {title:'Job', data: REAL_DATA_JOB},
 {title:'Ingress', data: REAL_DATA_INGRESS},
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
