import { Router } from "express";
import CommentController from "../controllers/comment.controller.js";
import { param } from "express-validator";
import errorInputHandler from "../middlewares/validation.middleware.js";
import authMiddleware, {
  optionalAuthMiddleware,
} from "../middlewares/auth.middleware.js";
import { validatePostExist } from "../middlewares/post.middleware.js";
import { validateCommentExist } from "../middlewares/comment.middleware.js";

const router = Router();

router.get(
  "/:postId",
  param("postId").isMongoId().withMessage("El ID no es válido"),
  errorInputHandler,
  validatePostExist,
  optionalAuthMiddleware,
  CommentController.getCommentsByPost,
);

router.post(
  "/:postId",
  param("postId").isMongoId().withMessage("El ID no es válido"),
  errorInputHandler,
  authMiddleware,
  CommentController.create,
);

router.delete(
  "/:commentId",
  param("commentId").isMongoId().withMessage("Id is invalid"),
  errorInputHandler,
  authMiddleware,
  validateCommentExist,
  CommentController.delete,
);
router.put(
  "/:commentId",
  param("commentId").isMongoId().withMessage("Id is invalid"),
  errorInputHandler,
  authMiddleware,
  validateCommentExist,
  CommentController.edit,
);

export default router;
