// Copyright (c) 2019 the Octant contributors. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
//

import { TestBed } from '@angular/core/testing';

import { PodLogsService } from './pod-logs.service';
import { windowProvider, WindowToken } from '../../../window';
import { SharedModule } from '../shared.module';

describe('PodLogsService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [
        PodLogsService,
        { provide: WindowToken, useFactory: windowProvider }
        ],
    })
  );

  it('should be created', () => {
    const service: PodLogsService = TestBed.inject(PodLogsService);
    expect(service).toBeTruthy();
  });
});
