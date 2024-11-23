import { Router } from 'express';
import verifyToken from '../middlewares/verify-token';
import buildingController from '../controllers/building.controller';

const router = Router();

router.route('/').get(verifyToken.auth, buildingController.getAll).post(verifyToken.auth, buildingController.create);
router
    .route('/:buildingId')
    .get(verifyToken.auth, buildingController.getOne)
    .patch(verifyToken.auth, buildingController.update)
    .delete(verifyToken.auth, buildingController.destroy);

export default router;
