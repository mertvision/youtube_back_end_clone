/**
 * Comment schema
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Importing our custom interface
import {CommentInterface} from "../../interfaces/schemes/comment_interface";

// Importing third party modules
import mongoose, {Schema} from "mongoose";

// Schema definition for the Comment model
const CommentSchema: Schema<CommentInterface> = new Schema({
  account_id: {
    type: mongoose.Schema.ObjectId,
    required: true, // ID of the user who made the comment
    ref: "Account"
  },
  video_id: {
    type: mongoose.Schema.ObjectId,
    required: true, // ID of the video the comment is associated with
    ref: "Video"
  },
  description: {
    type: String,
    required: true, // Content of the comment
  },
  edited: {
    type: Boolean,
    default: false, // Indicates whether the comment has been edited
  }
});

// Export the Comment model based on the Comment schema
export const Comment = mongoose.model<CommentInterface>('Comment', CommentSchema);
