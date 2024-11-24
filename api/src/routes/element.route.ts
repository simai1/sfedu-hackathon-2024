import { Router } from 'express';
import verifyToken from '../middlewares/verify-token';
import elementController from '../controllers/element.controller';
import verifyRole from '../middlewares/verify-role';
import roles from '../config/roles';

const router = Router();

router.route('/').post(verifyToken.auth, verifyRole(roles.ADMIN), elementController.create);

router
    .route('/:elementId')
    .get(verifyToken.auth, elementController.getOne)
    .patch(verifyToken.auth, verifyRole(roles.ADMIN), elementController.update)
    .delete(verifyToken.auth, verifyRole(roles.ADMIN), elementController.destroy);

export default router;
