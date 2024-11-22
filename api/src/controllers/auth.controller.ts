import catchAsync from '../utils/catchAsync';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import { httpResponse } from '../utils/response';
import authService from '../services/auth.service';

const register = catchAsync(async (req, res) => {
    const { login, name, password } = req.body;
    const userDto = await authService.register(login, name, password);
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: userDto,
    } as httpResponse);
});

const login = catchAsync(async (req, res) => {
    const { login, password } = req.body;
    if (!login) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing login');
    if (!password) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing password');
    const userData = await authService.login(login, password);
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: userData,
    } as httpResponse);
});

const refresh = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing refreshToken');
    const data = await authService.refresh(refreshToken);
    res.cookie('refreshToken', data.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: data,
    } as httpResponse);
});

const logout = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing refreshToken');
    await authService.logout(refreshToken);
    res.clearCookie('refreshToken');
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: null,
    } as httpResponse);
});

export default {
    register,
    login,
    refresh,
    logout,
};
