/*
 * Copyright (c) 2020 the Octant contributors. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import { TestBed } from '@angular/core/testing';
import { ViewHostDirective } from './view-host.directive';
import { SharedModule } from '../../shared.module';

describe('ViewHostDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
    });
  });
  it('should create an instance', () => {
    const directive = new ViewHostDirective(undefined);
    expect(directive).toBeTruthy();
  });
});
