import mongoose from "mongoose";

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 30,
  },
  respect: {
    type: Number,
    default: 0,
  },
  bio:{
    type: String,
    trim: true,
  },
  displayName: {
    type: String,
    trim: true,
    min: 3,
    max: 30,
  },
  email: {
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

export default mongoose.model('User',User);