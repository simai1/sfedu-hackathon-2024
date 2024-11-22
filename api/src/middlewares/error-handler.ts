import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';
import { httpResponse } from '../utils/response';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;

    const response: httpResponse = {
        status: 'error',
        exception: err.name || 'Error',
        message: err.message || 'An unexpected error occurred',
        tag: null,
        data: null,
    };

    console.log(err.stack);

    res.status(statusCode).json(response);
};
