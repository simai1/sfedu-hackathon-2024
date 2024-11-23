import { Router } from 'express';
import verifyToken from '../middlewares/verify-token';
import employeeController from '../controllers/employee.controller';

const router = Router();

router.route('/').get(verifyToken.auth, employeeController.getAll).post(verifyToken.auth, employeeController.create);

router
    .route('/:employeeId')
    .get(verifyToken.auth, employeeController.getOne)
    .patch(verifyToken.auth, employeeController.update)
    .delete(verifyToken.auth, employeeController.destroy);

export default router;
