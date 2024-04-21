import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch(':id') // PATCH /users
  update(@Param('id') id: string, @Body() userUpdate: any) {
    console.log('Update received');

    return this.usersService.update(+id, userUpdate);
  }

  @Get() // GET /users or /users?role=value
  findAll(@Query('isActive') isActive: '0' | '1') {
    return this.usersService.findAll({ isActive });
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post() // POST /users
  create(@Body() user: any) {
    return this.usersService.create(user);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
