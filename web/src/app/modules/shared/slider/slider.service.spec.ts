// Copyright (c) 2019 the Octant contributors. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
//

import { TestBed, waitForAsync } from '@angular/core/testing';
import { SliderService } from './slider.service';
import { SharedModule } from '../shared.module';

describe('SliderService', () => {
  let service: SliderService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [SharedModule],
        providers: [SliderService],
      });
      service = TestBed.inject(SliderService);
    })
  );

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(
    'set value',
    waitForAsync(() => {
      service.setHeight(100);
      service.setHeight$.subscribe(current => expect(current).toEqual(100));
      expect().nothing();
    })
  );

  it(
    'reset to default',
    waitForAsync(() => {
      service.resetDefault();
      service.setHeight$.subscribe(current => expect(current).toEqual(36));
      expect().nothing();
    })
  );
});
