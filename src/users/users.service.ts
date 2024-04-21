import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll({ isActive }: { isActive: '0' | '1' | undefined }): Promise<User[]> {
    const filter: any = {};

    if (isActive !== undefined) {
      filter.where = { isActive: isActive === '1' };
    }

    return this.usersRepository.find(filter);
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async create(userDto: any): Promise<any> {
    const newUser = new User();
    newUser.firstName = userDto.firstName;
    newUser.lastName = userDto.lastName;
    newUser.isActive = userDto.isActive === '1';

    return this.usersRepository.save(newUser);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async update(id: number, updateDro): Promise<void> {
    const updatingUser = new User();
    updatingUser.firstName = updateDro.firstName;
    updatingUser.lastName = updateDro.lastName;
    updatingUser.isActive = updateDro.isActive === '1';
    updatingUser.id = id;

    await this.usersRepository.save(updatingUser);
  }
}
