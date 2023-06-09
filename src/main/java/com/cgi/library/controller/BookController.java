package com.cgi.library.controller;

import com.cgi.library.model.BookDTO;
import com.cgi.library.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/book")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping(value = "getBooks")
    public ResponseEntity<Page<BookDTO>> getBooks(Pageable pageable, @RequestParam(value = "status", required = false) String status) {
        return ResponseEntity.ok(bookService.getBooks(pageable, status));
    }

    @GetMapping(value = "getBook")
    public ResponseEntity<BookDTO> getBook(@RequestParam(value = "bookId") UUID bookId) {
        return ResponseEntity.ok(bookService.getBook(bookId));
    }

    @PostMapping(value = "saveBook")
    public ResponseEntity<String> saveBook(@RequestBody BookDTO book) {
        return ResponseEntity.ok(String.valueOf(bookService.saveBook(book)));
    }

    @DeleteMapping(value = "deleteBook")
    public ResponseEntity<String> deleteBook(@RequestParam(value = "bookId") UUID bookId) {
        bookService.deleteBook(bookId);
        return ResponseEntity.ok("");
    }

    @GetMapping(value = "getBooksByName")
    public ResponseEntity<Page<BookDTO>> getBooksByName(@RequestParam(value = "bookName") String bookName, @RequestParam(value = "status", required = false) String status, Pageable pageable) {
        return ResponseEntity.ok(bookService.getBooksByName(bookName, status, pageable));
    }
}
