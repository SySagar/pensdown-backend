import express from 'express';
import { verifyTokenController } from '../controllers/verifyTokenController';
import verifyToken from '../middleware/verifyToken';

const router = express.Router();

router.post('/', verifyTokenController);

export default router;