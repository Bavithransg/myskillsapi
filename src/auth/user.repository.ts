import { Repository, EntityRepository, getMongoRepository, getMongoManager } from 'typeorm';
import { ConflictException, InternalServerErrorException, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthLoginCredentialsDto } from './dto/auth-login-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { name, email, password, nric  } = authCredentialsDto;

    const user = new User();
    user.name = name;
    user.email = email;
    user.nric = nric;
    user.status = true;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      const manager = getMongoManager();
      await manager.save(user);

    } catch (error) {
      console.log('error in student.repository.ts', error);
      const field = error.message.split(": { ");
      const fieldKey = field[1].split(":");
      const valKey = fieldKey[0];
      if(error.code === 11000 && valKey==='nric') { //duplicate nric number
          throw new ConflictException('NRIC already exist.');
      }
      else if(error.code === 11000 && valKey==='email') { //duplicate email
        throw new ConflictException('Email already exist.');
    }
      else {
          throw new HttpException( error.message, HttpStatus.BAD_REQUEST);
      }
    }
  }

  async validateUserPassword(authLoginCredentialsDto: AuthLoginCredentialsDto): Promise<string> {
    const { name, password } = authLoginCredentialsDto;

    const manager = getMongoRepository(User); 
    const nname = { name };
    const user = await manager.findOne({
        where: {
            $or: [
                {email: nname.name},
                {nric: nname.name}
            ]
        }
    });

    if (user && await user.validatePassword(password)) {
      return user.name;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}