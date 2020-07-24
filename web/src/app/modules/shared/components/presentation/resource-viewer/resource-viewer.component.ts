// Copyright (c) 2019 the Octant contributors. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
//

import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import isEqual from 'lodash/isEqual';
import {
  Node,
  ResourceViewerView,
  View,
} from 'src/app/modules/shared/models/content';
import { ElementsDefinition, Stylesheet } from 'cytoscape';
import { ShapeUtils } from '../cytoscape2/shape.utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-resource-viewer',
  templateUrl: './resource-viewer.component.html',
  styleUrls: ['./resource-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResourceViewerComponent implements OnChanges, AfterViewInit {
  private v: ResourceViewerView;

  @Input() set view(v: View) {
    this.v = v as ResourceViewerView;
  }
  get view() {
    return this.v;
  }

  currentView: ResourceViewerView;
  selected: string;
  selectedNode: Node;

  layout = {
    name: 'cose-bilkent',
    padding: 30,
    fit: false,
    animateFilter: () => false,
  };

  zoom = {
    min: 0.25,
    max: 4.0,
  };

  graphData: ElementsDefinition;
  private afterFirstChange: boolean;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    if (this.afterFirstChange) {
      this.graphData = this.generateGraphData();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isEquals = isEqual(
      changes.view.currentValue,
      changes.view.previousValue
    );

    if (changes.view.isFirstChange() || !isEquals) {
      this.currentView = changes.view.currentValue as ResourceViewerView;
      this.select(this.currentView.config.selected);
      this.graphData = this.generateGraphData();
      this.afterFirstChange = true;
    }
  }

  nodeChange(event) {
    this.select(event.id);
  }

  openNode(event) {
    const node = this.currentView.config.nodes[event.id];
    if (node && node.path) {
      this.router.navigateByUrl(node.path.config.ref);
    }
  }

  generateGraphData(): ElementsDefinition {
    return ShapeUtils.loadShapes(this.currentView.config);
  }

  private select(id: string) {
    this.selected = id;

    const nodes = this.currentView.config.nodes;

    if (nodes && nodes[id]) {
      this.selectedNode = nodes[id];
    }
  }
}
