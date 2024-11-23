import { Router } from 'express';
import verifyToken from '../middlewares/verify-token';
import floorController from '../controllers/floor.controller';
import verifyRole from '../middlewares/verify-role';
import roles from '../config/roles';

const router = Router();

router.route('/').post(verifyToken.auth, verifyRole(roles.ADMIN), floorController.create);

router
    .route('/:floorId')
    .get(verifyToken.auth, floorController.getOne)
    .patch(verifyToken.auth, verifyRole(roles.ADMIN), floorController.update)
    .delete(verifyToken.auth, verifyRole(roles.ADMIN), floorController.destroy);

export default router;
