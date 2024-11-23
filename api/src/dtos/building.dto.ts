import Building from '../models/building';

export default class BuildingDto {
    id!: string;
    name!: string;
    address!: string;
    floors?: string[];

    constructor(model: Building) {
        this.id = model.id;
        this.name = model.name;
        this.address = model.addressCity + model.addressOther;
        this.floors = model.Floors?.map(m => m.name);
    }
}
