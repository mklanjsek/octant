// Copyright (c) 2020 the Octant contributors. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
//

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructuredLogsComponent } from './structured.logs.component';

describe('StructuredLogsComponent', () => {
  let component: StructuredLogsComponent;
  let fixture: ComponentFixture<StructuredLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StructuredLogsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructuredLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
