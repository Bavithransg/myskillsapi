import { IsString, IsNotEmpty } from 'class-validator';

export class AuthLoginCredentialsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;
}