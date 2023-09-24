import mongoose from "mongoose";

const Blog = new mongoose.Schema({
  title: String,
  date: {
    type: String,
    default: Date.now,
  },
  content: String,
  authorName: String,
  tags: [String],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  coverImageURL: String,
  authorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model('Blog',Blog);