import { Router } from 'express';
import { login, logout, verifyOtp, getUser } from '../controllers/Auth.controller';
import { loginSchema, verifyOtpSchema } from '../utils/validationSchemas';
import validateSchemaMiddlware from '../middlewares/validateSchema';

const router = Router();

// /api/auth

router.get('/user', getUser);
router.post('/login', loginSchema, validateSchemaMiddlware, login);
router.post('/otp/verify', verifyOtpSchema, validateSchemaMiddlware, verifyOtp);
router.delete('/logout', logout);

//

// router.get('/forgot-password', authenticateToken, login);
// router.get('/reset-password', login);

export default router;
