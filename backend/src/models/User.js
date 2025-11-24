import { Schema, model, Types } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      
    },
    lastName: {
      type: String,
      
    },
    username: {
      type: String,
      rqeuired: true,
      unique: true,
    },
    image: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    rol: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

const User = model("User", userSchema);

export default User;
