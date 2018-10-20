import express from 'express';
import AuthController from '../controllers/auth';
import body from '../middleware/auth';
import check from '../middleware/db';

const router = express.Router();

router.POST('/auth/signup', [body.verifyBodyRegister, body.testEmailFormat, body.testPasswordFormat, check.isEmailExist], AuthController.registerUser);
