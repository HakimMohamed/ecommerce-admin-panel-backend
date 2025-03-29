import { Router } from 'express';
import { getItemsSchema } from '../utils/validationSchemas';
import validateSchemaMiddlware from '../middlewares/validateSchema';
import { deleteItem, getItems, updateItems } from '../controllers/Items.controller';

const router = Router();

router.get('/', getItemsSchema, validateSchemaMiddlware, getItems);
router.patch('/', updateItems);
router.delete('/', deleteItem);

export default router;
