package com.cgi.library.repository;

import com.cgi.library.entity.Book;
import com.cgi.library.model.BookStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface BookRepository extends JpaRepository<Book, UUID> {
    Page<Book> findByTitleContainingIgnoreCase(String bookName, Pageable pageable);
    Page<Book> findAllByTitleContainingIgnoreCaseAndStatus(String bookName, BookStatus bookStatus, Pageable pageable);
    Page<Book> findAllByStatus(BookStatus bookStatus, Pageable pageable);
}
