import { Router } from 'express';
import { publicCtrl, privateCtrl }  from '../controllers/content';
import { verifyToken } from '../middleware';

const router = Router();

const prefix = '/'; //'/api/v1/content/';

router.get(`${prefix}public`, publicCtrl);
router.get(`${prefix}private`, [verifyToken], privateCtrl);

export default router;