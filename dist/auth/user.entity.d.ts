import { BaseEntity } from "typeorm";
export declare class User extends BaseEntity {
    id: number;
    name: string;
    password: string;
    nric: string;
    email: string;
}
