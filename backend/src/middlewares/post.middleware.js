import Post from "../models/Post.js";

export function hasAcces(req, res, next) {}

export async function validatePostExist(req, res, next) {
  try {
    const {postId, slug} = req.params
    
    if(!postId && !slug){
      const error = new Error("No se proporcionó un ID o slug");
      error.status=400;
      throw error
    }

    const query = postId ? {_id: postId} : {slug: slug}

    const post = await Post.findOne(query);

    if (!post) {
      const error = new Error("El post solicitado no existe");
      error.status = 404;
      throw error;
    }

    req.post = post;

    next();
  } catch (error) {
    console.error("[POST MIDDLEWARE]".error, `Error: ${error.message}`);
    next(error);
  }
}
