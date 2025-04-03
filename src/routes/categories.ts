import { Router } from 'express';
import {
  addCategory,
  getCategories,
  deleteCategory,
  updateCategories,
} from '../controllers/Categories.controller';

const router = Router();

router.get('/', getCategories);
router.patch('/', updateCategories );
router.post('/', addCategory);
router.delete('/', deleteCategory);

export default router;
