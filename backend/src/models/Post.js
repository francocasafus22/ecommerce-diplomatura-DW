import { Schema, model, Types } from "mongoose";
import slugify from "slugify";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    description: {
      type: String,
    },
    tags: [{ type: String }],
    images: [{ type: String }],
    body: {
      type: String,
      required: true,
    },

    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    authorAvatar: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["published", "draft", "archived"],
      default: "published",
    },
    likes: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  },
);

postSchema.pre("save", async function (next) {
  if (this.isModified("title") || !this.slug) {
    const baseSlug = slugify(this.title, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    const Post = this.constructor;
    while(await Post.findOne({slug})){
      slug = `${baseSlug}-${counter++}`;
    }

    this.slug = slug;
  }
  next();
});

const Post = model("Post", postSchema);

export default Post;
