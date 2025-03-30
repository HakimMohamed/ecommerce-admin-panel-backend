import { Router } from 'express';
import { getItemsSchema } from '../utils/validationSchemas';
import validateSchemaMiddlware from '../middlewares/validateSchema';
import { addItem, deleteItem, getItems, updateItems } from '../controllers/Items.controller';

const router = Router();

router.get('/', getItemsSchema, validateSchemaMiddlware, getItems);
router.patch('/', updateItems);
router.delete('/', deleteItem);
router.post('/', addItem);

export default router;
