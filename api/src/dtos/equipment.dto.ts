import Equipment from '../models/equipment';
import { conditionsRuLocale } from '../config/conditions';
import { mapTypes, typesRuLocale } from '../config/type';
import ElementDto from './element.dto';
import EmployeeDto from './employee.dto';
import strftime from 'strftime';

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
    createdAtHuman!: string;
    inspectionDate!: Date;
    inspectionDateHuman!: string;
    cost?: number;
    factCost?: number;
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
        this.createdAtHuman = strftime('%d.%m.%y', model.createdAt);
        this.inspectionDate = model.inspectionDate;
        this.inspectionDateHuman = strftime('%d.%m.%y', model.inspectionDate);
        this.cost = model.cost;

        const serviceLife = 10;
        const salvageValue = 0;
        const yearsUsed = Math.floor((new Date().getTime() - model.createdAt.getTime()) / (1000 * 60 * 60 * 24 * 365)); // В годах

        if (model.cost && yearsUsed <= serviceLife) {
            const annualDepreciation = (model.cost - salvageValue) / serviceLife;
            this.factCost = Math.max(model.cost - annualDepreciation * yearsUsed, salvageValue);
        } else {
            this.factCost = undefined;
        }

        // @ts-expect-error any
        this.element = model.Element ? new ElementDto(model.Element) : undefined;
        this.employee = model.Employee ? new EmployeeDto(model.Employee) : undefined;
        this.floor = model.Floor?.name;
    }
}
