import { Router } from 'express';
import UsersController from '../controllers/users';
import checkAuth from '../middleware/checkAuth';
import valid from '../middleware/auth';

const router = Router();

router.get('/users', checkAuth.verifyAdminToken, UsersController.getAllUsers);
router.delete('/users', checkAuth.verifyToken, UsersController.deleteAccount);
router.delete('/users/:id', checkAuth.verifyAdminToken, valid.isValidID, UsersController.deleteUsers);
router.put('/users/:id', checkAuth.verifyAdminToken, valid.isValidID, valid.verifyRoles, UsersController.promoteUsers);
export default router;
