import Floor from '../models/floor';
import FloorDto from '../dtos/floor.dto';
import buildingService from './building.service';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import Building from '../models/building';
import elementService from './element.service';
import equipmentService from './equipment.service';
import employeeService from './employee.service';
import Element from '../models/element';
import Equipment from '../models/equipment';
import Employee from '../models/employee';

const getFloorById = async (floorId: string): Promise<Floor | null> => {
    return await Floor.findByPk(floorId);
};

const getOneFloor = async (floorId: string): Promise<FloorDto> => {
    const floor = await Floor.findByPk(floorId, { include: [{ model: Building }] });
    if (!floor) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found floor with id ' + floorId);
    return new FloorDto(floor);
};

const updateFloor = async (
    floorId: string,
    buildingId: string | undefined,
    name: string | undefined
): Promise<void> => {
    const floor = await getFloorById(floorId);
    if (!floor) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found floor with id ' + floorId);
    await floor.update({ name, buildingId });
};

const createFloor = async (name: string, buildingId: string): Promise<FloorDto> => {
    const building = await buildingService.getBuildingById(buildingId);
    if (!building) throw new ApiError(httpStatus.BAD_REQUEST, 'No building with id ' + buildingId);
    const floor = await Floor.create({ name, buildingId });
    floor.Building = building;
    return new FloorDto(floor);
};

const deleteFloor = async (floorId: string): Promise<void> => {
    const floor = await getFloorById(floorId);
    if (!floor) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found floor with id ' + floorId);
    await floor.destroy({ force: true });
};

const saveCanvas = async (floorId: string, equipments: any, employees: any, background: any): Promise<void> => {
    const floor = await getFloorById(floorId);
    if (!floor) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found floor with id ' + floorId);
    for (const equipment of equipments) {
        const element = await elementService.createElement(equipment.data);
        await equipmentService.updateEquipment(
            equipment.id,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            element.id,
            undefined,
            floorId
        );
    }
    for (const employee of employees) {
        const element = await elementService.createElement(employee.data);
        await employeeService.updateEmployee(employee.id, undefined, undefined, floorId, undefined, element.id);
    }
    for (const item of background) {
        await Element.create({ data: item.data, floorId });
    }
};

const clearFloor = async (floorId: string): Promise<void> => {
    const floor = await getFloorById(floorId);
    if (!floor) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found floor with id ' + floorId);
    await Element.destroy({ where: { floorId }, force: true });
};

const getCanvas = async (floorId: string): Promise<any> => {
    const floor = await getFloorById(floorId);
    if (!floor) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found floor with id ' + floorId);
    const data = { equipments: [], employees: [], background: [] };
    const background = await Element.findAll({ where: { floorId } });
    const equipments = await Equipment.findAll({ where: { floorId }, include: [{ model: Element }] });
    const employees = await Employee.findAll({ where: { floorId }, include: [{ model: Element }] });
    for (const employee of employees) {
        // @ts-expect-error any
        data.employees.push({
            id: employee.id,
            // @ts-expect-error any
            data: employee.Element.data,
        });
    }
    for (const equipment of equipments) {
        // @ts-expect-error any
        data.equipments.push({
            id: equipment.id,
            // @ts-expect-error any
            data: equipment.Element.data,
        });
    }
    for (const item of background) {
        // @ts-expect-error any
        data.background.push({ data: item.data });
    }
    return data;
};

export default {
    getFloorById,
    getOneFloor,
    createFloor,
    updateFloor,
    deleteFloor,
    saveCanvas,
    clearFloor,
    getCanvas,
};
