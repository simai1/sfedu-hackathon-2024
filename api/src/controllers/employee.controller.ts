import catchAsync from '../utils/catchAsync';
import employeeService from '../services/employee.service';
import { httpResponse } from '../utils/response';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import positions from '../config/positions';

const getAll = catchAsync(async (req, res) => {
    const employees = await employeeService.getAllEmployees();
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: employees,
    } as httpResponse);
});

const bulkCreate = catchAsync(async (req, res) => {
    const { data } = req.body;
    await employeeService.bulkCreate(data);
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: null,
    } as httpResponse);
});

const getOne = catchAsync(async (req, res) => {
    const { employeeId } = req.params;
    if (!employeeId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing employeeId');
    const employee = await employeeService.getOneEmployee(employeeId);
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: employee,
    } as httpResponse);
});

const create = catchAsync(async (req, res) => {
    const { name, position, floorId } = req.body;
    if (!name) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing name');
    if (!position) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing position');
    if (!Object.values(positions).includes(position)) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid position');
    const employee = await employeeService.createEmployee(name, position, floorId);
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: employee,
    } as httpResponse);
});

const update = catchAsync(async (req, res) => {
    const { employeeId } = req.params;
    const { name, position, floorId, equipmentId, elementId } = req.body;
    if (!employeeId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing employeeId');
    if (!name && !position && !floorId && !equipmentId && !elementId)
        throw new ApiError(httpStatus.BAD_REQUEST, 'Missing update data');
    if (position && !Object.values(positions).includes(position))
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid position');
    await employeeService.updateEmployee(employeeId, name, position, floorId, equipmentId, elementId);
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: null,
    } as httpResponse);
});

const destroy = catchAsync(async (req, res) => {
    const { employeeId } = req.params;
    if (!employeeId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing employeeId');
    await employeeService.deleteEmployee(employeeId);
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: null,
    } as httpResponse);
});

export default {
    getAll,
    getOne,
    bulkCreate,
    create,
    update,
    destroy,
};
