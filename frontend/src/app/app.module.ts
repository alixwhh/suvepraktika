import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { BooksListComponent } from './components/books-list/books-list.component';
import { CheckoutsListComponent } from './components/checkouts-list/checkouts-list.component';
import { SearchBooksListComponent } from './components/search-books-list/search-books-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { DeleteModalConfirmation } from './components/book-detail/delete-modal-confirmation/delete-modal-confirmation.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from "@angular/forms";
import {CheckoutDetailComponent} from "./components/checkout-detail/checkout-detail.component";

@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    BookDetailComponent,
    SearchBooksListComponent,
    DeleteModalConfirmation,
    CheckoutsListComponent,
    CheckoutDetailComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
