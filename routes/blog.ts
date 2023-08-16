import express from 'express';
import { createBlog,deleteBlog } from '../controllers/blogControllers';

const router = express.Router();

router.post('/create', createBlog);
router.post('/delete',deleteBlog);

export default router;