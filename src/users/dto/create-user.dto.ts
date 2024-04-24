import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  readonly userName: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 12)
  readonly password: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly isActive: boolean;
}
