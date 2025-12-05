import {
  getAllCommentsByPost,
  createComment,
  editComment,
} from "../services/comment.service.js";

export default class CommentController {
  static async getCommentsByPost(req, res, next) {
    try {
      const { postId } = req.params;
      const comments = await getAllCommentsByPost({
        postId,
        userId: req.user?._id,
      });

      res.json(comments);
    } catch (error) {
      console.log("[GET COMMENTS]".red.bold, " Error:", error.message);
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { postId } = req.params;

      const comment = await createComment({
        user: req.user,
        postId,
        data: req.body,
      });
      res.json({ message: "Comentario creado correctamente", comment });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const isOwner = req.user._id.toString() === req.comment.userId.toString();
      if (!isOwner) {
        const error = new Error(
          "You are not authorized to delete this comment",
        );
        error.status = 403;
        next(error);
        return;
      }

      await req.comment.deleteOne();

      res.json({ message: "Comment deleted successfully" });
    } catch (error) {
      console.log("[DELETE COMMENT] Error: ", error.message);
      next(error);
    }
  }

  static async edit(req, res, next) {
    try {
      const isOwner = req.user._id.toString() === req.comment.userId.toString();
      if (!isOwner) {
        const error = new Error("You are not authorized to edit this comment");
        error.status = 403;
        next(error);
        return;
      }

      await editComment({ oldComment: req.comment, newBody: req.body.body });

      res.json({ message: "Comment edited successfully" });
    } catch (error) {
      console.log("[EDIT COMMENT] Error: ", error.message);
      next(error);
    }
  }
}
