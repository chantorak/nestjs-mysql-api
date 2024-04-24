import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly authorId?: number;
}
