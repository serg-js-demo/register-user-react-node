import { Router } from 'express';
import { signin, signup, info, logout }  from '../controllers/auth';
import { verifyToken } from '../middleware';

const router = Router();

const prefix = '/'; //'/api/v1/auth/';

router.post(`${prefix}signin`, signin);
router.post(`${prefix}signup`, signup);
router.get(`${prefix}info`, [verifyToken], info);
router.get(`${prefix}logout`, logout);

export default router;