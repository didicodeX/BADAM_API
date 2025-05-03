import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.config.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith("video/");
    // Utilise query au lieu de body
    const folderType = req.query.folderType;

    console.log("folderType (via query) :", folderType);
    let folder = "projects/BADAM/others"; // par défaut
    if (folderType === "avatar") {
      folder = "projects/BADAM/avatars";
    } else if (folderType === "Training") {
      folder = "projects/BADAM/Trainings";
    }

    return {
      folder,
      format: isVideo ? "mp4" : "png",
      public_id: `${Date.now()}-${file.originalname}`,
      resource_type: isVideo ? "video" : "image",
    };
  },
});

// Middleware Multer
export const upload = multer({ storage });
