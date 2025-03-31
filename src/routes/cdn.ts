import { Router } from 'express';
import { uploadImage } from '../controllers/CDN.controller';
import multer from 'multer';

const router = Router();

const upload = multer({ dest: 'temp/' });

router.post('/upload', upload.single('image'), uploadImage);

export default router;
