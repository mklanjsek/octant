import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import trackByIndex from '../../../../../util/trackBy/trackByIndex';
import trackByIdentity from '../../../../../util/trackBy/trackByIdentity';

@Component({
  selector: 'app-structured-logs',
  templateUrl: './structured.logs.component.html',
  styleUrls: ['./structured.logs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class StructuredLogsComponent {
  logEntries: any;
  columns: any;
  columnsVisible: boolean[];
  identifyRow = trackByIndex;
  identifyColumn = trackByIdentity;
  timeFormat = 'MMM d, y h:mm:ss a z';

  @Input() set logs(logEntries) {
    this.logEntries = logEntries;

    // get header info from first entry
    if (this.logEntries && this.logEntries.length > 0) {
      this.columns = Object.keys(this.logEntries[0]);

      // show only first 4 columns by default
      this.columnsVisible = [...new Array(this.columns.length)].map(
        (_, index) => index >= 4
      );
    }
  }

  get logs() {
    return this.logEntries;
  }

  constructor() {}

  public isColumnHidden(index: number): boolean {
    return this.columnsVisible[index];
  }

  public isColumnTime(index: number): boolean {
    return index === 1; // TODO: find better way to determine the column with the timestamp
  }

  public isColumnLevel(index: number): boolean {
    return index === 0; // TODO: find better way to determine the Level column
  }

  public getLevelIcon(level: string): string {
    const formatted = level.trim().toLowerCase();
    if (formatted.indexOf('error') >= 0) {
      return 'error-standard';
    }
    if (formatted.indexOf('warning') >= 0) {
      return 'warning-standard';
    }
    if (formatted.indexOf('info') >= 0) {
      return 'info-standard';
    } else {
      return 'unknown-status';
    }
  }
}
