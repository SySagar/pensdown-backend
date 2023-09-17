import Blog from "../schema/blog";
import {saveBlogToDB,deleteBlogFromDB,getAllBlogsFromDB,getAllUserBlogsFromDB} from '../repository/blog';
import moment from 'moment';
import {searchUserByEmail} from '../repository/auth'
import {blogTypes,jsonResTypes,getBlogjsonResTypes} from "./types/blogTypes";
import {sortblogsByDate} from "../utils/sort";
import Comment from "../schema/Comment";

export const createBlog = async (req: any, res: any) => {
  let { title, content,authorID,authorName,coverImage} = req.body as unknown as blogTypes;
  console.log('authorID',req.body);
    const date = moment().format("dddd, MMMM Do") as unknown as String;

    if(title==null || title==undefined || title=="")
    {
      title="blog";
    }

  try {
    const blog = new Blog({
      title,
      content,
      authorID,
      authorName,
      date,
      likes:[],
      commments:[],
      coverImageURL:coverImage
    });

    const jsonRes = {} as jsonResTypes;
    const isSavedToDB = await saveBlogToDB(blog,authorID)
    

    if (!isSavedToDB) {
        jsonRes["message"] = "Unable to create blog";
        jsonRes["status"] = 400;
    }
    else
    {
        jsonRes["message"] = "Blog created successfully";
        jsonRes["status"] = 200;
    }

    res.json(jsonRes);
  } catch (error: any) {
    res.json({
      error: error.message,
      message: "Error in creating blog",
      status: 500,
    });
  }
};

export const deleteBlog = async (req:any,res:any)=>{
    try {
        const {blogID} = req.body;

       const isBlogDeleted =  await deleteBlogFromDB(blogID);
       const jsonRes = {} as jsonResTypes;
       if (!isBlogDeleted) {
        jsonRes["message"] = "Unable to delete blog";
        jsonRes["status"] = 409;
    }
    else
    {
        jsonRes["message"] = "Blog deleted successfully";
        jsonRes["status"] = 200;
    }

    res.json(jsonRes);
    } catch (error:any) {
        res.json({
            error: error.message,
            message: "Error in deleting blog",
            status: 500,
          });
    }
}


export const getAllBlogs = async (req:any,res:any)=>{
    try {
        const blogs = await getAllBlogsFromDB();
        const jsonRes = {} as getBlogjsonResTypes;
        if (!blogs || blogs==null) {
            jsonRes["message"] = "Unable to fetch blogs";
            jsonRes["status"] = 409;
        }
        else
        {
            jsonRes["message"] = "Blogs fetched successfully";
            jsonRes["status"] = 200;
            jsonRes["blogs"] = sortblogsByDate(blogs);
        }
    
        res.json(jsonRes);
    } catch (error:any) {
        res.json({
            error: error.message,
            message: "Error in fetching blogs",
            status: 500,
          });
    }
}

export const getSingleBlog = async (req:any,res:any)=>{
  const {blogId} = req.body;
  try {
    const blog = await Blog.findById(blogId);
    const jsonRes = {} as getBlogjsonResTypes;
    if (!blog || blog==null) {
        jsonRes["message"] = "Unable to fetch blog";
        jsonRes["status"] = 401;
    }
    else
    {
        jsonRes["message"] = "Blog fetched successfully";
        jsonRes["status"] = 200;
        jsonRes["blogs"] = blog;
    }

    res.json(jsonRes);
} catch (error:any) {
    res.json({
        error: error.message,
        message: "Error in fetching blog",
        status: 500,
      });

    }
}

export const getUserBlogs = async (req:any,res:any)=>{
  const {email} = req.body;
  console.log('email',email);
  try {
    const user = await searchUserByEmail(email);
    const jsonRes = {} as getBlogjsonResTypes;
    if (!user || user==null) {
        jsonRes["message"] = "Unable to fetch blogs";
        jsonRes["status"] = 401;
    }
    else
    {
        jsonRes["message"] = "Blogs fetched successfully";
        jsonRes["status"] = 200;
        jsonRes["blogs"] = user.blogs;
    }

    res.json(jsonRes);
} catch (error:any) {
    res.json({
        error: error.message,
        message: "Error in fetching blogs",
        status: 500,
      });

    }
}

export const getUserBlogByUserId = async (req:any,res:any)=>{
  const {authorId} = req.body;
  console.log('user ID',authorId);
  try {
    const userBlogs = await getAllUserBlogsFromDB(authorId);
    // console.log('userBlogs',userBlogs);
    const jsonRes = {} as getBlogjsonResTypes;
    if (!userBlogs || userBlogs==null) {
        jsonRes["message"] = "Unable to fetch blogs";
        jsonRes["status"] = 401;
    }
    else
    {
        jsonRes["message"] = "Blogs fetched successfully";
        jsonRes["status"] = 200;
        jsonRes["blogs"] = userBlogs;
    }

    res.json(jsonRes);
} catch (error:any) {
    res.json({
        error: error.message,
        message: "Error in fetching blogs",
        status: 500,
      });

    }
}

export const likeBlog = async (req:any,res:any)=>{
  // const {blogId} = req.body;
  const blogId = req.params.postId;
  // console.log('user',req.user)
  const userId = req.body.userId;
  try {
    
    const singleBlog = await Blog.findById(blogId);
    if (!singleBlog) {
      return res.status(404).json({ message: 'blog not found' });
    }
    // const userIndex = singleBlog.likes.findIndex(userEmail);
    
    const userLiked = singleBlog.likes.some(like => {return like.toString() == userId});

    // if (userIndex !== -1) {
    //   // Unlike: Remove the like from the post and save
    //   singleBlog.likes.splice(userIndex, 1);
    //   await singleBlog.save();
    //   res.status(200).json({ message: 'Post unliked successfully' });
    // } else {
    //   // Like: Add the like to the post and save
    //   singleBlog.likes.push(userEmail);
    //   await singleBlog.save();
    //   res.status(200).json({ message: 'Post liked successfully' });
    // }

    if (userLiked) {
      // Unlike: Remove the like from the post and save
      singleBlog.likes = singleBlog.likes.filter(like => {return like !== userId});
      await singleBlog.save();
      res.status(200).json({ message: 'Post unliked successfully' });
    } else {
      // Like: Add the like to the post and save
      singleBlog.likes.push(userId);
      await singleBlog.save();
      res.status(200).json({ message: 'Post liked successfully' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }

}

export const commentOnBlog = async (req:any,res:any)=>{
  try {
    

  const {comment,authorId} = req.body;
  const blogId = req.params.postId;

  const singleBlog = await Blog.findById(blogId);
  if (!singleBlog) {
    return res.status(404).json({ message: 'blog not found' });
  }

  const newComment = new Comment({ comment, authorId, blogId , createdAt: new Date() });
  console.log('newComment',newComment);
  const savedComment = await newComment.save();
  singleBlog.comments.push(authorId);
  await singleBlog.save();
  res.status(201).json(savedComment);
} catch (error) {
    console.error(error);
}
}

export const getCommentsForPost = async (req:any,res:any)=>{

  try {
    const blogId = req.params.blogId;
    console.log('blogId',blogId);

    const comments = await Comment.find({ blog: blogId }).lean().populate('authorId');

    const formattedComments = comments.map(comment => ({
      ...comment,
      createdAt: moment(comment.createdAt).fromNow(), // Format the timestamp as "x minutes/hours/days ago"
    }));

    res.status(200).json(formattedComments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching comments' });
  }

}