import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAuthorDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  readonly lastName: string;
}
