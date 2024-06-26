import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserProfile } from './user-profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  password: string;

  @OneToOne(() => UserProfile)
  @JoinColumn()
  userProfile: UserProfile;
}
