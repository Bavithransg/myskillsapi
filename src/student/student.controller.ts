import { Controller, Post, Body, ValidationPipe, UseGuards } from '@nestjs/common';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentService } from './student.service';
import { StudentGender } from './student-gender.enum';
import { AuthGuard } from '@nestjs/passport';

@Controller('student')
@UseGuards(AuthGuard())
export class StudentController {
    constructor(
        private studentservice: StudentService
    ) {}

    @Post('/create')
    create(@Body(ValidationPipe) createStudentDto: CreateStudentDto): Promise<void>{
        return this.studentservice.create(createStudentDto);
    }
}
