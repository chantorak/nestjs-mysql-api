import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';
import { Book } from 'src/books/entities/book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  create(createAuthorDto: CreateAuthorDto) {
    return this.authorsRepository.save(createAuthorDto);
  }

  findAll() {
    return this.authorsRepository.find();
  }

  findOne(id: number) {
    return this.authorsRepository.findOneBy({ id });
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    const updatigAuthor = new Author();
    updatigAuthor.firstName = updateAuthorDto.firstName;
    updatigAuthor.lastName = updateAuthorDto.lastName;

    return this.authorsRepository.save(updateAuthorDto);
  }

  remove(id: number) {
    return this.authorsRepository.delete(id);
  }

  findAllBooks(authorId: number) {
    return this.booksRepository.find({
      where: {
        id: authorId,
      },
      relations: {
        author: true,
      },
    });
  }
}
