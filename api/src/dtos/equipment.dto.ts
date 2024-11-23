import Equipment from '../models/equipment';
import { conditionsRuLocale } from '../config/conditions';
import { mapTypes, typesRuLocale } from '../config/type';
import ElementDto from './element.dto';
import EmployeeDto from './employee.dto';

export default class EquipmentDto {
    id!: string;
    name!: string;
    description?: string;
    condition!: number;
    conditionHuman!: string;
    type!: number;
    typeHuman!: string;
    inventoryNumber!: string;
    createdAt!: Date;
    inspectionDate!: Date;
    cost?: number;
    element?: ElementDto;
    employee?: EmployeeDto;
    floor?: string;

    constructor(model: Equipment) {
        this.id = model.id;
        this.name = model.name;
        this.description = model.description;
        this.condition = model.condition;
        // @ts-expect-error any
        this.conditionHuman = conditionsRuLocale[model.condition];
        this.type = model.type;
        // @ts-expect-error any
        this.typeHuman = typesRuLocale[model.type];
        // @ts-expect-error any
        this.inventoryNumber = `${mapTypes[model.type]}:${model.inventoryNumber}`;
        this.createdAt = model.createdAt;
        this.inspectionDate = model.inspectionDate;
        this.cost = model.cost;
        // @ts-expect-error any
        this.element = model.Element ? new ElementDto(model.Element) : undefined;
        this.employee = model.Employee ? new EmployeeDto(model.Employee) : undefined;
        this.floor = model.Floor?.name;
    }
}
