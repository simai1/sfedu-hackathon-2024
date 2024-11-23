import Employee from '../models/employee';
import EmployeeDto from '../dtos/employee.dto';
import Floor from '../models/floor';
import Equipment from '../models/equipment';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import floorService from './floor.service';

const getEmployeeById = async (employeeId: string): Promise<Employee | null> => {
    return await Employee.findByPk(employeeId);
};

const getOneEmployee = async (employeeId: string): Promise<EmployeeDto> => {
    const employee = await Employee.findByPk(employeeId, { include: [{ model: Floor }, { model: Equipment }] });
    if (!employee) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found employee with id ' + employeeId);
    return new EmployeeDto(employee);
};

const getAllEmployees = async (): Promise<EmployeeDto[]> => {
    const employees = await Employee.findAll({ include: [{ model: Floor }, { model: Equipment }] });
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
    equipmentId: string | undefined
): Promise<void> => {
    const employee = await getEmployeeById(employeeId);
    if (!employee) throw new ApiError(httpStatus.BAD_REQUEST, 'No employee with id ' + employeeId);
    await employee.update({ name, position, floorId, equipmentId });
};

const deleteEmployee = async (employeeId: string): Promise<void> => {
    const employee = await getEmployeeById(employeeId);
    if (!employee) throw new ApiError(httpStatus.BAD_REQUEST, 'No employee with id ' + employeeId);
    await employee.destroy({ force: true });
};

export default {
    getEmployeeById,
    getOneEmployee,
    getAllEmployees,
    bulkCreate,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};
