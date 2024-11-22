import catchAsync from '../utils/catchAsync';
import userService from '../services/user.service';
import { httpResponse } from '../utils/response';
import UserDto from '../dtos/user.dto';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

const getProfile = catchAsync(async (req, res) => {
    const userData = req.user;
    const user = await userService.getUserById(userData.id);
    if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: new UserDto(user),
    } as httpResponse);
});

const switchRole = catchAsync(async (req, res) => {
    const userData = req.user;
    const user = await userService.getUserById(userData.id);
    if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
    await userService.switchRole(user);
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: null,
    } as httpResponse);
});

export default {
    getProfile,
    switchRole,
};
