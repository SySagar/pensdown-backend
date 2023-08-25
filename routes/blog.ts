import express from 'express';
import { createBlog,deleteBlog,getAllBlogs,getSingleBlog,getUserBlogs } from '../controllers/blogControllers';
import verifyToken from '../middleware/verifyToken';

const router = express.Router();

router.post('/create', verifyToken ,createBlog);
router.post('/delete',verifyToken ,deleteBlog);
router.get('/getAll',getAllBlogs);
router.get('/getBlog', verifyToken ,getSingleBlog);
router.post('/getUserBlogs' ,getUserBlogs);

export default router;