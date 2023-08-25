import express from 'express';
import { createBlog,deleteBlog,getAllBlogs,getSingleBlog,getUserBlogs,likeBlog } from '../controllers/blogControllers';
import verifyToken from '../middleware/verifyToken';

const router = express.Router();

router.post('/create', verifyToken ,createBlog);
router.post('/delete',verifyToken ,deleteBlog);
router.get('/getAll',getAllBlogs);
router.post('/getBlog', verifyToken ,getSingleBlog);
router.post('/getUserBlogs' ,getUserBlogs);
router.post('/:postId',verifyToken ,likeBlog);
export default router;