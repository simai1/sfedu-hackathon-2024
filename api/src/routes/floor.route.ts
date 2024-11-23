import { Router } from 'express';
import verifyToken from '../middlewares/verify-token';
import floorController from '../controllers/floor.controller';

const router = Router();

router.route('/').post(verifyToken.auth, floorController.create);

router
    .route('/:floorId')
    .get(verifyToken.auth, floorController.getOne)
    .patch(verifyToken.auth, floorController.update)
    .delete(verifyToken.auth, floorController.destroy);

export default router;
