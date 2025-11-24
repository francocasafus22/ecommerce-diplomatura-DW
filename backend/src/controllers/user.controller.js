import User from "../models/User.js";
import {
  loginService,
  registerService,
  editProfile,
} from "../services/user.service.js";

export default class userController {
  static async getAll(req, res) {
    try {
      const users = await User.find().select("-password -__v");
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error al obtener los usuarios" });
    }
  }

  static async getUser(req,res,next){
    try{
      res.json(req.user)
    }catch (error) {
      next(error);
    }
  }

  static async getProfile(req, res, next) {
    try {
      const { username } = req.params;

      const user = await User.findOne({ username }).select(
        "-password -__v -_id -rol",
      );
      if (!user) {
        const error = new Error("No existe el usuario consultado");
        error.status = 404;
        throw error;
      }
      const isOwner = req.user._id === user._id;

    
      res.json({ user, isOwner });
    } catch (error) {
      next(error);
    }
  }

  static async edit(req, res, next) {
    try {
      await editProfile({ data: req.body, user: req.user });

      res.json({ message: "Perfil editado correctaments" });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res) {
    try {
      const { email, password, firstName, lastName, dni, username } = req.body;

      await registerService({
        email,
        password,
        firstName,
        lastName,
        dni,
        username,
      });

      res.status(201).json({ message: "Usuario registrado correctamente" });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const { token } = await loginService(email, password);

      res.cookie("AUTH_TOKEN", token, {
        httpOnly: true,        
        sameSite: "lax",
        maxAge: 7*24*60*60*1000
      })
      
      res.json({message: "Iniciaste sesión correctamente"})
      
    } catch (error) {
      
      next(error);
    }
  }
  static async logout(req,res,next){
    try{
      res.clearCookie("AUTH_TOKEN", {
        httpOnly: true,
        sameSite: "lax"
      })
      res.json({message: "Cerraste sesión correctamente"})
    } catch(error){
      next(error)
    }
  }
}
