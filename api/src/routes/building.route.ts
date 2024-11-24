import { Router } from 'express';
import verifyToken from '../middlewares/verify-token';
import buildingController from '../controllers/building.controller';
import verifyRole from '../middlewares/verify-role';
import roles from '../config/roles';

const router = Router();

router
    .route('/')
    .get(verifyToken.auth, buildingController.getAll)
    .post(verifyToken.auth, verifyRole(roles.ADMIN), buildingController.create);
router.route('/bulk/create').post(verifyToken.auth, verifyRole(roles.ADMIN), buildingController.bulkCreate);
router.route('/bulk/delete').post(verifyToken.auth, verifyRole(roles.ADMIN), buildingController.destroyMany);
router
    .route('/:buildingId')
    .get(verifyToken.auth, buildingController.getOne)
    .patch(verifyToken.auth, verifyRole(roles.ADMIN), buildingController.update)
    .delete(verifyToken.auth, verifyRole(roles.ADMIN), buildingController.destroy);

export default router;
