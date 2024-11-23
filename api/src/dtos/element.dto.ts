import Element from '../models/element';

export default class ElementDto {
    id!: string;
    data!: any;

    constructor(model: Element) {
        this.id = model.id;
        this.data = model.data;
    }
}
