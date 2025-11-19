import { Schema, model, Types } from "mongoose";

const commentSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    authorAvatar: {
      type: String,
      default: null,
    },

    body: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    postId: {
      required: true,
      type: Types.ObjectId,
      ref: "Post",
    },
  },
  {
    timestamps: true,
  },
);

const Comment = model("Comment", commentSchema);

export default Comment;
