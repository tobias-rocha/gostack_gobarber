import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';

import User from './User';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  UserId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'UserId' })
  user: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Appointment;
