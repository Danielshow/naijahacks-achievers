import { Router } from 'express';
import AuthController from '../controllers/auth';
import body from '../middleware/auth';
import check from '../middleware/db';

const router = Router();

router.post('/auth/signup', [body.verifyBodyRegister, body.testEmailFormat, body.testPasswordFormat, check.isEmailExist, check.isUsernameExist], AuthController.registerUser);
router.post('/auth/login', [body.verifySignin, check.isEmailInDb], AuthController.login);
router.get('/auth/me', body.verifyToken, AuthController.getMe);
router.get('/auth/logout', body.verifyToken, AuthController.logout)
export default router;
