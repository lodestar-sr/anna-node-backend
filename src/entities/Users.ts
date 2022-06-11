import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber, IsString, IsEmail } from 'class-validator';

import { UserRole } from '../shared/constants/global.constants';

@Entity('users')
export class Users extends BaseEntity {
  @IsNumber()
  @PrimaryGeneratedColumn()
  id: number;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @IsString()
  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STANDARD,
  })
  role: UserRole;
}
