import catchAsync from '../utils/catchAsync';
import buildingService from '../services/building.service';
import { httpResponse } from '../utils/response';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

const getAll = catchAsync(async (req, res) => {
    const buildings = await buildingService.getAllBuildings();
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: buildings,
    } as httpResponse);
});

const getOne = catchAsync(async (req, res) => {
    const { buildingId } = req.params;
    if (!buildingId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing buildingId');
    const building = await buildingService.getOneBuilding(buildingId);
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: building,
    } as httpResponse);
});

const bulkCreate = catchAsync(async (req, res) => {
    const { data } = req.body;
    await buildingService.bulkCreate(data);
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: null,
    } as httpResponse);
});

const create = catchAsync(async (req, res) => {
    const { name, addressCity, addressOther } = req.body;
    if (!name) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing name');
    if (!addressCity || !addressOther) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing address');
    const building = await buildingService.createBuilding(name, addressCity, addressOther);
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: building,
    } as httpResponse);
});

const update = catchAsync(async (req, res) => {
    const { buildingId } = req.params;
    const { name, addressCity, addressOther } = req.body;
    if (!buildingId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing buildingId');
    if (!name && !addressCity && !addressOther) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing update data');
    await buildingService.updateBuilding(buildingId, name, addressCity, addressOther);
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: null,
    } as httpResponse);
});

const destroy = catchAsync(async (req, res) => {
    const { buildingId } = req.params;
    if (!buildingId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing buildingId');
    await buildingService.deleteBuilding(buildingId);
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
