import { DataTypes, Model, Sequelize } from 'sequelize';
import positions from '../config/positions';

export default class Employee extends Model {
    id!: string;
    name!: string;
    isWorking!: boolean;
    position!: number;

    static initialize(sequelize: Sequelize) {
        Employee.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                },
                position: {
                    type: DataTypes.SMALLINT,
                    allowNull: false,
                    validate: {
                        isIn: [Object.values(positions)],
                    },
                    defaultValue: 1,
                },
            },
            {
                sequelize,
                schema: 'public',
                modelName: 'Employee',
                tableName: 'employees',
                paranoid: true,
            }
        );
    }
}