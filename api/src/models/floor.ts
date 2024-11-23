import { DataTypes, Model, Sequelize } from 'sequelize';

export default class Floor extends Model {
    id!: string;
    name!: string;
    content!: string;

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
                paranoid: true,
            }
        );
    }
}
