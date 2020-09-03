import {storiesOf} from '@storybook/angular';
import {
  REAL_DATA_CRDS, REAL_DATA_CRDS2,
  REAL_DATA_DAEMON_SET, REAL_DATA_DAEMON_SET2,
  REAL_DATA_DEPLOYMENT, REAL_DATA_INGRESS, REAL_DATA_JOB,
  REAL_DATA_STATEFUL_SET, REAL_DATA_TWO_REPLICAS, REAL_DATA_TWO_SECRETS,
} from './graph.real.data';
import {object} from "@storybook/addon-knobs";

const layout = {name: 'cose-bilkent', padding: 30, fit: false, animateFilter: () => false};

const zoom = {
  min: 0.075,
  max: 4.0,
};

const testCases= [{title:'Deployment', data: REAL_DATA_DEPLOYMENT},
 {title:'StatefulSet', data: REAL_DATA_STATEFUL_SET},
 {title:'DaemonSet', data: REAL_DATA_DAEMON_SET},
 {title:'single DaemonSet', data: REAL_DATA_DAEMON_SET2},
 {title:'two ReplicaSets', data: REAL_DATA_TWO_REPLICAS},
 {title:'two Secrets', data: REAL_DATA_TWO_SECRETS},
 {title:'Job', data: REAL_DATA_JOB},
 {title:'Ingress', data: REAL_DATA_INGRESS},
 {title:'Custom Resources', data: REAL_DATA_CRDS},
 {title:'More Custom Resources', data: REAL_DATA_CRDS2},
];

testCases.map(story =>
  storiesOf('Resources', module).add(`with ${story.title}`, () => {
    const eles = object('elements', story.data);

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
