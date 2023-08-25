import Blog from "../schema/blog";
import {saveBlogToDB,deleteBlogFromDB,getAllBlogsFromDB} from '../repository/blog';
import moment from 'moment';
import {searchUserByEmail} from '../repository/auth'
import {blogTypes,jsonResTypes,getBlogjsonResTypes} from "./types/blogTypes";
import {sortblogsByDate} from "../utils/sort";

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
      likes:10  ,
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