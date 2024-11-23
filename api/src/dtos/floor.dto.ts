import Floor from '../models/floor';

export default class FloorDto {
    id!: string;
    name!: string;
    building!: string;

    constructor(model: Floor) {
        this.id = model.id;
        this.name = model.name;
        this.building = model.Building.name;
    }
}
