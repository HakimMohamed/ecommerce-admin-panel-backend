import { Router } from 'express';
import { login, logout, verifyOtp, getUser } from '../controllers/Auth.controller';
import {
  getTicketsSchema,
  loginSchema,
  updateTicketSchema,
  verifyOtpSchema,
} from '../utils/validationSchemas';
import validateSchemaMiddlware from '../middlewares/validateSchema';
import { getTickets, updateTicketStatus } from '../controllers/Tickets.controller';

const router = Router();

router.get('/', getTicketsSchema, validateSchemaMiddlware, getTickets);
router.patch('/', updateTicketSchema, validateSchemaMiddlware, updateTicketStatus);

export default router;
