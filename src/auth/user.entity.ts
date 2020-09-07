import { BaseEntity, Entity, Column, Unique, OneToMany, CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Student } from '../students/student.entity';

@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @Unique('email', ['email'])
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  @Unique('nric', ['nric'])
  nric: string;

  @Column()
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @OneToMany(type => Student, student => student.userid, { eager: true })
  students: Student[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}