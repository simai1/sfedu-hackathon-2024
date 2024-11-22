import { models } from './index';

const { User, TokenModel, Coords, Employee, Equipment, Office, Building } = models;

export default function () {
    User.hasOne(TokenModel, { foreignKey: 'userId' });
    TokenModel.belongsTo(User, { foreignKey: 'userId' });

    Coords.hasMany(Employee, { foreignKey: 'coordsId' });
    Employee.belongsTo(Coords, { foreignKey: 'coordsId' });

    Coords.hasMany(Equipment, { foreignKey: 'coordsId' });
    Equipment.belongsTo(Coords, { foreignKey: 'coordsId' });

    Employee.hasMany(Equipment, { foreignKey: 'employeeId' });
    Equipment.belongsTo(Employee, { foreignKey: 'employeeId' });

    Office.hasMany(Employee, { foreignKey: 'officeId' });
    Employee.belongsTo(Office, { foreignKey: 'officeId' });

    Office.hasMany(Equipment, { foreignKey: 'officeId' });
    Equipment.belongsTo(Office, { foreignKey: 'officeId' });

    Building.hasMany(Office, { foreignKey: 'buildingId' });
    Office.belongsTo(Building, { foreignKey: 'buildingId' });
}
