import { Router } from 'express';
import { getOrders, updateOrderStatus } from '../controllers/Orders.controller';

const router = Router();

router.get('/', getOrders);
router.patch('/', updateOrderStatus);

export default router;
