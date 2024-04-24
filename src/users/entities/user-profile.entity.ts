import { Book } from 'src/books/entities/book.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  biography: string;

  @ManyToMany(() => Book)
  @JoinTable()
  favouriteBooks: Book[];
}
