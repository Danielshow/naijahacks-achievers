import { Router } from 'express';
import UsersController from '../controllers/users';
import check from '../middleware/auth';

const router = Router();

router.get('/users', check.verifyAdminToken, UsersController.getAllUsers);
router.delete('/users', check.verifyToken, UsersController.deleteAccount);
router.delete('/users/:id', check.verifyAdminToken, check.isValidID, UsersController.deleteUsers);
router.put('/users/:id', check.verifyAdminToken, check.isValidID, check.verifyRoles, UsersController.promoteUsers);
export default router;
