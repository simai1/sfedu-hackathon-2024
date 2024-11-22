import { Router } from 'express';
import verifyToken from '../middlewares/verify-token';
import userController from '../controllers/user.controller';

const router = Router();

router.route('/').get(verifyToken.auth, userController.getProfile);

export default router;
