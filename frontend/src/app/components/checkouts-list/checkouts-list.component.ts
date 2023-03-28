import { Component, OnInit } from '@angular/core';
import { CheckOutService } from '../../services/checkout-service';
import { Observable } from 'rxjs';
import { Page } from '../../models/page';
import { Book } from '../../models/book';

@Component({
  selector: 'app-checkouts-list',
  templateUrl: './checkouts-list.component.html',
})
export class CheckoutsListComponent implements OnInit {

  checkouts$!: Observable<Page<Book>>;

  constructor(
    private checkOutService: CheckOutService,
  ) {
  }

  ngOnInit(): void {
    this.checkouts$ = this.checkOutService.getCheckOuts({});
  }
}
