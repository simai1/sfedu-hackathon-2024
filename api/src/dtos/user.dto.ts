import User from '../models/user';
import { rolesRuLocale } from '../config/roles';

export default class UserDto {
    id!: string;
    login!: string;
    name!: string;
    role!: number;
    roleHuman!: string;

    constructor(model: User) {
        this.id = model.id;
        this.login = model.login;
        this.name = model.name;
        this.role = model.role;
        // @ts-expect-error any
        this.roleHuman = rolesRuLocale[model.role];
    }
}
