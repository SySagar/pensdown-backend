import mongoose from "mongoose";

const Blog = new mongoose.Schema({
  title: String,
  description: String,
  body: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model('Blog',Blog);