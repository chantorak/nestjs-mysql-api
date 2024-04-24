import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  create(createBookDto: CreateBookDto) {
    const newBook = new Book();
    newBook.name = createBookDto.name;

    return this.booksRepository.save(newBook);
  }

  findAll() {
    return this.booksRepository.find();
  }

  findOne(id: number) {
    return this.booksRepository.findBy({ id });
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.booksRepository.save(updateBookDto);
  }

  remove(id: number) {
    return this.booksRepository.delete(id);
  }
}
