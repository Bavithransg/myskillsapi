import { Student } from './student.entity';
import { EntityRepository, Repository, getMongoManager, getMongoRepository, ObjectID, getManager } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentGender } from './student-gender.enum';
import { GetStudentsFilterDto } from './dto/get-students-filter.dto';
import { User } from '../auth/user.entity';
import { ConflictException, HttpException, HttpStatus } from '@nestjs/common';

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {
  async getStudents(
    filterDto: GetStudentsFilterDto,
    user: User,
  ): Promise<Student[]> {

    const { search } = filterDto;

    const manager = getMongoRepository(Student); 
    const nname = { search };
    const student = await manager.find();
    return student;
  }

  async createStudent(
    createStudentDto: CreateStudentDto,
    user: User,
  ): Promise<Student> {
    const { name, gender, nric, address, dob, state, levelOfEducation, health, dateOfAdmission1, dateOfAdmission2, dateOfGraduation1, dateOfGraduation2, fathersName, fNric, fOccupation, fSalary, fSpecialRemarks, mothersName, mNric, mOccupation, mSalary, mSpecialRemarks } = createStudentDto;

    const student = new Student();
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
    student.status = true;
    student.mSpecialRemarks = mSpecialRemarks;
    student.userid = user.id;

    try {
      const manager = getMongoManager();
      await manager.save(student);
    }
    catch(error) {
        console.log('error in student.repository.ts', error);
        const field = error.message.split(": { ");
        const fieldKey = field[1].split(":");
        const valKey = fieldKey[0];
        if(error.code === 11000 && valKey=='nric') { //duplicate nric number
            throw new ConflictException('Student NRIC already exist.');
        }
        else {
            throw new HttpException( error.message, HttpStatus.BAD_REQUEST);
        }
    }
    await student.save();

    delete student.userid;
    return student;
  }
  async getStudent(
    id: ObjectID,
    user: User,
  ): Promise<Student> {
    const manager = getMongoRepository(Student);
    const student = await manager.findOne({id,
        where: {
            userid: {$eq: user.id}
        }
    });
    return student;
  }
}
