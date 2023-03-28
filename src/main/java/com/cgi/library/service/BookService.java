package com.cgi.library.service;

import com.cgi.library.entity.Book;
import com.cgi.library.model.BookDTO;
import com.cgi.library.model.BookStatus;
import com.cgi.library.repository.BookRepository;
import com.cgi.library.util.ModelMapperFactory;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public Page<BookDTO> getBooks(Pageable pageable, String statusString) {
        ModelMapper modelMapper = ModelMapperFactory.getMapper();
        if (statusString != null) {
            BookStatus status = getEnumValueFromStatusString(statusString);
            return bookRepository.findAllByStatus(status, pageable).map(book -> modelMapper.map(book, BookDTO.class));
        }
        return bookRepository.findAll(pageable).map(book -> modelMapper.map(book, BookDTO.class));
    }

    public BookStatus getEnumValueFromStatusString(String statusString) {
        switch (statusString) {
            case "AVAILABLE":
                return BookStatus.AVAILABLE;
            case "BORROWED":
                return BookStatus.BORROWED;
            case "RETURNED":
                return BookStatus.RETURNED;
            case "DAMAGED":
                return BookStatus.DAMAGED;
            default:
                return BookStatus.PROCESSING;
        }
    }

    public BookDTO getBook(UUID bookId) {
        Book book = bookRepository.getOne(bookId);
        return ModelMapperFactory.getMapper().map(book, BookDTO.class);
    }

    public UUID saveBook(BookDTO bookDTO) {
        ModelMapper modelMapper = ModelMapperFactory.getMapper();
        return bookRepository.save(modelMapper.map(bookDTO, Book.class)).getId();
    }

    public void deleteBook(UUID bookId) {
        bookRepository.deleteById(bookId);
    }

    public Page<BookDTO> getBooksByName(String bookName, Pageable pageable) {
        ModelMapper modelMapper = ModelMapperFactory.getMapper();
        return bookRepository.findByTitleContainingIgnoreCase(bookName, pageable).map(book -> modelMapper.map(book, BookDTO.class));
    }
}
