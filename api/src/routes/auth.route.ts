import { Router } from 'express';
import authController from '../controllers/auth.controller';

const router = Router();

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);
router.route('/logout').post(authController.logout);
router.route('/refresh').post(authController.refresh);

export default router;
