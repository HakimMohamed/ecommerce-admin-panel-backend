import { Router } from 'express';
import { login, logout, verifyOtp, getUser } from '../controllers/Auth.controller';
import { getTicketsSchema, loginSchema, verifyOtpSchema } from '../utils/validationSchemas';
import validateSchemaMiddlware from '../middlewares/validateSchema';
import { getTickets } from '../controllers/Tickets.controller';

const router = Router();

router.get('/', getTicketsSchema, validateSchemaMiddlware, getTickets);

export default router;
