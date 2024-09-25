/**
 * Upload middleware that using multer package
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

import multer, { StorageEngine, FileFilterCallback } from "multer"; // Importing multer for file uploads and necessary types
import path from "path"; // Importing path module for handling file paths
import { Request } from "express"; // Importing Request type from express

// Extend the Request interface to include custom properties for uploaded files
interface CustomRequest extends Request {
  savedImage: string; // Property to hold the name of the saved image
  savedVideo: string; // Property to hold the name of the saved video
}

// Configure storage for uploaded files
const storage: StorageEngine = multer.diskStorage({
  // Define the destination for uploaded files based on the field name
  destination: function (req: CustomRequest, file, cb) {
    // Get the root directory of the project
    const rootDir = path.dirname(require.main!.filename);
    
    // Set the destination path for images or videos
    if (file.fieldname === "image") {
      cb(null, path.join(__dirname, "../", "../", "../", "public/images")); // Destination for images
    } else if (file.fieldname === "file") {
      cb(null, path.join(__dirname, "../", "../", "../", "public/videos")); // Destination for videos
    }
  },

  // Define the filename for the uploaded files
  filename: function (req: CustomRequest, file, cb) {
    // Extract the file extension from the MIME type
    const extension = file.mimetype.split("/")[1];
    
    // Generate a unique filename based on the field name and current timestamp
    if (file.fieldname === "image") {
      req.savedImage = `image_${Date.now()}.${extension}`; // Save the image filename to the request object
      cb(null, req.savedImage); // Callback with the generated filename
    } else if (file.fieldname === "file") {
      req.savedVideo = `video_${Date.now()}.${extension}`; // Save the video filename to the request object
      cb(null, req.savedVideo); // Callback with the generated filename
    }
  },
});

// Define a file filter to restrict file types
const fileFilter = (req: CustomRequest, file: Express.Multer.File, cb: FileFilterCallback) => {
  // Check the file type based on the field name
  if (file.fieldname === "image") {
    // Allow only JPG or JPEG image formats
    if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
      cb(null, true); // Accept the file
    } else {
      cb(null, false); // Reject the file
    }
  } else if (file.fieldname === "file") {
    // Allow only MP4 video format
    if (file.mimetype === "video/mp4") {
      cb(null, true); // Accept the file
    } else {
      cb(null, false); // Reject the file
    }
  }
};

// Export the multer configuration for file uploads
export const uploadFile = multer({ storage, fileFilter });
