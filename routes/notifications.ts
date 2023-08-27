import express from 'express';
import {publishNotification,subscribeNotification} from '../controllers/notificationControllers'

const router = express.Router();

router.post('/send', publishNotification);
router.get('/get', subscribeNotification);

export default router;