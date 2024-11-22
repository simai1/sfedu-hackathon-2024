import User from '../models/user';

export default class UserDto {
    id!: string;
    login!: string;
    name!: string;
    role!: number;

    constructor(model: User) {
        this.id = model.id;
        this.login = model.login;
        this.name = model.name;
        this.role = model.role;
    }
}
