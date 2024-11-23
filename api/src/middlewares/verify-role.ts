import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

const verifyRole = (role: number) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const userData = req.user;
        if (role !== userData.role) {
            return next(new ApiError(httpStatus.FORBIDDEN, 'Forbidden action'));
        }
        return next();
    });

export default verifyRole;
