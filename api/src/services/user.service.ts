import User from '../models/user';
import tokenService from './token.service';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

const getUserById = async (userId: string): Promise<User | null> => {
    return await User.findByPk(userId);
};

const getUserByRefreshToken = async (refreshToken: string): Promise<User | null> => {
    const token = await tokenService.getTokenByRefreshToken(refreshToken);
    if (!token) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found token');
    return await getUserById(token.userId);
};

const getUserByEmail = async (login: string): Promise<User | null> => {
    return User.findOne({ where: { login } });
};

const switchRole = async (user: User): Promise<void> => {
    await user.update({ role: user.role === 1 ? 2 : 1 });
};

export default {
    getUserById,
    getUserByRefreshToken,
    getUserByEmail,
    switchRole,
};
