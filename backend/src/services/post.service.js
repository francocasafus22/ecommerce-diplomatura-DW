import Post from "../models/Post.js";

export async function findPostsByUser({ userId }) {
  const posts = await Post.find({ userId: userId });
  return posts;
}

export async function createPost(postData, user) {
  try {
    await Post.create({
      ...postData,
      userId: user._id,
      authorName: user.username,
      authorAvatar: user.image || null,
    });
  } catch (err) {
    console.error("[CREATE POST]".red.bold, `Error: ${err.message}`);
    throw err;
  }
}

export async function editPost({ data, userId, post }) {
  try {
    if (!post.author.userId.equals(userId)) {
      const error = new Error("No tienes acceso al post");
      error.status = 403;
      throw error;
    }

    // Eliminar campos no permitidos para editar
    const forbiddenFields = ["_id", "author"];
    const updateData = { ...data };
    forbiddenFields.forEach((field) => delete updateData[field]);

    await post.updateOne(updateData);
  } catch (err) {
    console.error("[EDIT POST]".red.bold, `Error: ${err.message}`);
    throw err;
  }
}

export async function deletePost({ postData, userId }) {
  try {
    await postData.deleteOne();

    // TODO: MIDDLEWARE HAS ACCESS
  } catch (err) {
    console.error("[DELETE POST]".red.bold, `Error: ${err.message}`);
    throw err;
  }
}
