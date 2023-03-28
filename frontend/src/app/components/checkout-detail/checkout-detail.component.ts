import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import {Checkout} from "../../models/checkout";
import {CheckOutService} from "../../services/checkout-service";

@Component({
  selector: 'app-checkout-detail',
  templateUrl: './checkout-detail.component.html'
})
export class CheckoutDetailComponent implements OnInit {
  checkout$!: Observable<Checkout>;


  constructor(
    private route: ActivatedRoute,
    private checkOutService: CheckOutService,
  ) {
  }

  ngOnInit(): void {
    this.checkout$ = this.route.params
      .pipe(map(params => params['id']))
      .pipe(switchMap(id => this.checkOutService.getCheckOut(id)))
  }

}
