// user.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true, length: 11 })
  contact_number: string;

  @Column()
  email: string;

  // Other user properties like name, age, etc.
}
