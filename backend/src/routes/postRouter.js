import { Router } from "express";
import PostController from "../controllers/postController.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, PostController.getAllByUser);
router.post("/", authMiddleware, PostController.create);
router.put("/:postId", authMiddleware, PostController.edit);
router.delete("/:postId", authMiddleware, PostController.delete);

export default router;
