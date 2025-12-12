import slugify from "slugify";
import User from "../models/User.js";
import { hashPassword } from "../utils/auth.js";
import { checkPassword } from "../utils/auth.js";
import { createToken } from "../utils/jwt.js";

export async function editProfile({ data, user }) {
  try {
    const userExist = await User.findOne({ username: data.username });
    if (userExist) {
      const error = new Error("The username is unavailable");
      error.status = 403;
      throw error;
    }
    const forbiddenField = ["_id", "rol", "password"];
    forbiddenField.forEach((field) => delete data[field]);

    Object.assign(user, data);

    await user.save();

    return user.username;
  } catch (error) {
    console.error("[EDIT PROFILE]".error, `Error: ${error.message}`);
    throw error;
  }
}

export async function loginService(email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("No existe ningún usuario con ese email");
    error.status = 404;
    throw error;
  }

  const passwordCorrect = await checkPassword(password, user.password);

  if (!passwordCorrect) {
    const error = new Error("Contraseña incorrecta");
    error.status = 401;
    throw error;
  }

  const token = createToken({ id: user._id });

  return { token };
}

export async function registerService({ email, password, username }) {
  const userExist = await User.findOne({ email });

  if (userExist) {
    const error = new Error("El email ya está en uso");
    error.status = 409;
    throw error;
  }

  const userSlug = slugify(username, { lower: true, strict: true });

  const usernameExist = await User.findOne({ username: userSlug });
  if (usernameExist) {
    const error = new Error("El nombre de usuario ya está en uso");
    error.status = 409;
    throw error;
  }

  const hashedPassword = await hashPassword(password);

  await User.create({
    email,
    username: userSlug,
    password: hashedPassword,
  });
}
