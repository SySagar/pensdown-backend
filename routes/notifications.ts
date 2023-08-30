import express from 'express';
import {publishNotification,subscribeNotification} from '../controllers/notificationControllers'
import { cacheData } from '../middleware/cacheData';

const router = express.Router();

router.post('/send', publishNotification);
router.post('/get', cacheData,subscribeNotification);

export default router;