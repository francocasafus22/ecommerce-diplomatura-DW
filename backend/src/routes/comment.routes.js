import { Router } from "express";
import CommentController from "../controllers/comment.controller.js";

const router = Router();

router.get("/:postId", CommentController.getCommentsByPost);

export default router;
