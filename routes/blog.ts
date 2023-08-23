import express from 'express';
import { createBlog,deleteBlog,getAllBlogs } from '../controllers/blogControllers';
import verifyToken from '../middleware/verifyToken';

const router = express.Router();

router.post('/create', verifyToken ,createBlog);
router.post('/delete',verifyToken ,deleteBlog);
router.get('/getAll', verifyToken ,getAllBlogs);

export default router;