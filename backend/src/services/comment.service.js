import Comment from "../models/Comment.js";

export async function getAllCommentsByPost({ postId, userId }) {
  try {
    const comments = await Comment.find({ postId })
      .sort({ createdAt: -1 })
      .select("-__v -updatedAt")
      .lean();

    if (userId)
      return comments.map((comment) => ({
        ...comment,
        isOwner: comment.userId.toString() == userId.toString(),
      }));
    return comments.map((comment) => ({ ...comment, isOwner: false }));
  } catch (error) {
    console.error("[GET COMMENTS]".red.bold, `Error: ${error.message}`);
    next(error);
  }
}

export async function createComment({ user, postId, data }) {
  try {
    return await Comment.create({
      ...data,
      userId: user._id,
      authorName: user.username,
      authorAvatar: user.image || null,
      postId,
    });
  } catch (error) {
    console.error("[CREATE COMMENT]".red.bold, `Error: ${error.message}`);
    next(error);
  }
}

export async function editComment({ oldComment, newBody }) {
  try {
    oldComment.body = newBody;
    await oldComment.save();
  } catch (error) {
    console.error("[EDIT COMMENT]".red.bold, `Error: ${error.message}`);
    next(error);
  }
}
