import Building from '../models/building';
import BuildingDto from '../dtos/building.dto';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import Floor from '../models/floor';

const getBuildingById = async (buildingId: string): Promise<Building | null> => {
    return await Building.findByPk(buildingId);
};

const getOneBuilding = async (buildingId: string): Promise<BuildingDto> => {
    const building = await Building.findByPk(buildingId, { include: [{ model: Floor }] });
    if (!building) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found building with id ' + buildingId);
    return new BuildingDto(building);
};

const getAllBuildings = async (): Promise<BuildingDto[]> => {
    const buildings = await Building.findAll({ include: [{ model: Floor }] });
    return buildings.map(b => new BuildingDto(b));
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
    createBuilding,
    updateBuilding,
    deleteBuilding,
};
