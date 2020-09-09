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

import cytoscape, { BaseLayoutOptions, NodeSingular, SingularData, Stylesheet } from 'cytoscape';
import {
  hideChildren,
  layoutChildren
} from './octant.layout';
import coseBilkent from 'cytoscape-cose-bilkent';
import octant from './octant.layout';
import { ELEMENTS_STYLE } from './octant.style';
import spread from 'cytoscape-spread';
import { ShapeUtils } from './shape.utils';
import { ResourceViewerData } from '../../../models/content';
import { BaseShape } from './base.shape';
import { Shape } from './shapes';
import { Options } from './graph.options';

cytoscape.use(coseBilkent);
cytoscape('layout', 'octant', octant);

cytoscape.use(spread);
spread( cytoscape );

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
  @Input() public elements: ResourceViewerData;
  @Input() public layout: any;
  @Input() public zoom: any;
  @Output() select: EventEmitter<any> = new EventEmitter<any>();
  @Output() doubleClick: EventEmitter<any> = new EventEmitter<any>();

  headers: any= [];
  nodes: BaseShape[] = [];
  complexLayout: boolean = false;
  cytoscape: cytoscape.Core;
  style: Stylesheet[] = ELEMENTS_STYLE;
  applied = false;
  moveStarted = false;
  doubleClickDelay = 400;
  previousTapStamp;
  options= new Options(true, true);

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
    if (
      this.cytoscape &&
      this.cytoscape.nodes() &&
      this.cytoscape.nodes().first()
    ) {
      this.select.emit(this.cytoscape.nodes().first().data());
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.elements && changes.elements.currentValue) {

      this.nodes = Object.entries(this.elements.nodes).map(([key, value]) =>
        ShapeUtils.fromDataStream(key, value)
      );
      this.complexLayout= this.nodes.length >= 11;
      if (this.elements.edges) {
        ShapeUtils.createEdges(this.nodes, this.elements.edges, this.options, this.complexLayout);
      }

      this.nodes.sort(
        (a: BaseShape, b: BaseShape) =>
          ShapeUtils.shapeOrder(a.kind) - ShapeUtils.shapeOrder(b.kind)
      );

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
      elements: this.nodes.map(shape => shape && shape.toNode(this.nodes, this.options)),
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
      let done: boolean = false;
      if (e.layout.options.name === 'cose-bilkent' && !this.applied) {
        if(this.complexLayout) {
          const layoutSpread = this.cytoscape.nodes().layout({
            name: 'spread', fit: true, prelayout: { name: 'octant' }, animate: true,
            expandingFactor: 0.1,
            maxExpandIterations: 100,
            minDist: 550, padding: 20
          } as BaseLayoutOptions);
          layoutSpread.run();
        } else {
          const headers= ShapeUtils.addHeaderNodes(this.nodes, this.cytoscape.nodes());
          this.cytoscape.add(headers);
          const finalLayout = this.cytoscape.nodes().layout({ name: 'octant' })
          finalLayout.run();
          ShapeUtils.createPorts(this.cytoscape, this.nodes, this.cytoscape.nodes(), this.options);
          this.cytoscape
            .nodes()
            .forEach(node => {
              layoutChildren(this.cytoscape, node);
            });
          done = true;
        }
      }
      else if (e.layout.options.name === 'spread' && !this.applied) {
        this.applied = true;
        ShapeUtils.createPorts(this.cytoscape, this.nodes, this.cytoscape.nodes(), this.options);

        this.nodes.filter((node: Shape) => node.hasChildren).forEach(shape => {
          const cyNode=this.cytoscape.nodes(`[id = '${shape.id}']`)[0];
          layoutChildren(this.cytoscape, cyNode);
        });
        ShapeUtils.consolidatePosition(this.nodes, this.cytoscape.nodes());
        const headers= ShapeUtils.addHeaderNodes(this.nodes, this.cytoscape.nodes());
        this.cytoscape.add(headers);

        this.cytoscape
          .nodes('.header')
          .forEach(node => {
            node.style('visibility', 'visible');
          });
        done = true;
      }
      if(done) {
        const firstNode = this.cytoscape.nodes().first();
        this.cytoscape.nodes().unselect();
        firstNode.select();
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
      this.cytoscape.nodes().unselect();
      node.select();
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
