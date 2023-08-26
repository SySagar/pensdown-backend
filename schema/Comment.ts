import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  comment: String,
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model
  blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }, // Reference to the Blog model
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Comment', CommentSchema);