import { Inject, Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';
import { Book } from 'src/books/entities/book.entity';
import { TenantConnectionService } from 'src/tenant/tenant.module';

@Injectable()
export class AuthorsService {
  constructor(@Inject(TenantConnectionService) private connection) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const authorsRepository = await this.connection.getRepository(Author);

    return authorsRepository.save(createAuthorDto);
  }

  async findAll() {
    const authorsRepository = await this.connection.getRepository(Author);

    return authorsRepository.find();
  }

  async findOne(id: number) {
    const authorsRepository = await this.connection.getRepository(Author);

    return authorsRepository.findOneBy({ id });
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    const updatigAuthor = new Author();
    updatigAuthor.firstName = updateAuthorDto.firstName;
    updatigAuthor.lastName = updateAuthorDto.lastName;
    const authorsRepository = await this.connection.getRepository(Author);

    return authorsRepository.save(updateAuthorDto);
  }

  async remove(id: number) {
    const authorsRepository = await this.connection.getRepository(Author);

    return authorsRepository.delete(id);
  }

  async findAllBooks(authorId: number) {
    const bookRepository = await this.connection.getRepository(Book);

    return bookRepository.find({
      where: {
        id: authorId,
      },
      relations: {
        author: true,
      },
    });
  }
}
