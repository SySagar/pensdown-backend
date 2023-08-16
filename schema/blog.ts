import mongoose from "mongoose";

const Blog = new mongoose.Schema({
  title: String,
  description: String,
  date: {
    type: String,
    default: Date.now,
  },
  body: String,
  authorName: String,
  likes: Number,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model('Blog',Blog);