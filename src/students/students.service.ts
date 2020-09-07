import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { GetStudentsFilterDto } from './dto/get-students-filter.dto';
import { StudentRepository } from './student.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { StudentGender } from './student-gender.enum';
import { User } from '../auth/user.entity';
import { ObjectID } from 'typeorm/driver/mongodb/typings';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentRepository)
    private studentRepository: StudentRepository,
  ) {}

  async getStudents(
    filterDto: GetStudentsFilterDto,
    user: User,
  ): Promise<Student[]> {
    return this.studentRepository.getStudents(filterDto, user);
  }

  async getStudentById(
    id: ObjectID,
    user: User,
  ): Promise<Student> {
    const found = await this.studentRepository.getStudent(id, user );
    if (!found) {
      throw new NotFoundException(`Student with ID "${id}" not found`);
    }

    return found;
  }

  async createStudent(
    createStudentDto: CreateStudentDto,
    user: User,
  ): Promise<Student> {
    return this.studentRepository.createStudent(createStudentDto, user);
  }

  async deleteStudent(
    id: ObjectID,
    user: User,
  ): Promise<void> {
    const student = await this.getStudentById(id, user);
    student.status = false;
    await student.save();

    
  }

  async updateStudent(
    id: ObjectID,
    createStudentDto: CreateStudentDto,
    user: User,
  ): Promise<Student> {
    const { name, gender, nric, address, dob, state, levelOfEducation, health, dateOfAdmission1, dateOfAdmission2, dateOfGraduation1, dateOfGraduation2, fathersName, fNric, fOccupation, fSalary, fSpecialRemarks, mothersName, mNric, mOccupation, mSalary, mSpecialRemarks } = createStudentDto;
    
    const student = await this.getStudentById(id, user);
    
    student.name = name;
    student.gender = gender;
    student.nric = nric;
    student.address = address;
    student.dob = dob;
    student.state = state;
    student.levelOfEducation = levelOfEducation;
    student.health = health;
    student.dateOfAdmission1 = dateOfAdmission1;
    student.dateOfAdmission2 = dateOfAdmission2;
    student.dateOfGraduation1 = dateOfGraduation1;
    student.dateOfGraduation2 = dateOfGraduation2;
    student.fathersName = fathersName;
    student.fNric = fNric;
    student.fOccupation = fOccupation;
    student.fSalary = fSalary;
    student.fSpecialRemarks = fSpecialRemarks;
    student.mothersName = mothersName;
    student.mNric = mNric;
    student.mOccupation = mOccupation;
    student.mSalary = mSalary;
    student.mSpecialRemarks = mSpecialRemarks;
    await student.save();

    return student;
  }
}
