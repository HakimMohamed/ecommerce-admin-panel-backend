import { Router } from 'express';
import { getItemsSchema } from '../utils/validationSchemas';
import validateSchemaMiddlware from '../middlewares/validateSchema';
import { getItems } from '../controllers/Items.controller';

const router = Router();

router.get('/', getItemsSchema, validateSchemaMiddlware, getItems);

export default router;
