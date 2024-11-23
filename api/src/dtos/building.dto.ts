import Building from '../models/building';
import FloorDto from './floor.dto';

export default class BuildingDto {
    id!: string;
    name!: string;
    address!: string;
    floors?: FloorDto[];

    constructor(model: Building) {
        this.id = model.id;
        this.name = model.name;
        this.address = `г. ${model.addressCity}, ${model.addressOther}`;
        this.floors = model.Floors ? model.Floors.map(f => new FloorDto(f)) : undefined;
    }
}
