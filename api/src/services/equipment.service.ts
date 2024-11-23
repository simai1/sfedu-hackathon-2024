import Equipment from '../models/equipment';
import EquipmentDto from '../dtos/equipment.dto';
import Floor from '../models/floor';
import Employee from '../models/employee';
import Element from '../models/element';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import { Op } from 'sequelize';
import { conditionsRuLocale } from '../config/conditions';
import { typesRuLocale } from '../config/type';

const getEquipmentById = async (equipmentId: string): Promise<Equipment | null> => {
    return await Equipment.findByPk(equipmentId);
};

const getOneEquipment = async (equipmentId: string): Promise<EquipmentDto> => {
    const equipment = await Equipment.findByPk(equipmentId, {
        include: [{ model: Floor }, { model: Employee }, { model: Element }],
    });
    if (!equipment) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found equipment with id ' + equipmentId);
    return new EquipmentDto(equipment);
};

const getAllEquipments = async (filter: any): Promise<EquipmentDto[]> => {
    let equipments;
    if (Object.keys(filter).length !== 0 && typeof filter.search !== 'undefined') {
        const searchParams = [
            { name: { [Op.iLike]: `%${filter.search}%` } },
            { description: { [Op.iLike]: `%${filter.search}%` } },
            {
                condition: (() => {
                    return Object.keys(conditionsRuLocale)
                        .filter(s =>
                            // @ts-expect-error skip
                            conditionsRuLocale[s]
                                .toLowerCase()
                                .includes(Number.isInteger(filter.search) ? filter.search : filter.search.toLowerCase())
                        )
                        .map(s => s);
                })(),
            },
            {
                type: (() => {
                    return Object.keys(typesRuLocale)
                        .filter(t =>
                            // @ts-expect-error skip
                            typesRuLocale[t]
                                .toLowerCase()
                                .includes(Number.isInteger(filter.search) ? filter.search : filter.search.toLowerCase())
                        )
                        .map(t => t);
                })(),
            },
            { inventory_number: { [Op.iLike]: `%${filter.search}%` } },
        ];
        equipments = await Equipment.findAll({
            where: { [Op.or]: searchParams },
            include: [{ model: Floor }, { model: Employee }, { model: Element }],
            order: [['type', 'ASC']],
        });
    } else {
        equipments = await Equipment.findAll({
            include: [{ model: Floor }, { model: Employee }, { model: Element }],
            order: [['type', 'ASC']],
        });
    }
    return equipments.map(e => new EquipmentDto(e));
};

const bulkCreate = async (data: any): Promise<void> => {
    for (const item of data) {
        item.inventoryNumber = 0;
    }

    await Equipment.bulkCreate(data);
};

const createEquipment = async (
    name: string,
    description: string | undefined,
    condition: number,
    type: number,
    cost: number | undefined
): Promise<EquipmentDto> => {
    const equipment = await Equipment.create({ name, description, condition, type, cost, inventoryNumber: 0 });
    return new EquipmentDto(equipment);
};

const updateEquipment = async (
    equipmentId: string,
    name: string | undefined,
    description: string | undefined,
    condition: number | undefined,
    type: number | undefined,
    cost: number | undefined,
    inspectionDate: Date | undefined,
    elementId: string | undefined,
    employeeId: string | undefined,
    floorId: string | undefined
): Promise<void> => {
    const equipment = await getEquipmentById(equipmentId);
    if (!equipment) throw new ApiError(httpStatus.BAD_REQUEST, 'No equipment with id ' + equipmentId);
    await equipment.update({
        name,
        description,
        condition,
        type,
        cost,
        inspectionDate,
        elementId,
        employeeId,
        floorId,
    });
};

const deleteEquipment = async (equipmentId: string): Promise<void> => {
    const equipment = await getEquipmentById(equipmentId);
    if (!equipment) throw new ApiError(httpStatus.BAD_REQUEST, 'No equipment with id ' + equipmentId);
    await equipment.destroy({ force: true });
};

const removeFromCanvas = async (equipmentId: string): Promise<void> => {
    const equipment = await getEquipmentById(equipmentId);
    if (!equipment) throw new ApiError(httpStatus.BAD_REQUEST, 'No equipment with id ' + equipmentId);
    await Element.destroy({ where: { id: equipment.elementId } });
    await equipment.update({ elementId: null, floorId: null });
};

export default {
    getEquipmentById,
    getOneEquipment,
    getAllEquipments,
    bulkCreate,
    createEquipment,
    updateEquipment,
    deleteEquipment,
    removeFromCanvas,
};
