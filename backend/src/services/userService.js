import User from "../models/user.js";
import { hashPassword } from "../utils/auth.js";

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

export async function registerService({
  email,
  password,
  firstName,
  lastName,
  dni,
}) {
  const userExist = await User.findOne({ $or: [{ email }, { dni }] });

  if (userExist) {
    const error = new Error(
      userExist.email == email
        ? "El email ya está en uso"
        : "El DNI ya está en uso",
    );
    error.status = 409;
    throw error;
  }

  const hashedPassword = await hashPassword(password);

  await User.create({
    email,
    password: hashedPassword,
    dni,
    firstName,
    lastName,
  });
}
