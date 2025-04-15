import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  role: {
    type: [String],
    enum: ["apprenti", "formateur", "admin", "superAdmin"],
    default: "apprenti",
  },

  location: {
    address: { type: String },
    city: { type: String },
    province: { type: String },
    country: { type: String },
    postalCode: { type: String },
  },
});

export const User = mongoose.model("User", UserSchema);
