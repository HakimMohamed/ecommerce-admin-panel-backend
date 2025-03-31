import { Router } from 'express';
import authRoutes from './auth';
import ticketsRoutes from './tickets';
import itemsRoutes from './items';
import cdnRoutes from './cdn';
import bannerRoutes from './banner';

const router = Router();

router.use('/auth', authRoutes);
router.use('/tickets', ticketsRoutes);
router.use('/items', itemsRoutes);
router.use('/cdn', cdnRoutes);
router.use('/banner-settings', bannerRoutes);

export default router;
