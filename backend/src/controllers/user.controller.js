import User from "../models/User.js";
import {
  loginService,
  registerService,
  editProfile,
} from "../services/user.service.js";
import formidable from "formidable";
import cloudinary from "../config/cloudinary.js";
import { v4 as uuid } from "uuid";

export default class userController {
  static async getAll(req, res) {
    try {
      const users = await User.find().select("-password -__v");
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error al obtener los usuarios" });
    }
  }

  static async getUser(req, res, next) {
    try {
      res.json(req.user);
    } catch (error) {
      next(error);
    }
  }

  static async getProfile(req, res, next) {
    try {
      const { username } = req.params;

      const user = await User.findOne({ username }).select(
        "-password -__v -rol",
      );
      if (!user) {
        const error = new Error("No existe el usuario consultado");
        error.status = 404;
        throw error;
      }

      const isOwner = req.user ? req.user._id.equals(user._id) : false;

      res.json({ user, isOwner });
    } catch (error) {
      next(error);
    }
  }

  static async edit(req, res, next) {
    try {
      const username = await editProfile({ data: req.body, user: req.user });
      res.json({ message: "Perfil editado correctaments", username });
    } catch (error) {
      next(error);
    }
  }

  static async editProfileImage(req, res, next) {
    try {
      const form = formidable({ multiples: false });
      form.parse(req, (err, fields, files) => {
        if (err) {
          const error = new Error("Error parsing form");
          error.status(400);
          return next(error);
        }
        const file = files.image?.[0];
        if (!file) {
          const error = new Error("No image uploaded");
          error.status = 400;
          return next(error);
        }

        cloudinary.uploader.upload(
          file.filepath,
          { public_id: uuid() },
          async function (error, result) {
            if (error) {
              const error = new Error("Error uploading image");
              error.status = 500;
              return next(error);
            }
            if (result) {
              req.user.image = result.secure_url;
              await req.user.save();
              res.json({ message: "Profile image uploaded" });
            }
          },
        );
      });
    } catch (error) {
      next(error);
    }
  }

  static async editProfileBanner(req, res, next) {
    try {
      const form = formidable({ multiples: false });
      form.parse(req, (err, fields, files) => {
        if (err) {
          const error = new Error("Error parsing form");
          error.status(400);
          return next(error);
        }
        const file = files.banner?.[0];
        if (!file) {
          const error = new Error("No image uploaded");
          error.status = 400;
          return next(error);
        }

        cloudinary.uploader.upload(
          file.filepath,
          { public_id: uuid() },
          async function (error, result) {
            if (error) {
              const error = new Error("Error uploading image");
              error.status = 500;
              return next(error);
            }
            if (result) {
              req.user.banner = result.secure_url;
              await req.user.save();
              res.json({ message: "Profile banner uploaded" });
            }
          },
        );
      });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { email, password, username } = req.body;

      await registerService({
        email,
        password,
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
        sameSite: "none",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ message: "Iniciaste sesión correctamente" });
    } catch (error) {
      next(error);
    }
  }
  static async logout(req, res, next) {
    try {
      res.clearCookie("AUTH_TOKEN", {
        httpOnly: true,
        sameSite: "lax",
      });
      res.json({ message: "Cerraste sesión correctamente" });
    } catch (error) {
      next(error);
    }
  }
}
