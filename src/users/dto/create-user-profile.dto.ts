import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserProfileDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  readonly biography: string;
}
