import { Sequelize } from 'sequelize';

import User from './user';
import TokenModel from './token-model';
import Employee from './employee';
import Equipment from './equipment';
import Element from './element';
import Floor from './floor';
import Building from './building';

const { DB_USER, DB_PWD, DB_HOST, DB_PORT, DB_NAME } = process.env;
export const models = {
    User,
    Building,
    Floor,
    TokenModel,
    Element,
    Employee,
    Equipment,
};

export const sequelize = new Sequelize(`${DB_NAME}`, `${DB_USER}`, `${DB_PWD}`, {
    host: `${DB_HOST}`,
    port: parseInt(`${DB_PORT}`),
    dialect: 'postgres',
    dialectOptions: {
        // multipleStatements: true,
        typeCast: true,
    },
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        timestamps: true,
        underscored: true,
    },
    logging: false,
});
