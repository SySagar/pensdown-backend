import blog from "../schema/blog";

export const saveBlogToDB = async (blog: any) => {
  try {
    console.log(blog);
    await blog.save();
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