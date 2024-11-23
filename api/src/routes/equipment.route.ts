import { Router } from 'express';
import verifyToken from '../middlewares/verify-token';
import equipmentController from '../controllers/equipment.controller';
import verifyRole from '../middlewares/verify-role';
import roles from '../config/roles';

const router = Router();

router
    .route('/')
    .get(verifyToken.auth, equipmentController.getAll)
    .post(verifyToken.auth, verifyRole(roles.ADMIN), equipmentController.create);
router.route('/bulk/create').post(verifyToken.auth, verifyRole(roles.ADMIN), equipmentController.bulkCreate);
router.route('/canvas/:equipmentId').delete(equipmentController.removeFromCanvas);
router
    .route('/:equipmentId')
    .get(verifyToken.auth, equipmentController.getOne)
    .patch(verifyToken.auth, verifyRole(roles.ADMIN), equipmentController.update)
    .delete(verifyToken.auth, verifyRole(roles.ADMIN), equipmentController.destroy);

export default router;
