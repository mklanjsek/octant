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
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import cytoscape, {
  BaseLayoutOptions,
  NodeSingular,
  SingularData,
  Stylesheet,
} from 'cytoscape';
import { hideChildren, layoutChildren } from './octant.layout';
import coseBilkent from 'cytoscape-cose-bilkent';
import popper from 'cytoscape-popper';
import octant from './octant.layout';
import { ELEMENTS_STYLE } from './octant.style';
import spread from 'cytoscape-spread';
import { ShapeUtils } from './shape.utils';
import { ResourceViewerData } from '../../../models/content';
import { BaseShape } from './base.shape';
import { Shape } from './shapes';
import { Options } from './graph.options';

cytoscape.use(popper);
cytoscape.use(coseBilkent);
cytoscape('layout', 'octant', octant);

cytoscape.use(spread);
spread(cytoscape);

@Component({
  selector: 'app-cytoscape2',
  template: '<div #cy class="cy"></div>',
  styleUrls: ['./cytoscape2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cytoscape2Component implements OnChanges, OnInit, OnDestroy {
  @ViewChild('cy', { static: true }) private cy: ElementRef;
  @Input() public elements: ResourceViewerData;
  @Input() public layout: any;
  @Input() public zoom: any;
  @Output() select: EventEmitter<any> = new EventEmitter<any>();
  @Output() doubleClick: EventEmitter<any> = new EventEmitter<any>();

  nodes: BaseShape[] = [];
  complexLayout = false;
  cytoscape: cytoscape.Core;
  style: Stylesheet[] = ELEMENTS_STYLE;
  moveStarted = false;
  doubleClickDelay = 400;
  previousTapStamp;
  options = new Options(true, true);
  navigation;

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
      this.addNavigation();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.elements && changes.elements.currentValue) {
      this.nodes = Object.entries(this.elements.nodes).map(([key, value]) =>
        ShapeUtils.fromDataStream(key, value)
      );
      this.complexLayout = this.nodes.length >= 11;
      this.createLayout();
      if (this.elements.edges) {
        ShapeUtils.createEdges(
          this.nodes,
          this.elements.edges,
          this.options,
          this.complexLayout
        );
      }
      this.nodes.sort(
        (a: BaseShape, b: BaseShape) =>
          ShapeUtils.shapeOrder(a.kind) - ShapeUtils.shapeOrder(b.kind)
      );

      if (this.cytoscape) {
        this.cytoscape.nodes('[?hasChildren], .header').forEach(node => {
          hideChildren(this.cytoscape, node);
        });
      }
      this.render();
      const headers = ShapeUtils.addHeaderNodes(
        this.nodes,
        this.cytoscape.nodes()
      );
      this.cytoscape.add(headers);
      if (this.complexLayout) {
        this.options.showDetails = false;
        this.cytoscape.remove('.port, .label, .selector');
        this.nodes
          .filter(node => node.kind !== 'Edge')
          .forEach((node: Shape) => node.deletePorts());
        this.nodes = this.nodes.filter(node => node.kind !== 'Port');
      }
      this.finalize();
    }
  }

  ngOnDestroy(): void {
    if (this.navigation) {
      this.navigation.parentNode.removeChild(this.navigation);
    }
  }

  private finalize() {
    ShapeUtils.createPorts(
      this.cytoscape,
      this.nodes,
      this.cytoscape.nodes(),
      this.options
    );
    this.cytoscape.batch(() => {
      this.cytoscape
        .nodes('[?hasChildren], .header, .pod, .port, .label, .selector')
        .forEach(node => {
          layoutChildren(this.nodes, this.cytoscape, node, false);
          node.style('visibility', 'visible');
        });
    });
  }

  public createLayout() {
    if (this.complexLayout) {
      this.layout = {
        name: 'spread',
        fit: true,
        prelayout: { name: 'octant' },
        animate: true,
        expandingFactor: 0.075,
        maxExpandIterations: 100,
        minDist: 550,
        padding: 20,
      } as BaseLayoutOptions;
    } else {
      this.layout = { name: 'octant' };
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
      elements: this.nodes.map(
        shape => shape && shape.toNode(this.nodes, this.options)
      ),
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
      this.cytoscape.batch(() => {
        this.nodes
          .filter((node: Shape) => node.hasChildren)
          .forEach(shape => {
            const cyNode = this.cytoscape.nodes(`[id = '${shape.id}']`)[0];
            layoutChildren(this.nodes, this.cytoscape, cyNode, true);
          });
      });

      const firstNode = this.cytoscape.nodes().first();
      this.cytoscape.nodes().unselect();
      firstNode.select();
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
      layoutChildren(this.nodes, this.cytoscape, node, true);
      localSelect.emit(node.data());
      this.cytoscape.nodes().unselect();
      node.select();
      this.moveStarted = false;
    });
  }

  showDetails() {
    const check: HTMLInputElement = document.getElementById(
      'show-details'
    ) as HTMLInputElement;
    this.options.showDetails = check.checked;
    this.cytoscape.remove('.port, .label, .selector');
    this.nodes
      .filter(node => node.kind !== 'Edge')
      .forEach((node: Shape) => node.deletePorts());
    this.nodes = this.nodes.filter(node => node.kind !== 'Port');
    this.finalize();
  }

  usePorts() {
    const check: HTMLInputElement = document.getElementById(
      'use-edge-labels'
    ) as HTMLInputElement;
    this.options.usePorts = !check.checked;
    this.cytoscape.remove('.port, .label, .selector');
    this.nodes
      .filter(node => node.kind !== 'Edge')
      .forEach((node: Shape) => node.deletePorts());
    this.nodes = this.nodes.filter(node => node.kind !== 'Port');
    this.finalize();
  }

  zoomIn() {
    this.performZoom(1);
  }

  zoomOut() {
    this.performZoom(-1);
  }

  performZoom(factor: number) {
    const currentZoom = this.cytoscape.zoom();
    const step = (this.cytoscape.maxZoom() - this.cytoscape.minZoom()) / 20;
    const newZoom = Math.min(
      this.cytoscape.maxZoom(),
      Math.max(this.cytoscape.minZoom(), currentZoom + factor * step)
    );
    const viewPort = this.cytoscape.extent();
    const center = {
      x: viewPort.x1 + (viewPort.x2 - viewPort.x1) / 2,
      y: viewPort.y1 + (viewPort.y2 - viewPort.y1) / 2,
    };

    this.cytoscape.zoom({ level: newZoom, position: center });
  }

  addNavigation() {
    const cy: any = this.cytoscape;

    cy.popper({
      content: () => {
        const checkedDetails = this.options.showDetails ? 'checked' : '';
        const checkedPorts = this.options.usePorts ? 'checked' : '';
        const div = document.createElement('div');
        div.innerHTML = `<div>
                <input type="checkbox" id="show-details" ${checkedDetails}>
                <label for="show-details">Show details</label><br>
                <input type="checkbox" id="use-edge-labels" ${!checkedPorts}>
                <label for="use-edge-labels">Use edge labels</label><br>
                <div>
                  <button id="zoom-in" class="round-button">+</button>
                  <button class="round-button" id="zoom-out">-</button>
                </div>
                </div>`;

        document.body.appendChild(div);
        const showDetailsCheckbox = document.getElementById('show-details');
        this.showDetails = this.showDetails.bind(this);
        showDetailsCheckbox.onclick = this.showDetails;

        const usePortsCheckbox = document.getElementById('use-edge-labels');
        this.usePorts = this.usePorts.bind(this);
        usePortsCheckbox.onclick = this.usePorts;

        const zoomInButton = document.getElementById('zoom-in');
        this.zoomIn = this.zoomIn.bind(this);
        zoomInButton.onclick = this.zoomIn;

        const zoomOutButton = document.getElementById('zoom-out');
        this.zoomOut = this.zoomOut.bind(this);
        zoomOutButton.onclick = this.zoomOut;

        this.navigation = div;
        return div;
      },
      renderedPosition: () => ({ x: 72, y: cy.height() - 32 }),
      popper: { removeOnDestroy: true, positionFixed: true },
    });
  }
}
