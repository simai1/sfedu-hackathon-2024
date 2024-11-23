import Equipment from '../models/equipment';
import EquipmentDto from '../dtos/equipment.dto';
import Floor from '../models/floor';
import Employee from '../models/employee';
import Element from '../models/element';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

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

const getAllEquipments = async (): Promise<EquipmentDto[]> => {
    const equipments = await Equipment.findAll({
        include: [{ model: Floor }, { model: Employee }, { model: Element }],
    });
    return equipments.map(e => new EquipmentDto(e));
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

export default {
    getEquipmentById,
    getOneEquipment,
    getAllEquipments,
    createEquipment,
    updateEquipment,
    deleteEquipment,
};
