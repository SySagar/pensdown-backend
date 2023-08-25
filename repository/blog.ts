import blog from "../schema/blog";
import User from "../schema/user";

export const saveBlogToDB = async (blog: any,authorID:any) => {
  try {
    await blog.save();

    await User.updateOne(
      { _id: authorID },
      { $push: { blogs: blog._id } }
    )

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};


export const deleteBlogFromDB = async (blog_id:Number)=>{
    try {
        await blog.deleteOne({_id:blog_id})
        return true;
    } catch (error) {
        console.log("error");
        return false;
    }
}

export const getAllBlogsFromDB = async ()=>{
    try {
        const blogs = await blog.find();
        return blogs;
    } catch (error) {
        console.log("error");
        return false;
    }
}