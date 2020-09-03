import { Injectable } from '@nestjs/common';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentRepository } from './student.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(StudentRepository)
        private studentRepository: StudentRepository,
    ) {}
    
    async create(createStudentDto: CreateStudentDto): Promise<void> {
        return this.studentRepository.createstudent(createStudentDto);
    }
}
