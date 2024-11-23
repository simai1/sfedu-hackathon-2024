import Element from '../models/element';
import ElementDto from '../dtos/element.dto';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

const getElementById = async (elementId: string): Promise<Element | null> => {
    return await Element.findByPk(elementId);
};

const getOneElement = async (elementId: string): Promise<ElementDto> => {
    const element = await Element.findByPk(elementId);
    if (!element) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found element with id ' + elementId);
    return new ElementDto(element);
};

const createElement = async (data: any): Promise<ElementDto> => {
    const element = await Element.create({ data });
    return new ElementDto(element);
};

const updateElement = async (elementId: string, data: any): Promise<void> => {
    const element = await getElementById(elementId);
    if (!element) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found element with id ' + elementId);
    await element.update({ data });
};

const deleteElement = async (elementId: string): Promise<void> => {
    const element = await getElementById(elementId);
    if (!element) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found element with id ' + elementId);
    await element.destroy({ force: true });
};

export default {
    getElementById,
    getOneElement,
    createElement,
    updateElement,
    deleteElement,
};
