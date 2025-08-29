import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./Cloudinary"; 

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "lms-videos",
    resource_type: "video",
    format: async () => "mp4", // Ensuring only MP4 format
  } as { folder: string; resource_type: "video"; format: () => Promise<string> }, 
});

const upload = multer({ storage });

export default upload;
