import { StudentGender } from '../student-gender.enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetStudentsFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
