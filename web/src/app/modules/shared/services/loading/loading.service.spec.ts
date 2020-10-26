/*
 * Copyright (c) 2020 the Octant contributors. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { ApplyYAMLComponent } from 'src/app/modules/sugarloaf/components/smart/apply-yaml/apply-yaml.component';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [ApplyYAMLComponent],
      providers: [LoadingService],
    })
  );

  it('should be created', () => {
    const service: LoadingService = TestBed.inject(LoadingService);
    expect(service).toBeTruthy();
  });
});
