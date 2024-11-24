import catchAsync from '../utils/catchAsync';
import elementService from '../services/element.service';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import { httpResponse } from '../utils/response';

const getOne = catchAsync(async (req, res) => {
    const { elementId } = req.params;
    if (!elementId) throw new ApiError(httpStatus.NOT_FOUND, 'Missing elementId');
    const element = await elementService.getOneElement(elementId);
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: element,
    } as httpResponse);
});

const create = catchAsync(async (req, res) => {
    const { data } = req.body;
    if (!data) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing data');
    const element = await elementService.createElement(data);
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: element,
    } as httpResponse);
});

const update = catchAsync(async (req, res) => {
    const { elementId } = req.params;
    const { data } = req.body;
    if (!elementId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing elementId');
    if (!data) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing update data');
    await elementService.updateElement(elementId, data);
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: null,
    } as httpResponse);
});

const destroy = catchAsync(async (req, res) => {
    const { elementId } = req.params;
    if (!elementId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing elementId');
    await elementService.deleteElement(elementId);
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: null,
    } as httpResponse);
});

export default {
    getOne,
    create,
    update,
    destroy,
};
