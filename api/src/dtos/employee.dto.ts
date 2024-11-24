import Employee from '../models/employee';
import { positionsRuLocale } from '../config/positions';
import EquipmentDto from './equipment.dto';

export default class EmployeeDto {
    id!: string;
    name!: string;
    position!: number;
    positionHuman!: string;
    floor?: string;
    building?: string;
    equipments?: EquipmentDto[];

    constructor(model: Employee) {
        this.id = model.id;
        this.name = model.name;
        this.position = model.position;
        // @ts-expect-error any
        this.positionHuman = positionsRuLocale[model.position];
        this.floor = model.Floor?.name;
        this.building = model.Floor?.Building?.name;
        this.equipments = model.Equipment ? model.Equipment.map(m => new EquipmentDto(m)) : undefined;
    }
}
