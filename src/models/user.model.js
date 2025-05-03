import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String },
    avatar: { type: String },
    bio: { type: String },
    phone: { type: String },
    roles: {
      type: [String],
      enum: ["apprentice", "instructor", "admin", "superAdmin"],
      default: ["apprentice"],
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", UserSchema);
