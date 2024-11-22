import { DataTypes, Model, Sequelize } from 'sequelize';
import conditions from '../config/conditions';

export default class Equipment extends Model {
    id!: string;
    name!: string;
    description!: string;
    content!: string;
    lifetime!: number;
    condition!: number;
    layer!: number;

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
                    allowNull: false,
                },
                condition: {
                    type: DataTypes.SMALLINT,
                    allowNull: false,
                    validate: {
                        isIn: [Object.values(conditions)],
                    },
                    defaultValue: 1,
                },
                content: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                lifetime: {
                    type: DataTypes.SMALLINT,
                    allowNull: false,
                    defaultValue: 5,
                },
                layer: {
                    type: DataTypes.SMALLINT,
                    allowNull: false,
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
    }
}
