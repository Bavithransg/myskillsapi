import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, ObjectIdColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { IsString } from "class-validator";

@Entity()
export class User extends BaseEntity {
    //@PrimaryGeneratedColumn()
    @ObjectIdColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    @Unique('email', ['email'])
    email: string;

    @Column()
    password: string;

    @Column()
    @Unique('nric', ['nric'])
    nric: string;

    @Column()
    salt: string;

    @CreateDateColumn()
    createdAt: Date;

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}