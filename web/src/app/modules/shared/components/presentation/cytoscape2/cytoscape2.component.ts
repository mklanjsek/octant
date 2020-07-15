// Copyright (c) 2019 the Octant contributors. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
//

import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import cytoscape, { NodeSingular, SingularData, Stylesheet } from 'cytoscape';
import {
  hideChildren,
  positionChildren,
  layoutChildren,
} from './octant.layout';
import coseBilkent from 'cytoscape-cose-bilkent';
import octant from './octant.layout';
import { ELEMENTS_STYLE } from './octant.style';

cytoscape.use(coseBilkent);
cytoscape('layout', 'octant', octant);

@Component({
  selector: 'app-cytoscape2',
  template: '<div #cy class="cy"></div>',
  styles: [
    `
      .cy {
        height: 100%;
        width: 100%;
        position: relative;
        left: 0;
        top: 0;
      }
    `,
  ],
})
export class Cytoscape2Component implements OnChanges {
  @ViewChild('cy', { static: true }) private cy: ElementRef;
  @Input() public elements: any;
  @Input() public layout: any;
  @Input() public zoom: any;
  @Output() select: EventEmitter<any> = new EventEmitter<any>();
  @Output() doubleClick: EventEmitter<any> = new EventEmitter<any>();

  cytoscape: cytoscape.Core;
  style: Stylesheet[] = ELEMENTS_STYLE;
  applied = false;
  moveStarted = false;
  doubleClickDelay = 400;
  previousTapStamp;

  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.layout = this.layout || {
      name: 'grid',
      directed: true,
    };

    this.zoom = this.zoom || {
      min: 0.1,
      max: 1.5,
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.elements && this.cytoscape) {
      this.applied = false;
      this.cytoscape.nodes('[?hasChildren]').forEach(node => {
        hideChildren(this.cytoscape, node);
      });
    }
    this.render();
  }

  public render() {
    const cyContainer = this.renderer.selectRootElement(this.cy.nativeElement);
    const localSelect = this.select;
    const localDoubleClick = this.doubleClick;
    const options: cytoscape.CytoscapeOptions = {
      container: cyContainer,
      layout: this.layout,
      minZoom: this.zoom.min,
      maxZoom: this.zoom.max,
      style: this.style,
      elements: this.elements,
    };
    this.cytoscape = cytoscape(options);

    this.cytoscape.on('tap', 'node', e => {
      const currentTapStamp = e.timeStamp;
      const msFromLastTap = currentTapStamp - this.previousTapStamp;
      const node: SingularData = e.target;

      if (msFromLastTap < this.doubleClickDelay) {
        localDoubleClick.emit(node.data());
      } else {
        localSelect.emit(node.data());
      }
      this.previousTapStamp = currentTapStamp;
    });

    this.cytoscape.on('layoutstop', e => {
      if (!this.applied) {
        this.applied = true;
        this.cytoscape
          .nodes('[?hasChildren]')
          .forEach(node => positionChildren(this.cytoscape, node));
        if (this.cytoscape.nodes().length > 1) {
          this.cytoscape.fit();
        } else {
          this.cytoscape.fit(undefined, 150);
        }
      }
    });

    this.cytoscape.on('drag', 'node', e => {
      const node: NodeSingular = e.target;
      if (!this.moveStarted) {
        this.moveStarted = true;
        hideChildren(this.cytoscape, node);
      }
    });

    this.cytoscape.on('dragfree', 'node', e => {
      const node: NodeSingular = e.target;
      layoutChildren(this.cytoscape, node);
      this.moveStarted = false;
    });
  }
}
