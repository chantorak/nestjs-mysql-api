import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ database: 'masterDB' })
export class Tenant {
  @PrimaryColumn({ unique: true })
  organisation: string;

  @Column()
  dbName: string;
}
