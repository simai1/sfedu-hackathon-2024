import Building from '../models/building';
import FloorDto from './floor.dto';

export default class BuildingDto {
    id!: string;
    name!: string;
    address!: string;
    city!: string;
    floors?: FloorDto[];
    countOfEmployees?: number;

    constructor(model: Building) {
        this.id = model.id;
        this.name = model.name;
        this.city = model.addressCity;
        this.address = `г. ${model.addressCity}, ${model.addressOther}`;
        this.floors = model.Floors ? model.Floors.map(f => new FloorDto(f)) : undefined;
        this.countOfEmployees = model.Floors
            ? // eslint-disable-next-line @typescript-eslint/no-unused-vars
              model.Floors.reduce((acc, f) => acc + f.Employees.reduce((acc, e) => ++acc, 0), 0)
            : undefined;
    }
}
