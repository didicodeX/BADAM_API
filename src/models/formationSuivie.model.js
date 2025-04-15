import mongoose from "mongoose";

const FormationSuivieSchema = new mongoose.Schema({
  dateInscription: { type: Date, default: Date.now },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  sessionFormation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SessionFormation",
    require: true,
  },
});

export const FormationSuivie = mongoose.model(
  "FormationSuivie",
  FormationSuivieSchema
);
