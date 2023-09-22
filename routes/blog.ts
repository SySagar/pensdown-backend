import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
  getUserBlogs,
  getUserBlogByUserId,
  likeBlog,
  commentOnBlog,
  getCommentsForPost
} from "../controllers/blogControllers";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

router.post("/create", verifyToken, createBlog);
router.post("/delete", verifyToken, deleteBlog);
router.get("/getAll", getAllBlogs);
router.post("/getBlog", getSingleBlog);
router.post("/getUserBlogs", getUserBlogs);
router.post("/getUserBlogsByUserId", getUserBlogByUserId);
router.post("/:blogId", verifyToken, likeBlog);
router.post("/comment/:blogId", verifyToken, commentOnBlog);
router.get("/comments/:blogId",  getCommentsForPost);
export default router;
