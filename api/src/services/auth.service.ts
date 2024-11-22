import UserDto from '../dtos/user.dto';
import userService from './user.service';
import { encrypt, isMatch } from '../utils/encryption';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import jwtUtils from '../utils/jwt';
import User from '../models/user';

type data = {
    accessToken: string;
    refreshToken: string;
    user: UserDto;
};

const register = async (login: string, name: string, password: string) => {
    const checkUser = await userService.getUserByEmail(login);
    if (checkUser) throw new ApiError(httpStatus.BAD_REQUEST, 'User with this email already exists');

    const encryptedPassword = await encrypt(password);

    const user = await User.create({
        login,
        name,
        password: encryptedPassword,
    });

    return new UserDto(user);
};

const login = async (login: string, password: string) => {
    const user = await userService.getUserByEmail(login);
    if (!user || !(await isMatch(password, user.password)))
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid login data');

    const userDto = new UserDto(user);
    const { accessToken, refreshToken } = jwtUtils.generate({ ...userDto });
    await jwtUtils.saveToken(userDto.id, refreshToken);
    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: userDto,
    } as data;
};

const logout = async (refreshToken: string) => {
    await jwtUtils.removeToken(refreshToken);
};

const refresh = async (refreshToken: string): Promise<data> => {
    return await jwtUtils.refresh(refreshToken);
};

export default {
    register,
    login,
    logout,
    refresh,
};
