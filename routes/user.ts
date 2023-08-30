import express from 'express';
import verifyToken from '../middleware/verifyToken';
import {followUser} from '../controllers/userControllers';

const router = express.Router();

router.post('/follow/:userId',verifyToken,followUser);

export default router;