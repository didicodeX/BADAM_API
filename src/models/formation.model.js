import mongoose from "mongoose";

const FormationSchema = new mongoose.Schema({
  titre: { type: String },
  description: { type: String },
  formateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  images: {
    type: [String],
  },
  videos: {
    type: [String],
  },
});

export const Formation = mongoose.model("Formation", FormationSchema);
