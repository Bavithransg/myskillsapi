import { PipeTransform, BadRequestException } from '@nestjs/common';
import { StudentGender } from '../student-gender.enum';

export class StudentGenderValidationPipe implements PipeTransform {
  readonly allowedGender = [
    StudentGender.MALE,
    StudentGender.FEMALE
  ];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isGenderValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid Gender`);
    }

    return value;
  }

  private isGenderValid(gender: any) {
    const idx = this.allowedGender.indexOf(gender);
    return idx !== -1;
  }
}
