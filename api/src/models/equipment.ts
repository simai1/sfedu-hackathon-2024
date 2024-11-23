import { DataTypes, Model, Sequelize } from 'sequelize';
import conditions from '../config/conditions';
import types from '../config/type';
import Employee from './employee';

export default class Equipment extends Model {
    id!: string;
    name!: string;
    description?: string;
    condition!: number;
    type!: number;
    inventoryNumber!: string;
    createdAt!: Date;
    inspectionDate!: Date;
    cost?: number;
    Element?: Element;
    elementId?: string;
    Employee?: Employee;
    employeeId?: string;

    static initialize(sequelize: Sequelize) {
        Equipment.init(
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
                description: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                type: {
                    type: DataTypes.SMALLINT,
                    allowNull: false,
                    validate: {
                        isIn: [Object.values(types)],
                    },
                    defaultValue: 1,
                },
                condition: {
                    type: DataTypes.SMALLINT,
                    allowNull: false,
                    validate: {
                        isIn: [Object.values(conditions)],
                    },
                    defaultValue: 1,
                },
                inventoryNumber: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                    unique: true,
                },
                inspectionDate: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: new Date(new Date().setMonth(new Date().getMonth() + 1)),
                },
                cost: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
            },
            {
                sequelize,
                schema: 'public',
                modelName: 'Equipment',
                tableName: 'equipments',
                paranoid: true,
            }
        );

        Equipment.beforeCreate(async (model: Equipment) => {
            const maxNumber = await Equipment.max('inventoryNumber');
            if (!maxNumber || maxNumber === 0) model.set('inventoryNumber', 1);
            else {
                // @ts-expect-error maxNumber is always number after checks
                model.set('inventoryNumber', maxNumber + 1);
            }
        });
    }
}
