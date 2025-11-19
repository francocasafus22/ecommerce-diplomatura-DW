import {
  createPost,
  editPost,
  findPostsByUser,
  deletePost,
} from "../services/post.service.js";
import User from "../models/User.js";

export default class PostController {
  static async getAllByUsername(req, res, next) {
    try {
      const { username } = req.params;
      const user = await User.findOne({ username }).select("-password -__v");
      if (!user) {
        const error = new Error("El usuario no existe");
        error.status = 404;
        throw error;
      }

      const posts = await findPostsByUser({ userId: user._id });
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
      await editPost({
        data: req.body,
        userId: req.user._id,
        post: req.post,
      });
      res.json({ message: "Post actualizado correctamente" });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const userId = req.user._id;

      await deletePost({
        postData: req.post,
        userId,
      });

      res.json({ message: "Post eliminado correctamente" });
    } catch (error) {
      next(error);
    }
  }
}
