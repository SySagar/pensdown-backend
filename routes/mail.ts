import express from 'express';
import { sendMail } from '../controllers/mailControllers';

const router = express.Router();

router.post('/send', sendMail);

export default router;