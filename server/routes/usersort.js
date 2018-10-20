import { Router } from 'express';
import UserSort from '../controllers/usersort';
import event from '../middleware/event';
import auth from '../middleware/auth';
import db from '../middleware/db';

const router = Router();

router.post('/category', event.isValidCategory, UserSort.sortByCategory);
router.post('/event/register/:id', [auth.isValidID, event.verifyEventRegister, db.isEmailInRegister, auth.testEmailFormat], UserSort.registerForEvent);
router.get('/event/users/:id', auth.verifyToken, [auth.isValidID, db.isUserResource], UserSort.getUserForEvent);
export default router;
