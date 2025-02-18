import { Router } from 'express';
import verifyToken from '../middlewares/verify-token';
import employeeController from '../controllers/employee.controller';
import verifyRole from '../middlewares/verify-role';
import roles from '../config/roles';

const router = Router();

router
    .route('/')
    .get(verifyToken.auth, employeeController.getAll)
    .post(verifyToken.auth, verifyRole(roles.ADMIN), employeeController.create);
router.route('/bulk/create').post(verifyToken.auth, verifyRole(roles.ADMIN), employeeController.bulkCreate);
router.route('/bulk/delete').post(verifyToken.auth, verifyRole(roles.ADMIN), employeeController.destroyMany);
router.route('/canvas/:employeeId').delete(employeeController.removeFromCanvas);
router
    .route('/:employeeId')
    .get(verifyToken.auth, employeeController.getOne)
    .patch(verifyToken.auth, verifyRole(roles.ADMIN), employeeController.update)
    .delete(verifyToken.auth, verifyRole(roles.ADMIN), employeeController.destroy);

export default router;
