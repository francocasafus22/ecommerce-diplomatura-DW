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

export async function getAllPosts({page = 1, q="", userId}){
  try {
    
    const limit = 10;
    const skip = (page - 1) * limit

    const posts = await Post.aggregate([
      {
        $match: {title: {$regex: q, $options: "i"}}
      },
      {$skip: skip},
      {$limit: limit},
      {
        $addFields: {
          likesCount: {$size: "$likes"},
          likedByUser: {$in: [userId, "$likes"]}
        }
      },
      {$project:{
        likes:0
      }}
    ])
    const total = await Post.countDocuments()

    return {
      posts,
      page,
      total,
      totalPages: Math.ceil(total / limit)
    }

  } catch (error) {
    console.error("[GET ALL POSTS]".red.bold, `Error: ${error.message}`);
    throw error;
  }
}

export async function like({userId, post}){
  try {
    if(post.likes.includes(userId)){
      post.likes = post.likes.filter(id=>id.toString() !== userId.toString())
      await post.save()
      return {message: "Post unliked successfully", post}
    }

    post.likes.push(userId)
    await post.save()

    return {post, message: "Post liked successfully"}
  } catch (error) {
    console.error("[POST LIKE]".red.bold, `Error: ${error.message}`)
    throw error
  }
}