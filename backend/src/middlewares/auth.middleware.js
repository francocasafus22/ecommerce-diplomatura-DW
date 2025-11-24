import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function authMiddleware(req, res, next) {
  try {
    

    const token = req.cookies.AUTH_TOKEN;

    if (!token) {
      const error = new Error("Token no válido");
      error.status = 401;
      throw error;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof decoded === "object" && decoded.id) {
      req.user = await User.findById(decoded.id).select("-password -__v");
      if (!req.user) {
        const error = new Error("Usuario no encontrado");
        error.status = 404;
        throw error;
      }
      next();
    }
  } catch (e) {
    const error = new Error(e.message || "Token no válido");
    error.status = e.status || 401;
    next(error);
  }
}
