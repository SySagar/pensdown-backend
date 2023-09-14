import express from 'express';
import verifyToken from '../middleware/verifyToken';
import {followUser,getAuthorInfo} from '../controllers/userControllers';

const router = express.Router();

router.post('/follow/:userId',verifyToken,followUser);
router.get('/:userId',getAuthorInfo);

export default router;