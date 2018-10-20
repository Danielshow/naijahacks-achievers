import { Router } from 'express';
import event from '../middleware/event';
import EventController from '../controllers/event';

const router = Router();

router.post('/event', [event.verifyBody, event.verifyDate, event.verifyTime, event.isValidCategory], EventController.createEvent);

export default router;
