import mongoose from "mongoose";

const FormationSchema = new mongoose.Schema({
  titre: { type: String },
  description: { type: String },
  adressFormation: { type: String },
  formateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  nbvues: { type: Number },
  
  media: {
    type: [String],
  },
});

export const Formation = mongoose.model("Formation", FormationSchema);
