import { DataTypes, Model, Sequelize } from 'sequelize';
import Floor from './floor';

export default class Building extends Model {
    id!: string;
    name!: string;
    addressCity!: string;
    addressOther!: string;
    Floors?: Floor[];

    static initialize(sequelize: Sequelize) {
        Building.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
                },
                addressCity: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                addressOther: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                schema: 'public',
                modelName: 'Building',
                tableName: 'buildings',
                paranoid: false,
            }
        );
    }
}
