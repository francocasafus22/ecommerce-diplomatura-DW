import Post from "../models/Post.js";
import colors from "../config/colors.js";

export async function findPostsByUser(id) {
  const posts = await Post.find({ "author.userId": id });
  return posts;
}

export async function createPost(postData, user) {
  try {
    await Post.create({
      ...postData,
      author: {
        userId: user._id,
        authorName: user.username,
        authorAvatar: user.image || null,
      },
    });
  } catch (err) {
    console.error("[CREATE POST]".red.bold, `Error: ${err.message}`);
    throw err;
  }
}

export async function editPost({ postData, userId, postId }) {
  try {
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("El post solicitado no existe");
      error.status = 404;
      throw error;
    }

    if (!post.author.userId.equals(userId)) {
      const error = new Error("No tienes acceso al post");
      error.status = 403;
      throw error;
    }

    // Eliminar campos no permitidos para editar
    const forbiddenFields = ["_id", "author"];
    const updateData = { ...postData };
    forbiddenFields.forEach((field) => delete updateData[field]);

    await Post.updateOne({ _id: postId }, updateData);
  } catch (err) {
    console.error("[EDIT POST]".red.bold, `Error: ${err.message}`);
    throw err;
  }
}

export async function deletePost({ postId, userId }) {
  try {
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("El post solicitado no existe");
      error.status = 404;
      throw error;
    }

    if (!post.author.userId.equals(userId)) {
      const error = new Error("No tienes acceso al post");
      error.status = 403;
      throw error;
    }

    await Post.deleteOne({ _id: postId });
  } catch (err) {
    console.error("[DELETE POST]".red.bold, `Error: ${err.message}`);
    throw err;
  }
}
