import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from 'dist/auth/user.repository';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepository;
    constructor(userRepository: UserRepository);
    validate(payload: JwtPayload): Promise<void>;
}
export {};
