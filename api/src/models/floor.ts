import { DataTypes, Model, Sequelize } from 'sequelize';
import Building from './building';
import Employee from './employee';

export default class Floor extends Model {
    id!: string;
    name!: string;
    Building!: Building;
    buildingId!: string;
    Employees!: Employee[];

    static initialize(sequelize: Sequelize) {
        Floor.init(
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
            },
            {
                sequelize,
                schema: 'public',
                modelName: 'Floor',
                tableName: 'floors',
                paranoid: false,
            }
        );
    }
}
