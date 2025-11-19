import Comment from "../models/Comment.js";

export default async function getAllCommentsByPost({ postId }) {
  try {
    return await Comment.find({ postId });
  } catch (error) {
    console.error("[GET COMMENTS]".red.bold, `Error: ${error.message}`);
    next(error);
  }
}
