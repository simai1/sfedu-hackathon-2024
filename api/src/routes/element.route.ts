import { Router } from 'express';
import verifyToken from '../middlewares/verify-token';
import elementController from '../controllers/element.controller';

const router = Router();

router.route('/').post(verifyToken.auth, elementController.create);

router
    .route('/:elementId')
    .get(verifyToken.auth, elementController.getOne)
    .patch(verifyToken.auth, elementController.update)
    .delete(verifyToken.auth, elementController.destroy);

export default router;
