import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';
import { Page } from '../../models/page';
import { Book } from '../../models/book';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search-books-list',
  templateUrl: './search-books-list.component.html',
  styleUrls: ['./search-books-list.component.scss']
})
export class SearchBooksListComponent implements OnInit {

  books$!: Observable<Page<Book>>;
  searchText: string = '';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
  ) {
  }

  ngOnInit(): void {
    this.books$ = this.route.params
      .pipe(map(params => params['name']))
      .pipe(switchMap(name => this.bookService.getBooksByName(name, {})))
  }

}
