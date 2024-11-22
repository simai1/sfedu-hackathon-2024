import { DataTypes, Model, Sequelize } from 'sequelize';

export default class Building extends Model {
    id!: string;
    name!: string;

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
            },
            {
                sequelize,
                schema: 'public',
                modelName: 'Building',
                tableName: 'buildings',
                paranoid: true,
            }
        );
    }
}