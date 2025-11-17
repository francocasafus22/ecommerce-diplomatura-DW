import User from "../models/User.js";
import { loginService, registerService } from "../services/userService.js";
import { logger } from "../config/winston.js";

export default class userController {
  static async getAll(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error al obtener los usuarios" });
    }
  }

  static async register(req, res) {
    try {
      const { email, password, firstName, lastName, dni } = req.body;

      await registerService({ email, password, firstName, lastName, dni });

      res.status(201).json({ message: "Usuario registrado correctamente" });
    } catch (error) {
      logger.error(error);
      res
        .status(error.status || 500)
        .json({ error: error.message || "Error interno del servidor" });
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const { token } = await loginService(email, password);

      res.json({ token });
    } catch (error) {
      next(error);
    }
  }
}
