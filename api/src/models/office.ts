import { DataTypes, Model, Sequelize } from 'sequelize';

export default class Office extends Model {
    id!: string;
    name!: string;
    content!: string;

    static initialize(sequelize: Sequelize) {
        Office.init(
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
                content: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                schema: 'public',
                modelName: 'Office',
                tableName: 'offices',
                paranoid: true,
            }
        );
    }
}
