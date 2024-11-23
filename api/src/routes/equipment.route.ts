import { Router } from 'express';
import verifyToken from '../middlewares/verify-token';
import equipmentController from '../controllers/equipment.controller';

const router = Router();

router.route('/').get(verifyToken.auth, equipmentController.getAll).post(verifyToken.auth, equipmentController.create);
router
    .route('/:equipmentId')
    .get(verifyToken.auth, equipmentController.getOne)
    .patch(verifyToken.auth, equipmentController.update)
    .delete(verifyToken.auth, equipmentController.destroy);

export default router;
