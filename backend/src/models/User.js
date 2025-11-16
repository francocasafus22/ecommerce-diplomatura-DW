import { Schema, model, Types } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    favourite_products: [
      {
        type: Types.ObjectId,
        ref: "Product",
      },
    ],
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dni: {
      type: Number,
      required: true,
    },
    rol: {
      type: String,
      default: "user",
    },
    direcciones: [
      {
        calle: String,
        numero: String,
        ciudad: String,
        provincia: String,
        codigoPostal: String,
        principal: {
          type: Boolean,
          default: false,
        },
      },
    ],
    historial_compras: [
      {
        orderId: {
          type: Types.ObjectId,
          ref: "Order",
        },
        total: Number,
        fecha: Date,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const User = model("User", userSchema);

export default User;
