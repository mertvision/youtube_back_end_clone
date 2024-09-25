/**
 * Video schema
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Importing our custom interface
import {VideoInterface} from "../../interfaces/schemes/video_interface";

// Importing third party modules
import mongoose, {Schema} from "mongoose";

// Schema definition for the Video model
const VideoSchema: Schema<VideoInterface> = new Schema({
  account_id: {
    type: mongoose.Schema.ObjectId,
    required: true, // ID of the user who uploaded the video
    ref: "Account"
  },
  title: {
    type: String,
    required: true, // Title of the video
  },
  description: {
    type: String,
    required: true, // Description of the video content
  },
  img_url: {
    type: String,
    required: true, // URL for the video thumbnail image
  },
  video_url: {
    type: String,
    required: true, // URL for the actual video file
  },
  views: {
    type: Number,
    default: 0, // Default number of views
  },
  tags: {
    type: [String],
    default: [] // Tags associated with the video
  },
  likes: {
    type: [String],
    default: [] // User IDs of those who liked the video
  },
  dislikes: {
    type: [String],
    default: [] // User IDs of those who disliked the video
  },
  comments_closed: {
    type: Boolean,
    default: false, // Indicates if comments are closed for this video
  },
}, { timestamps: true }); // Automatically manage createdAt and updatedAt timestamps

// Export the Video model based on the Video schema
export const Video = mongoose.model<VideoInterface>('Video', VideoSchema);

