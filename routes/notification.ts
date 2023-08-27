import express from 'express';
import {consumerNotification,producerNotification} from '../controllers/notificationControllers';

const router = express.Router();

router.post('/send',producerNotification );
router.get('/get',consumerNotification );

export default router;