import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import commentRouter from "./routes/comment.routes.js";
import colors from "./config/colors.js";

import {
  errorHandler,
  loggerMiddleware,
} from "./middlewares/logger.middleware.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use(loggerMiddleware);

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server en http://localhost:${PORT}`.info);
});
