import { Component, OnInit } from '@angular/core';
import { CheckOutService } from '../../services/checkout-service';
import { Observable } from 'rxjs';
import { Page } from '../../models/page';
import { Book } from '../../models/book';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-checkouts-list',
  templateUrl: './checkouts-list.component.html',
})
export class CheckoutsListComponent implements OnInit {

  checkouts$!: Observable<Page<Book>>;
  displayedColumns: string[] = ['first-name', 'last-name', 'book-title', 'due-date'];
  dataSource = new MatTableDataSource<Book>();

  constructor(
    private checkOutService: CheckOutService,
  ) {
  }

  ngOnInit(): void {
    this.checkouts$ = this.checkOutService.getCheckOuts({});
    this.checkouts$.subscribe(checkouts => {
      this.dataSource.data = checkouts.content;
    });
  }
}
