// Copyright (c) 2019 the Octant contributors. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
//

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
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
        background-color: #fafafa;
        left: 0;
        top: 0;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cytoscape2Component implements OnChanges, OnInit {
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

  ngOnInit(): void {
    if(this.cytoscape && this.cytoscape.nodes() && this.cytoscape.nodes().first()) {
      this.select.emit(this.cytoscape.nodes().first().data());
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.elements && changes.elements.currentValue) {
      if (this.cytoscape) {
        this.applied = false;
        this.cytoscape.nodes('[?hasChildren]').forEach(node => {
          hideChildren(this.cytoscape, node);
        });
      }
      this.render();
    }
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
          .nodes()
          .forEach(node => positionChildren(this.cytoscape, node));
        if (this.cytoscape.nodes().length > 1) {
          this.cytoscape.fit(undefined, 50);
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
      localSelect.emit(node.data());
      this.moveStarted = false;
    });
  }

  // .popper-0 {
  //   background: transparent;
  //   font-family: Metropolis;
  //   font-size: 16px;
  //   color: #000000;
  //   z-index: 9999;
  //   padding: 0.25em;
  //   pointer-events: none;
  //   top: 22px !important;
  // }
  //
  // .popper-1 {
  //   background: transparent;
  //   font-family: Metropolis;
  //   font-size: 11px;
  //   color: #737373;
  //   z-index: 9999;
  //   padding: 0.25em;
  //   pointer-events: none;
  //   top: 38px !important;
  // }

  //
  // deletePoppers() {
  //   this.poppers.forEach((popper, index) => {
  //     if(popper && popper.nodeType) {
  //       document.body.removeChild(popper);
  //       this.poppers[index] = null;
  //       popper = null;
  //     }
  //   });
  //
  // }
  //
  // addPopper(node: any){
  //   if(node.isNode() && !node.data('popperCreated')) {
  //     const labels = node.data('label').split('\n');
  //     labels.forEach((label,index) => {
  //
  //       const popper = node.popper({
  //         content: () => {
  //           const div = document.createElement('div');
  //           const classes= `popper-${index}`;
  //
  //           div.classList.add(classes);
  //           div.innerHTML = label;
  //           document.body.appendChild(div);
  //           this.poppers.push(div);
  //           return div;
  //         },
  //         popper: { placement: 'top-start', removeOnDestroy: true, positionFixed:true }
  //       });
  //
  //       const update = () => {
  //         const zoom = this.cytoscape.zoom();
  //         popper.popper.style.fontSize = 24 * zoom + 'px';
  //         popper.scheduleUpdate();
  //       };
  //
  //       node.on('position', update);
  //       this.cytoscape.on('pan zoom resize', update);
  //       node.data('popperCreated', true)
  //     });
  //     node.data('label', '');
  //   }
  // }
}
