import { Router } from 'express';
import authRoutes from './auth';
import ticketsRoutes from './tickets';
import itemsRoutes from './items';

const router = Router();

router.use('/auth', authRoutes);
router.use('/tickets', ticketsRoutes);
router.use('/items', itemsRoutes);

export default router;
