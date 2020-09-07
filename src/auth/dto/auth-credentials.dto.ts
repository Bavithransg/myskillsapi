import { IsString, MinLength, MaxLength, Matches, IsEmail, IsNotEmpty } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Passwords should contain at least one upper case letter, one lower case letter and one number or a special character'
  })
  password: string;

  @IsString()
  @MinLength(5)
  @MaxLength(12)
  nric: string;
}
