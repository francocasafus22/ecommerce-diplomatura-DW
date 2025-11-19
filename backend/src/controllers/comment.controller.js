import getAllCommentsByPost from "../services/comment.service.js";

export default class CommentController {
  static async getCommentsByPost(req, res, next) {
    try {
      const { postId } = req.params;
      const comments = await getAllCommentsByPost({ postId });

      res.json({ comments });
    } catch (error) {
      next(error);
    }
  }
}
