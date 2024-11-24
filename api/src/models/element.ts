import { DataTypes, Model, Sequelize } from 'sequelize';

export default class  Element extends Model {
    id!: string;
    data!: object;

    static initialize(sequelize: Sequelize) {
        Element.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                data: {
                    type: DataTypes.JSONB,
                    allowNull: false,
                },
            },
            {
                sequelize,
                schema: 'public',
                modelName: 'Element',
                tableName: 'elements',
                paranoid: true,
            }
        );
    }
}
