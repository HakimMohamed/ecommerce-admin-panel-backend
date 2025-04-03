import { Router } from 'express';
import authRoutes from './auth';
import ticketsRoutes from './tickets';
import itemsRoutes from './items';
import cdnRoutes from './cdn';
import bannerRoutes from './banner';
import ordersRoutes from './orders';
import categoriesRoutes from './categories';

const router = Router();

router.use('/auth', authRoutes);
router.use('/tickets', ticketsRoutes);
router.use('/items', itemsRoutes);
router.use('/cdn', cdnRoutes);
router.use('/banner-settings', bannerRoutes);
router.use('/orders', ordersRoutes);
router.use('/categories', categoriesRoutes);

export default router;
