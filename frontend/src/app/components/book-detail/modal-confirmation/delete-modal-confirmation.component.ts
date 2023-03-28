import {Component} from "@angular/core";
import {BookService} from "../../../services/book.service";

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './delete-modal-confirmation.component.html',
})
export class DeleteModalConfirmation {
  id: any;

  constructor(
    private bookService: BookService,
  ) {
  }

  delete() {
    this.bookService.deleteBook(this.id).subscribe();
  }
}
