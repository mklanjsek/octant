import { FormatPathPipe } from './formatpath.pipe';
import { TestBed } from '@angular/core/testing';
import { SharedModule } from '../../shared.module';

describe('FormatpathPipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
    });
  });
  it('create an instance', () => {
    const pipe = new FormatPathPipe();
    expect(pipe).toBeTruthy();
  });
});
