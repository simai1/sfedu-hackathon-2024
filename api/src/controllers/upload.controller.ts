import catchAsync from '../utils/catchAsync';
import XLSX from 'xlsx';
import * as fs from 'node:fs';
import { httpResponse } from '../utils/response';
import employeeService from '../services/employee.service';
import { mapPositionsRuLocale } from '../config/positions';
import { mapConditionsRuLocale } from '../config/conditions';
import { mapTypesRuLocale } from '../config/type';
import Equipment from '../models/equipment';
import EquipmentDto from '../dtos/equipment.dto';
import buildingService from '../services/building.service';

function convertToDate(dateString: string) {
    const [day, month, year] = dateString.split('.');
    const formattedDate = `20${year}-${month}-${day}`;
    return new Date(formattedDate);
}

const readXLSX = (filepath: string) => {
    const fileBuffer = fs.readFileSync(filepath);
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    // @ts-expect-error any
    const maxLength = Math.max(...jsonData.map(r => r.length));
    return jsonData.map(r => {
        // @ts-expect-error any
        if (r.length < maxLength)
            // @ts-expect-error any
            while (r.length < maxLength) {
                // @ts-expect-error any
                r.push('');
            }
        return r;
    });
};

const uploadEmployees = catchAsync(async (req, res) => {
    const fileName = req.file?.filename;
    const data = readXLSX('./uploads/' + fileName);
    const employees = [];
    for (const item of data.slice(1)) {
        // @ts-expect-error any
        employees.push(await employeeService.createEmployee(item[0], mapPositionsRuLocale[item[1]], undefined));
    }
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: employees,
    } as httpResponse);
});

const uploadEquipments = catchAsync(async (req, res) => {
    const fileName = req.file?.filename;
    const data = readXLSX('./uploads/' + fileName);
    const equipments = [];
    for (const item of data.slice(1)) {
        const equipment = await Equipment.create({
            // @ts-expect-error any
            name: item[0],
            // @ts-expect-error any
            description: item[1],
            // @ts-expect-error any
            condition: mapConditionsRuLocale[item[2]],
            // @ts-expect-error any
            type: mapTypesRuLocale[item[3]],
            // @ts-expect-error any
            inventoryNumber: item[4],
            // @ts-expect-error any
            createdAt: convertToDate(item[5]),
            // @ts-expect-error any
            inspectionDate: convertToDate(item[6]),
            // @ts-expect-error any
            cost: item[7],
        });
        equipments.push(new EquipmentDto(equipment));
    }
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: equipments,
        // data: data,
    } as httpResponse);
});

const uploadBuildings = catchAsync(async (req, res) => {
    const fileName = req.file?.filename;
    const data = readXLSX('./uploads/' + fileName);
    const buildings = [];
    for (const item of data.slice(1)) {
        // @ts-expect-error any
        buildings.push(await buildingService.createBuilding(item[0], item[1], item[2].split(',')[1]));
    }
    res.json({
        status: 'ok',
        exception: null,
        message: null,
        tag: null,
        data: buildings,
    } as httpResponse);
});

export default {
    uploadEmployees,
    uploadEquipments,
    uploadBuildings,
};
