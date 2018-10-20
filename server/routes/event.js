import { Router } from 'express';
import event from '../middleware/event';
import EventController from '../controllers/event';
import auth from '../middleware/auth';

const router = Router();

router.post('/event', auth.verifyAdminToken, [event.verifyBody, event.verifyDate, event.verifyTime, event.isValidCategory], EventController.createEvent);

export default router;
