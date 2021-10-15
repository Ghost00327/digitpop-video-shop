import { Role } from './role';


export class User {
    _id: number;
    cid: string;
    sid: string;
    name: string;
    email:string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    role: Role;
    welcomed: boolean;
    token?: string;
    icon: any;
}
