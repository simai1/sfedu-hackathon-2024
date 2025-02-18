import catchAsync from '../utils/catchAsync';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import floorService from '../services/floor.service';
import { httpResponse } from '../utils/response';

const getOne = catchAsync(async (req, res) => {
    const { floorId } = req.params;
    if (!floorId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing floorId');
    const floor = await floorService.getOneFloor(floorId);
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: floor,
    } as httpResponse);
});

const create = catchAsync(async (req, res) => {
    const { name, buildingId } = req.body;
    if (!name) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing name');
    if (!buildingId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing buildingId');
    const floor = await floorService.createFloor(name, buildingId);
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: floor,
    } as httpResponse);
});

const update = catchAsync(async (req, res) => {
    const { floorId } = req.params;
    const { name, buildingId } = req.body;
    if (!floorId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing floorId');
    if (!name && !buildingId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing update data');
    await floorService.updateFloor(floorId, buildingId, name);
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: null,
    } as httpResponse);
});

const destroy = catchAsync(async (req, res) => {
    const { floorId } = req.params;
    if (!floorId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing floorId');
    await floorService.deleteFloor(floorId);
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: null,
    } as httpResponse);
});

const saveCanvas = catchAsync(async (req, res) => {
    const { floorId } = req.params;
    const { equipments, employees, background } = req.body;
    if (!floorId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing floorId');
    if (!equipments) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing equipments');
    if (!employees) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing employees');
    if (!background) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing background');
    await floorService.saveCanvas(floorId, equipments, employees, background);
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: null,
    } as httpResponse);
});

const clearFloor = catchAsync(async (req, res) => {
    const { floorId } = req.params;
    if (!floorId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing floorId');
    await floorService.clearFloor(floorId);
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: null,
    } as httpResponse);
});

const getCanvas = catchAsync(async (req, res) => {
    const { floorId } = req.params;
    if (!floorId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing floorId');
    const canvas = await floorService.getCanvas(floorId);
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: canvas,
    } as httpResponse);
});

export default {
    getOne,
    create,
    update,
    destroy,
    saveCanvas,
    clearFloor,
    getCanvas,
};
