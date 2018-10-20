import { Router } from 'express';
import event from '../middleware/event';
import EventController from '../controllers/event';
import auth from '../middleware/auth';
import db from '../middleware/db';

const router = Router();

router.post('/event', auth.verifyToken, [event.verifyBody, event.verifyDate, event.verifyTime, event.isValidCategory], EventController.createEvent);
router.get('/event', EventController.getAllEvent);
router.get('/event/:id', auth.isValidID, EventController.getOneEvent);
router.put('/event/:id', auth.verifyToken, [auth.isValidID, db.isUserResource, event.verifyBody, event.verifyDate, event.verifyTime, event.isValidCategory], EventController.updateEvent);
router.get('/event/:id/user', auth.verifyToken, [auth.isValidID, db.isUserEvent], EventController.getAllEventUser);

export default router;
