import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';
import { Page } from '../../models/page';
import { Book } from '../../models/book';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import {PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Sort, SortDirection} from "@angular/material/sort";

@Component({
  selector: 'app-search-books-list',
  templateUrl: './search-books-list.component.html',
  styleUrls: ['./search-books-list.component.scss']
})
export class SearchBooksListComponent implements OnInit {

  books$!: Observable<Page<Book>>;
  searchText: string = '';
  pageSize = 20;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 50];
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  length = 0;
  sortDirection!: SortDirection;
  sort!: string;
  dataSource = new MatTableDataSource<Book>();
  displayedColumns: string[] = ['title', 'author', 'year'];

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
  ) {
  }

  ngOnInit(): void {
    this.books$ = this.route.params
      .pipe(map(params => params['name']))
      .pipe(switchMap(name => this.bookService.getBooksByName(name, {pageIndex: this.pageIndex, pageSize:this.pageSize, sort:this.sort, direction:this.sortDirection})));
    this.books$.subscribe(books => {
      this.dataSource.data = books.content;
      this.length = books.totalElements
    });
  }

  sortBooks(event: Sort) {
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
