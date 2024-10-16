import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id_user: string;

  @Column({ length: 256 })
  firstname: string;

  @Column({ length: 256 })
  lastname: string;

  @Column({ length: 256 })
  email: string;

  @Column({ length: 256 })
  password: string;

  @Column({ default: true })
  isActive: boolean;
}