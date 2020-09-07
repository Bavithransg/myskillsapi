import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentGenderValidationPipe } from './pipes/student-gender-validation.pipe';
import { GetStudentsFilterDto } from './dto/get-students-filter.dto';
import { Student } from './student.entity';
import { StudentGender } from './student-gender.enum';
import { User } from '../auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { ObjectID } from 'typeorm';

@Controller('students')
@UseGuards(AuthGuard())
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Get('all')
  getStudents(
    @Query(ValidationPipe) filterDto: GetStudentsFilterDto,
    @GetUser() user: User,
  ): Promise<Student[]> {
    return this.studentsService.getStudents(filterDto, user);
  }

  @Get('/get/:id')
  getStudentById(
    @Param('id') id: ObjectID,
    @GetUser() user: User,
  ): Promise<Student> {
    return this.studentsService.getStudentById(id, user);
  }

  @Post('add')
  @UsePipes(ValidationPipe)
  createStudent(
    @Body() createStudentDto: CreateStudentDto,
    @GetUser() user: User,
  ): Promise<Student> {
    return this.studentsService.createStudent(createStudentDto, user);
  }

  @Delete('/delete/:id')
  deleteStudent(
    @Param('id') id: ObjectID,
    @GetUser() user: User,
  ): Promise<void> {
    return this.studentsService.deleteStudent(id, user);
  }

  @Patch('/update/:id')
  updateStudent(
    @Param('id') id: ObjectID,
    @Body() createStudentDto: CreateStudentDto,
    @GetUser() user: User,
  ): Promise<Student> {
    return this.studentsService.updateStudent(id, createStudentDto, user);
  }
}
