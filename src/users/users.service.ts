import * as bcrypt from 'bcrypt';
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/user-profile.entity';
import { ConfigService } from '@nestjs/config';
import { TenantConnectionService } from 'src/tenant/tenant.module';

@Injectable()
export class UsersService {
  constructor(
    @Inject(TenantConnectionService) private connection,
    private configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userProfile = new UserProfile();

    const newUser = new User();
    newUser.userName = createUserDto.userName;
    newUser.isActive = createUserDto.isActive;

    newUser.userProfile = userProfile;

    const userProfilesRepository =
      await this.connection.getRepository(UserProfile);
    userProfilesRepository.save(userProfile);

    newUser.password = await bcrypt.hash(
      createUserDto.password,
      +this.configService.get('SALT_ROUNDS'),
    );

    const usersRepository = await this.connection.getRepository(User);
    await usersRepository.save(newUser);
  }

  async findAll() {
    const usersRepository = await this.connection.getRepository(User);

    return usersRepository.find();
  }

  async findOne(filter: { id?: number; userName?: string }) {
    const usersRepository = await this.connection.getRepository(User);

    return usersRepository.findOneBy(filter);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updateUser = new User();
    updateUser.userName = updateUserDto.userName;
    updateUser.isActive = updateUserDto.isActive;

    updateUser.id = id;

    const usersRepository = await this.connection.getRepository(User);

    return usersRepository.save(updateUser);
  }

  async remove(id: number) {
    const usersRepository = await this.connection.getRepository(User);

    return usersRepository.delete(id);
  }

  async createUserProfile(createUserProfileDto: CreateUserProfileDto) {
    const newUserProfile = new UserProfile();
    newUserProfile.biography = createUserProfileDto.biography;
    const usersRepository = await this.connection.getRepository(User);

    return usersRepository.save(newUserProfile);
  }

  async findAllUserProfile() {
    const userProfilesRepository =
      await this.connection.getRepository(UserProfile);

    return userProfilesRepository.find();
  }

  async findOneUserProfile(id: number) {
    const userProfilesRepository =
      await this.connection.getRepository(UserProfile);

    return userProfilesRepository.findOneBy({ id });
  }

  async updateUserProfile(
    id: number,
    updateUserProfileDto: UpdateUserProfileDto,
  ) {
    const updateUserProfile = new UserProfile();
    updateUserProfile.biography = updateUserProfileDto.biography;

    updateUserProfile.id = id;

    const userProfilesRepository =
      await this.connection.getRepository(UserProfile);

    return userProfilesRepository.save(updateUserProfile);
  }

  async removeUserProfile(id: number) {
    const userProfilesRepository =
      await this.connection.getRepository(UserProfile);

    return userProfilesRepository.delete(id);
  }
}
