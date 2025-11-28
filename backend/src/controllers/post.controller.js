import {
  createPost,
  editPost,
  findPostsByUser,
  deletePost,
  getAllPosts,
  like,
  
} from "../services/post.service.js";
import {checkPassword} from "../utils/auth.js"
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

  static async getAll(req,res,next){
    try {
      const {page=1, q=""} = req.query;
      

      const data = await getAllPosts({page : Number(page), q, userId: req.user?._id})

      res.json(data)

    } catch (error) {      
        next(error);
    }
  }

  static async getOne(req,res,next){
    try {    
      res.json(req.post)
    } catch (error) {
      next(error)
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
      const {password} = req.body;

      const {password : userPassword} = await User.findById(userId).select("password -_id");      
      const isCorrect = await checkPassword(password, userPassword)
      
      if(!isCorrect){
        const error = new Error("Password is not correct")
        error.status = 401;
        throw error
      }

      await deletePost({
        postData: req.post,
        userId,
      });

      res.json({ message: "Post eliminado correctamente" });
    } catch (error) {
      console.log("[ERROR DELETE POST]: ", error.message)      
      next(error);
    }
  }

  static async likePost(req,res,next){
    try {
      const {_id} = req.user;

      const {message, post} = await like({userId: _id, post: req.post})

      const likesCount = post?.likes.length || 0;
      const likedByUser = post?.likes.includes(_id) || false

      res.json({message, likesCount, likedByUser})
    } catch (error) {
      error.status = 400
      next(error)
    }
  }
}
