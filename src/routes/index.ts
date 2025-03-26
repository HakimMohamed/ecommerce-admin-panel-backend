import { Router } from 'express';
import authRoutes from './auth';
import ticketsRoutes from './tickets';

const router = Router();

router.use('/auth', authRoutes);
router.use('/tickets', ticketsRoutes);

export default router;
