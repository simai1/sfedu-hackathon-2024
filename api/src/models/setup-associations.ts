import { models } from './index';

const { User, TokenModel, Employee, Equipment, Floor, Building, Element } = models;

export default function () {
    // Токен пользователя
    User.hasOne(TokenModel, { foreignKey: 'userId' });
    TokenModel.belongsTo(User, { foreignKey: 'userId' });

    // Объект сотрудника
    Element.hasOne(Employee, { foreignKey: 'elementId' });
    Employee.belongsTo(Element, { foreignKey: 'elementId' });

    // Объект обордуования
    Element.hasOne(Equipment, { foreignKey: 'elementId' });
    Equipment.belongsTo(Element, { foreignKey: 'elementId' });

    // Привязка оборудования к сотруднику
    Employee.hasMany(Equipment, { foreignKey: 'employeeId' });
    Equipment.belongsTo(Employee, { foreignKey: 'employeeId' });

    // Привязка сотрудника к этажу
    Floor.hasMany(Employee, { foreignKey: 'floorId' });
    Employee.belongsTo(Floor, { foreignKey: 'floorId' });

    // Привязка оборудования к этажу
    Floor.hasMany(Equipment, { foreignKey: 'floorId' });
    Equipment.belongsTo(Floor, { foreignKey: 'floorId' });

    // У строения несколько этажей
    Building.hasMany(Floor, { foreignKey: 'buildingId' });
    Floor.belongsTo(Building, { foreignKey: 'buildingId' });
}
