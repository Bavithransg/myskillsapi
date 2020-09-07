import { BaseEntity, Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn, Unique, ManyToOne, ObjectID } from 'typeorm';
import { StudentGender } from './student-gender.enum';
import { User } from '../auth/user.entity';

@Entity()
export class Student extends BaseEntity {
  @ObjectIdColumn()
    id: ObjectID;

    @ManyToOne(type => User, user => user.students, { eager: false })
    userid: number;

    @Column()
    name: string;

    @Column()
    gender: StudentGender;

    @Column()
    @Unique('nric', ['nric'])
    nric: string;

    @Column()
    address: string;

    @Column('date')
    dob: string;

    @Column()
    state: string;

    @Column()
    levelOfEducation: string;

    @Column()
    health: string;

    @Column('date')
    dateOfAdmission1: string;

    @Column('date')
    dateOfAdmission2: string;

    @Column('date')
    dateOfGraduation1: string;

    @Column('date')
    dateOfGraduation2: string;

    @Column()
    fathersName: string;

    @Column()
    fNric: string;

    @Column()
    fOccupation: string;

    @Column()
    fSalary: number;

    @Column()
    fSpecialRemarks: string;

    @Column()
    mothersName: string;

    @Column()
    mNric: string;

    @Column()
    mOccupation: string;

    @Column()
    mSalary: number;

    @Column()
    mSpecialRemarks: string;

    @Column()
    status: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    modifiedAt: Date;
}
