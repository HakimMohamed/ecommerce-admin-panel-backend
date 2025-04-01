import { Router } from 'express';
import { getOrders } from '../controllers/Orders.controller';

const router = Router();

router.get('/', getOrders);

export default router;
