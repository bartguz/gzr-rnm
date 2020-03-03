import { Info } from './../../../models/info';
import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent {
  @Input() pageInfo: Info;
  @Input() page: number;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  // api accepts fractions. surprising but convenient
  get hasPreviousPage(): boolean {
    return this.page > 1;
  }

  get hasNextPage(): boolean {
    return !(this.pageInfo && this.page * 20 >= this.pageInfo.count);
  }

  get currentInfo(): string {
    if (!this.pageInfo) {
      return '';
    }
    const lowerBounds = (this.page - 1) * 20;
    let upperBounds = this.page * 20;
    upperBounds = upperBounds > this.pageInfo.count ? this.pageInfo.count : upperBounds;
    return `${lowerBounds} - ${upperBounds} of ${this.pageInfo.count} records`;
  }
  constructor() { }

  updatePage(page: number) {
    this.pageChange.emit(page);
  }


}
