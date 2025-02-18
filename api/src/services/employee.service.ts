import Employee from '../models/employee';
import EmployeeDto from '../dtos/employee.dto';
import Floor from '../models/floor';
import Equipment from '../models/equipment';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import floorService from './floor.service';
import Element from '../models/element';
import { Op } from 'sequelize';
import { positionsRuLocale } from '../config/positions';

const getEmployeeById = async (employeeId: string): Promise<Employee | null> => {
    return await Employee.findByPk(employeeId);
};

const getOneEmployee = async (employeeId: string): Promise<EmployeeDto> => {
    const employee = await Employee.findByPk(employeeId, { include: [{ model: Floor }, { model: Equipment }] });
    if (!employee) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found employee with id ' + employeeId);
    return new EmployeeDto(employee);
};

const getAllEmployees = async (filter: any): Promise<EmployeeDto[]> => {
    let employees;
    if (Object.keys(filter).length !== 0 && typeof filter.search !== 'undefined') {
        const searchParams = [
            { name: { [Op.iLike]: `%${filter.search}%` } },
            {
                position: (() => {
                    return Object.keys(positionsRuLocale)
                        .filter(p =>
                            // @ts-expect-error skip
                            positionsRuLocale[p]
                                .toLowerCase()
                                .includes(Number.isInteger(filter.search) ? filter.search : filter.search.toLowerCase())
                        )
                        .map(p => p);
                })(),
            },
        ];
        employees = await Employee.findAll({
            where: { [Op.or]: searchParams },
            include: [{ model: Floor }, { model: Equipment }],
            order: [['name', 'ASC']],
        });
    } else {
        employees = await Employee.findAll({
            include: [{ model: Floor }, { model: Equipment }],
            order: [['name', 'ASC']],
        });
    }
    return employees.map(e => new EmployeeDto(e));
};

const bulkCreate = async (data: any): Promise<void> => {
    await Employee.bulkCreate(data);
};

const createEmployee = async (name: string, position: number, floorId: string | undefined): Promise<EmployeeDto> => {
    if (floorId) {
        const floor = await floorService.getFloorById(floorId);
        if (!floor) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found floor with id ' + floorId);
        const employee = await Employee.create({ name, position, floorId });
        employee.Floor = floor;
        return new EmployeeDto(employee);
    } else {
        const employee = await Employee.create({ name, position, floorId });
        return new EmployeeDto(employee);
    }
};

const updateEmployee = async (
    employeeId: string,
    name: string | undefined,
    position: number | undefined,
    floorId: string | undefined,
    equipmentId: string | undefined,
    elementId: string | undefined
): Promise<void> => {
    const employee = await getEmployeeById(employeeId);
    if (!employee) throw new ApiError(httpStatus.BAD_REQUEST, 'No employee with id ' + employeeId);
    if (equipmentId) {
        const equipment = await Equipment.findByPk(equipmentId);
        if (!equipment) throw new ApiError(httpStatus.BAD_REQUEST, 'No equipment with id ' + equipmentId);
        await equipment.update({ employeeId });
    }
    await employee.update({ name, position, floorId, equipmentId, elementId });
};

const deleteEmployee = async (employeeId: string): Promise<void> => {
    const employee = await getEmployeeById(employeeId);
    if (!employee) throw new ApiError(httpStatus.BAD_REQUEST, 'No employee with id ' + employeeId);
    await employee.destroy({ force: true });
};

const removeFromCanvas = async (employeeId: string): Promise<void> => {
    const employee = await getEmployeeById(employeeId);
    if (!employee) throw new ApiError(httpStatus.BAD_REQUEST, 'No employee with id ' + employeeId);
    await Element.destroy({ where: { id: employee.elementId } });
    await employee.update({ elementId: null, floorId: null });
};

const deleteMany = async (ids: any): Promise<void> => {
    await Employee.destroy({ where: { id: ids } });
};

export default {
    getEmployeeById,
    getOneEmployee,
    getAllEmployees,
    bulkCreate,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    removeFromCanvas,
    deleteMany,
};
