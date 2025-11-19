import { Router } from "express";
import PostController from "../controllers/post.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { validatePostExist } from "../middlewares/post.middleware.js";

const router = Router();

router.get("/user/:username", PostController.getAllByUsername);
router.post("/", authMiddleware, PostController.create);
router.put("/:postId", authMiddleware, validatePostExist, PostController.edit);
router.delete(
  "/:postId",
  authMiddleware,
  validatePostExist,

  PostController.delete,
);

export default router;
