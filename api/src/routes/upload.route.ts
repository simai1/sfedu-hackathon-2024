import { Router } from 'express';
import path from 'path';
import { v4 } from 'uuid';
import multer from 'multer';
import uploadController from '../controllers/upload.controller';
import verifyToken from '../middlewares/verify-token';
import verifyRole from '../middlewares/verify-role';
import roles from '../config/roles';

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `${v4()}.${file.originalname.split('.')[1]}`);
    },
});

const uploadFile = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const acceptedExtensionsList = ['.csv', '.xlsx', '.xls'];
        const extname = path.extname(file.originalname).toLowerCase();
        if (acceptedExtensionsList.includes(extname)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file extension'));
        }
    },
});

router
    .route('/employees')
    .post(verifyToken.auth, verifyRole(roles.ADMIN), uploadFile.single('file'), uploadController.uploadEmployees);
router
    .route('/equipments')
    .post(verifyToken.auth, verifyRole(roles.ADMIN), uploadFile.single('file'), uploadController.uploadEquipments);
router
    .route('/buildings')
    .post(verifyToken.auth, verifyRole(roles.ADMIN), uploadFile.single('file'), uploadController.uploadBuildings);

export default router;
