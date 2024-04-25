import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':authorId')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.authorsService.findOne(+id);
  }

  @Patch(':authorId')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return this.authorsService.update(+id, updateAuthorDto);
  }

  @Delete(':authorId')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.authorsService.remove(+id);
  }

  @Get(':authorId/books')
  findAllBooks(@Param('authorId') authorId: string) {
    return this.authorsService.findAllBooks(+authorId);
  }
}
