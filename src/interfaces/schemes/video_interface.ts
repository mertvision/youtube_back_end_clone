/**
 * Video interface
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Importing third party modules
import mongoose, {Document} from "mongoose"; // Importing mongoose and Document from mongoose

// Video interface extending Mongoose Document
export interface VideoInterface extends Document {
    /**
     * Reference to the account that uploaded the video.
     * This should be an ObjectId from the Account collection.
     */
    account_id: mongoose.Schema.Types.ObjectId;

    /**
     * Title of the video.
     */
    title: string;

    /**
     * Description of the video content.
     */
    description: string;

    /**
     * URL of the thumbnail image for the video.
     */
    img_url: string;

    /**
     * URL where the video is hosted.
     */
    video_url: string;

    /**
     * Number of views the video has received.
     */
    views: number;

    /**
     * Array of tags associated with the video for categorization.
     */
    tags: string[];

    /**
     * Array of user IDs who liked the video.
     */
    likes: string[];

    /**
     * Array of user IDs who disliked the video.
     */
    dislikes: string[];

    /**
     * Indicates whether comments are closed for this video.
     */
    comments_closed: boolean;
};

