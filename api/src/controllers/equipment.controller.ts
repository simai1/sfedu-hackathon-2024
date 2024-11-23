import catchAsync from '../utils/catchAsync';
import { httpResponse } from '../utils/response';
import equipmentService from '../services/equipment.service';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import conditions from '../config/conditions';
import types from '../config/type';

const getAll = catchAsync(async (req, res) => {
    const equipments = await equipmentService.getAllEquipments();
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: equipments,
    } as httpResponse);
});

const getOne = catchAsync(async (req, res) => {
    const { equipmentId } = req.params;
    if (!equipmentId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing employeeId');
    const equipment = await equipmentService.getOneEquipment(equipmentId);
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: equipment,
    } as httpResponse);
});

const bulkCreate = catchAsync(async (req, res) => {
    const { data } = req.body;
    await equipmentService.bulkCreate(data);
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: null,
    } as httpResponse);
});

const create = catchAsync(async (req, res) => {
    const { name, description, condition, type, cost } = req.body;
    if (!name) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing name');
    if (!condition) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing condition');
    if (!Object.values(conditions).includes(condition)) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid condition');
    if (!type) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing type');
    if (!Object.values(types).includes(type)) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid type');
    const equipment = await equipmentService.createEquipment(name, description, condition, type, cost);
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: equipment,
    } as httpResponse);
});

const update = catchAsync(async (req, res) => {
    const { equipmentId } = req.params;
    const { name, description, condition, type, cost, inspectionDate, elementId, employeeId, floorId } = req.body;
    if (!equipmentId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing equipmentId');
    if (
        !name &&
        !description &&
        !condition &&
        !type &&
        !cost &&
        !inspectionDate &&
        !elementId &&
        !employeeId &&
        !floorId
    )
        throw new ApiError(httpStatus.BAD_REQUEST, 'Missing update data');
    if (condition && !Object.values(conditions).includes(condition))
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid condition');
    if (type && !Object.values(types).includes(type)) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid type');
    await equipmentService.updateEquipment(
        equipmentId,
        name,
        description,
        condition,
        type,
        cost,
        inspectionDate,
        elementId,
        employeeId,
        floorId
    );
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: null,
    } as httpResponse);
});

const destroy = catchAsync(async (req, res) => {
    const { equipmentId } = req.params;
    if (!equipmentId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing equipment');
    await equipmentService.deleteEquipment(equipmentId);
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
