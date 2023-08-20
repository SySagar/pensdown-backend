import Blog from "../schema/blog";
import {saveBlogToDB,deleteBlogFromDB} from '../repository/blog';
import moment from 'moment';
import {searchUserByEmail} from '../repository/auth'

interface jsonResTypes {
    message: string;
    status: number;
}

interface blogTypes {
  title: string;
  description: string;
  content: string;
  id: string;
  date: String;
  authorName: String;
  likes: Number;
}

export const createBlog = async (req: any, res: any) => {
  const { title, content,id,authorName} =
    req.body as unknown as blogTypes;

    const date = moment().format("dddd, MMMM Do") as unknown as String;
    const user = req.user;

  try {
    const blog = new Blog({
      title,
      content,
      author:id,
      authorName,
      date,
      likes:10  
    });

    const jsonRes = {} as jsonResTypes;
    const isSavedToDB = await saveBlogToDB(blog)
    

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
