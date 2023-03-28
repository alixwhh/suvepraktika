import { Component, OnInit } from '@angular/core';
import { CheckOutService } from '../../services/checkout-service';
import { Observable } from 'rxjs';
import { Page } from '../../models/page';
import { Book } from '../../models/book';
import {MatTableDataSource} from "@angular/material/table";
import {PageEvent} from "@angular/material/paginator";
import {Sort, SortDirection} from "@angular/material/sort";

@Component({
  selector: 'app-checkouts-list',
  templateUrl: './checkouts-list.component.html',
})
export class CheckoutsListComponent implements OnInit {

  checkouts$!: Observable<Page<Book>>;
  displayedColumns: string[] = ['borrowerFirstName', 'borrowerLastName', 'borrowedBook.title', 'dueDate'];
  dataSource = new MatTableDataSource<Book>();
  pageSize = 20;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 50];
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  length = 0;
  sortDirection!: SortDirection;
  sort!: string;

  constructor(
    private checkOutService: CheckOutService,
  ) {
  }

  ngOnInit(): void {
    this.checkouts$ = this.checkOutService.getCheckOuts({pageIndex: this.pageIndex, pageSize:this.pageSize, sort:this.sort, direction:this.sortDirection});
    this.checkouts$.subscribe(checkouts => {
      this.dataSource.data = checkouts.content;
      this.length = checkouts.totalElements;
    });
  }

  sortCheckouts(event: Sort) {
    this.sortDirection = event.direction;
    this.sort = event.active;
    this.ngOnInit();
  }

  handlePageChangeEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.ngOnInit();
  }
}
