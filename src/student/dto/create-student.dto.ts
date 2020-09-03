import { IsNotEmpty, IsString, MinLength, MaxLength, IsIn } from 'class-validator';
import { StudentGender } from '../student-gender.enum';

export class CreateStudentDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    name: string;

    @IsIn([StudentGender.MALE, StudentGender.FEMALE])
    gender: StudentGender;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(12)
    nric: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    dob: string;

    @IsNotEmpty()
    state: string;

    @IsNotEmpty()
    levelOfEducation: string;

    @IsNotEmpty()
    health: string;

    @IsNotEmpty()
    dateOfAdmission1: string;

    @IsNotEmpty()
    dateOfAdmission2: string;

    @IsNotEmpty()
    dateOfGraduation1: string;

    @IsNotEmpty()
    dateOfGraduation2: string;

    @IsNotEmpty()
    fathersName: string;

    @IsNotEmpty()
    fNric: string;

    @IsNotEmpty()
    fOccupation: string;

    @IsNotEmpty()
    fSalary: number;

    @IsNotEmpty()
    fSpecialRemarks: string;

    @IsNotEmpty()
    mothersName: string;

    @IsNotEmpty()
    mNric: string;

    @IsNotEmpty()
    mOccupation: string;

    @IsNotEmpty()
    mSalary: number;

    @IsNotEmpty()
    mSpecialRemarks: string;
}