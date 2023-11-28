// user.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true})
  contact_number: string;

  @Column()
  email: string;

  // Other user properties like name, age, etc.
}
