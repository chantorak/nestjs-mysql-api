import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { TenantConnectionService } from 'src/tenant/tenant.module';

@Injectable()
export class BooksService {
  constructor(@Inject(TenantConnectionService) private connection) {}

  async create(createBookDto: CreateBookDto) {
    const newBook = new Book();
    newBook.name = createBookDto.name;

    const booksRepository = await this.connection.getRepository(Book);

    return booksRepository.save(newBook);
  }

  async findAll() {
    const booksRepository = await this.connection.getRepository(Book);

    return booksRepository.find();
  }

  async findOne(id: number) {
    const booksRepository = await this.connection.getRepository(Book);

    return booksRepository.findOneBy({ id });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const booksRepository = await this.connection.getRepository(Book);

    return booksRepository.save(updateBookDto);
  }

  async remove(id: number) {
    const booksRepository = await this.connection.getRepository(Book);

    return booksRepository.delete(id);
  }
}
