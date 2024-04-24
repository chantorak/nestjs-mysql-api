import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserProfile } from './entities/user-profile.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserProfile)
    private userProfilesRepository: Repository<UserProfile>,
    private configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = new User();
    newUser.userName = createUserDto.userName;
    newUser.isActive = createUserDto.isActive;

    newUser.password = await bcrypt.hash(
      createUserDto.password,
      +this.configService.get('SALT_ROUNDS'),
    );

    await this.usersRepository.save(newUser);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(filter: { id?: number; userName?: string }) {
    return this.usersRepository.findOneBy(filter);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const updateUser = new User();
    updateUser.userName = updateUserDto.userName;
    updateUser.isActive = updateUserDto.isActive;

    updateUser.id = id;

    return this.usersRepository.save(updateUser);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }

  createUserProfile(createUserProfileDto: CreateUserProfileDto) {
    const newUserProfile = new UserProfile();
    newUserProfile.biography = createUserProfileDto.biography;

    return this.usersRepository.save(newUserProfile);
  }

  findAllUserProfile() {
    return this.userProfilesRepository.find();
  }

  findOneUserProfile(id: number) {
    return this.userProfilesRepository.findOneBy({ id });
  }

  updateUserProfile(id: number, updateUserProfileDto: UpdateUserProfileDto) {
    const updateUserProfile = new UserProfile();
    updateUserProfile.biography = updateUserProfileDto.biography;

    updateUserProfile.id = id;

    return this.userProfilesRepository.save(updateUserProfile);
  }

  removeUserProfile(id: number) {
    return this.userProfilesRepository.delete(id);
  }
}
