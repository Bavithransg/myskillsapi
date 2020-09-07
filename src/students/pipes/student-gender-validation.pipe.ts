import { PipeTransform, BadRequestException } from '@nestjs/common';
import { StudentGender } from '../student-gender.enum';

export class StudentGenderValidationPipe implements PipeTransform {
  readonly allowedGenders = [
    StudentGender.MALE,
    StudentGender.FEMALE,
  ];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isGenderValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid gender`);
    }

    return value;
  }

  private isGenderValid(gender: any) {
    const idx = this.allowedGenders.indexOf(gender);
    return idx !== -1;
  }
}
