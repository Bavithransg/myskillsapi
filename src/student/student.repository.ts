import { EntityRepository, Repository, getMongoManager } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentGender } from './student-gender.enum';
import { Student } from './student.entity';
import { ConflictException, InternalServerErrorException, HttpException, HttpStatus } from '@nestjs/common';

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {
    async createstudent(createStudentDto: CreateStudentDto): Promise<void> {
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
        student.dateOfAdmission2 = dateOfAdmission1;
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
        try {
            const manager = getMongoManager();
            await manager.save(student);
        }
        catch(error) {
            console.log('error in student.repository.ts', error);
            const field = error.message.split(": { ");
            const fieldKey = field[1].split(":");
            const valKey = fieldKey[0];
            console.log('error input field', valKey);
            if(error.code === 11000 && valKey=='nric') { //duplicate nric number
                throw new ConflictException('Student NRIC already exist.');
            }
            else {
                throw new HttpException( error.message, HttpStatus.BAD_REQUEST);
            }
        }
    }
}    