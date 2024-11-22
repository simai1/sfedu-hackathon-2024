import { DataTypes, Model, Sequelize } from 'sequelize';

export default class Coords extends Model {
    id!: string;
    x!: number;
    y!: number;

    static initialize(sequelize: Sequelize) {
        Coords.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                x: {
                    type: DataTypes.DECIMAL(5, 2).UNSIGNED.ZEROFILL,
                    allowNull: false,
                },
                y: {
                    type: DataTypes.DECIMAL(5, 2).UNSIGNED.ZEROFILL,
                    allowNull: false,
                },
            },
            {
                sequelize,
                schema: 'public',
                modelName: 'Coords',
                tableName: 'coords',
                paranoid: true,
            }
        );
    }
}
