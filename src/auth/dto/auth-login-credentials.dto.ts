import { IsString } from "class-validator";

export class AuthLoginCredentialsDto {
    @IsString()
    name: string;
    
    @IsString()
    password: string;
}