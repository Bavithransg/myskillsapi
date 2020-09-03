import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthLoginCredentialsDto } from './dto/auth-login-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.signUp(authCredentialsDto);
    }

    async signIn(authLoginCredentialsDto:AuthLoginCredentialsDto): Promise<{ accessToken: string }> {
        const name = await this.userRepository.validateUserPassword(authLoginCredentialsDto);

        if(!name) {
            throw new UnauthorizedException('Invalid credentials');
        }
        
        const payload: JwtPayload = { name };
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
    }
}
