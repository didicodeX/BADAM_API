import mongoose from "mongoose";

const FormationSuivieSchema = new mongoose.Schema({
  
  dateInscription: { type: Date, default: Date.now },
  statut: {
    type: String,
    enum: ['en cours', 'terminée', 'abandonnée', 'en pause'],
    default: 'en cours'
  },
  user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true,
          },
  sessioFormation: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "SessionFormation",
                    require: true,
                  },
});

export const FormationSuivie = mongoose.model("FormationSuivie", FormationSuivieSchema);
