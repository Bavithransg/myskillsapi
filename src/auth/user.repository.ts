import { Repository, EntityRepository, getMongoRepository, getMongoManager } from "typeorm";
import { User } from './user.entity';
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { AuthLoginCredentialsDto } from "./dto/auth-login-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { identity } from "rxjs";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(AuthCredentialsDto: AuthCredentialsDto): Promise<void>{
        const { name, password, nric, email } = AuthCredentialsDto;

        const user = new User();
        user.name = name;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        user.nric = nric;
        user.email = email;
        try {
            const manager = getMongoManager();
            await manager.save(user);
        } catch (error){
            console.log('insert error',error);
            //const key = error.sqlMessage.split("'"); 
            if(error.code === 'ER_DUP_ENTRY') { //duplicate nric number
                throw new ConflictException('Email already exist.');
            }
            else if(error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('NRIC already exist.');
            }
            else {
                throw new InternalServerErrorException();
            }
        }
        
    }

    async validateUserPassword(authLoginCredentialsDto: AuthLoginCredentialsDto): Promise<string>{
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
        console.log(user);
        
       if(user && await user.validatePassword(password)) {
           return User.name;
       }
       else{
           return null;
       }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password,salt);
    }
}