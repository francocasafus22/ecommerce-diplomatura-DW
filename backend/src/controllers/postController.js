import {
  createPost,
  editPost,
  findPostsByUser,
  deletePost,
} from "../services/postService.js";

export default class PostController {
  static async getAllByUser(req, res, next) {
    try {
      const posts = await findPostsByUser(req.user._id);
      res.json({ posts });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      await createPost(req.body, req.user);
      res.status(201).json({ message: "Post creado correctamente" });
    } catch (error) {
      next(error);
    }
  }

  static async edit(req, res, next) {
    try {
      const { postId } = req.params;

      await editPost({
        postData: req.body,
        userId: req.user._id,
        postId,
      });
      res.json({ message: "Post actualizado correctamente" });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { postId } = req.params;
      const userId = req.user._id;

      await deletePost({
        postId,
        userId,
      });

      res.json({ message: "Post eliminado correctamente" });
    } catch (error) {
      next(error);
    }
  }
}
