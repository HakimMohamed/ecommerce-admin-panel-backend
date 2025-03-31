import { Router } from 'express';
import { getBannerSettings, updateBannerSettings } from '../controllers/Banner.controller';

const router = Router();

router.get('/', getBannerSettings);
router.patch('/', updateBannerSettings);

export default router;
