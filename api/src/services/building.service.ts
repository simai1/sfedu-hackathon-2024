import Building from '../models/building';
import BuildingDto from '../dtos/building.dto';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import Floor from '../models/floor';
import Employee from '../models/employee';
import { Op } from 'sequelize';

const getBuildingById = async (buildingId: string): Promise<Building | null> => {
    return await Building.findByPk(buildingId);
};

const getOneBuilding = async (buildingId: string): Promise<BuildingDto> => {
    const building = await Building.findByPk(buildingId, {
        include: [{ model: Floor, include: [{ model: Employee }] }],
    });
    if (!building) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found building with id ' + buildingId);
    return new BuildingDto(building);
};

const getAllBuildings = async (filter: any): Promise<BuildingDto[]> => {
    let buildings;
    if (Object.keys(filter).length !== 0 && typeof filter.search !== 'undefined') {
        const searchParams = [
            { name: { [Op.iLike]: `%${filter.search}%` } },
            { addressCity: { [Op.iLike]: `%${filter.search}%` } },
            { addressOther: { [Op.iLike]: `%${filter.search}%` } },
        ];
        buildings = await Building.findAll({
            where: { [Op.or]: searchParams },
            include: [{ model: Floor, include: [{ model: Employee }] }],
            order: [['addressCity', 'ASC']],
        });
    } else {
        buildings = await Building.findAll({
            include: [{ model: Floor, include: [{ model: Employee }] }],
            order: [['addressCity', 'ASC']],
        });
    }
    return buildings.map(b => new BuildingDto(b));
};

const bulkCreate = async (data: any): Promise<void> => {
    await Building.bulkCreate(data);
};

const createBuilding = async (name: string, addressCity: string, addressOther: string): Promise<BuildingDto> => {
    const building = await Building.create({ name, addressCity, addressOther });
    return new BuildingDto(building);
};

const updateBuilding = async (
    buildingId: string,
    name: string | undefined,
    addressCity: string | undefined,
    addressOther: string | undefined
): Promise<void> => {
    const building = await getBuildingById(buildingId);
    if (!building) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found building with id ' + buildingId);
    await building.update({ name, addressCity, addressOther });
};

const deleteBuilding = async (buildingId: string): Promise<void> => {
    const building = await getBuildingById(buildingId);
    if (!building) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found building with id ' + buildingId);
    await building.destroy({ force: true });
};

export default {
    getBuildingById,
    getOneBuilding,
    getAllBuildings,
    bulkCreate,
    createBuilding,
    updateBuilding,
    deleteBuilding,
};
