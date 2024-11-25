import { DataTypes, Model, Sequelize } from 'sequelize';
import conditions from '../config/conditions';
import types from '../config/type';
import Employee from './employee';
import Floor from './floor';

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
    Floor?: Floor;
    floorId?: string;

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
                paranoid: false,
            }
        );

        Equipment.beforeCreate(async (model: Equipment) => {
            const maxNumber = await Equipment.max('inventoryNumber');
            if (!maxNumber || maxNumber === 0) model.set('inventoryNumber', 1);
            else {
                model.set('inventoryNumber', Number(maxNumber) + 1);
            }
        });

        Equipment.beforeBulkCreate(async (instances: Equipment[]) => {
            let maxNumber = await Equipment.max('inventoryNumber');
            if (!maxNumber) maxNumber = 1;
            for (const instance of instances) {
                maxNumber = Number(maxNumber) + 1;
                instance.set('inventoryNumber', maxNumber);
            }
        });
    }
}
