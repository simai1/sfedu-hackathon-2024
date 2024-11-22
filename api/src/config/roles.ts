import { mapObjectKeys } from '../utils/mapper';

const roles = {
    USER: 1,
    ADMIN: 2,
};

export const rolesRuLocale = {
    1: 'Пользователь',
    2: 'Администратор',
};

export default roles;

export const mapRoles = mapObjectKeys(roles);
