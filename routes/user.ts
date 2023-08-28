import express from 'express';
import verifyToken from '../middleware/verifyToken';
import {followUser,unfollowUser} from '../controllers/userControllers';

const router = express.Router();

router.post('/follow/:userId',followUser);
router.post('/unfollow/:userId',unfollowUser);

export default router;