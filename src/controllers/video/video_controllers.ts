/**
 * Video controllers
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Import statements for custom modules
import {CustomError} from "../../utils/error/custom_error"; // Custom error handling
import {Video} from "../../schemes/video/video_schema"; // Video schema

// Import statements for third-party modules
import {NextFunction, Request, Response} from "express"; // Express request, response, and next function types
import mongoose from "mongoose"; // Mongoose for MongoDB interactions

/**
 * Adds a new single video.
 * 
 * @async
 * @function addNewVideo
 * @param {Request} req - The request object containing video data.
 * @param {Response} res - The response object to send the result.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 * @throws {Error} - Throws an error if video creation fails.
 */
export const addNewVideo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Create a new video record using the request body and user ID
        const newVideo = await Video.create({
            account_id: req.account?.id, // User ID from the account
            title: req.body.title, // Title from request body
            description: req.body.description, // Description from request body
            img_url: `http://localhost:8090/images/${req?.savedImage}`, // Image URL
            video_url: `http://localhost:8090/videos/${req?.savedVideo}`, // Video URL
        });

        // Respond with the newly created video
        return res.status(201).json({message: "Your new video has been generated!", video: newVideo});
    } catch (err) {
        next(err); // Forward the error to the error handler
    };
};

/**
 * Retrieves a single video by its ID.
 * 
 * @async
 * @function getSingleVideo
 * @param {Request} req - The request object containing the video ID.
 * @param {Response} res - The response object to send the result.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 * @throws {CustomError} - Throws an error if video ID is missing or invalid.
 */
export const getSingleVideo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.params.videoId) {
            return next(new CustomError("Please provide a video id", 400)); // Error if no video ID is provided
        } else {
            if (!mongoose.Types.ObjectId.isValid(req.params.videoId)) {
                return next(new CustomError("Please provide a verified ID", 404)); // Error if video ID is invalid
            };
        };

        const video_id = req.params.videoId; // Set video ID
        const video = await Video.findById(video_id); // Find the video by ID

        if (!video) {
            return next(new CustomError("The video you are looking for could not be found.", 404)); // Error if video not found
        };

        return res.status(200).json({
            success: true,
            data: video // Return the retrieved video
        });

    } catch (err) {
        return next(err); // Forward error to the error handler
    };
};

/**
 * Updates a single video.
 * 
 * @async
 * @function updateSingleVideo
 * @param {Request} req - The request object containing the video ID and update data.
 * @param {Response} res - The response object to send the result.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 * @throws {CustomError} - Throws an error if the user is not authorized to update the video.
 */
export const updateSingleVideo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.params.videoId) {
            return next(new CustomError("Please provide a video id.", 400)); // Error if no video ID is provided
        } else {
            if (!mongoose.Types.ObjectId.isValid(req.params.videoId)) {
                return next(new CustomError("Please provide a verified id.", 400)); // Error if video ID is invalid
            };
        };

        const video = await Video.findById(req.params.videoId); // Find the video by ID

        if (!video) {
            return next(new CustomError("The video you are looking for could not be found.", 404)); // Error if video not found
        };

        const auth_account_id = req.account?.id?.toString(); // ID of the authenticated user
        const video_account_id = video.account_id.toString(); // ID of the video's owner

        if (auth_account_id === video_account_id) {
            const updatedVideo = await Video.findByIdAndUpdate(req.params.videoId, {
                $set: req.body // Update video data
            }, { new: true });

            return res.status(200).json({
                success: true,
                data: updatedVideo // Return the updated video
            });
        } else {
            return next(new CustomError("You can update only your account", 400)); // Error if user is not the owner
        }
    } catch (err) {
        return next(err); // Forward error to the error handler
    };
};

/**
 * Deletes a single video.
 * 
 * @async
 * @function deleteSingleVideo
 * @param {Request} req - The request object containing the video ID.
 * @param {Response} res - The response object to send the result.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 * @throws {CustomError} - Throws an error if the user is not authorized to delete the video.
 */
export const deleteSingleVideo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.params.videoId) {
            return next(new CustomError("Please provide a video id.", 400)); // Error if no video ID is provided
        } else {
            if (!mongoose.Types.ObjectId.isValid(req.params.videoId)) {
                return next(new CustomError("Please provide a verified id.", 400)); // Error if video ID is invalid
            };
        };

        const video = await Video.findById(req.params.videoId); // Find the video by ID

        if (!video) {
            return next(new CustomError("The video you are looking for could not be found.", 404)); // Error if video not found
        };

        const auth_account_id = req.account?.id?.toString(); // ID of the authenticated user
        const video_account_id = video.account_id.toString(); // ID of the video's owner

        if (auth_account_id === video_account_id) {
            await Video.findByIdAndDelete(req.params.videoId); // Delete the video

            return res.status(200).json({
                success: true,
                data: "Your video has been deleted." // Success message
            });

        } else {
            return next(new CustomError("You can delete only your video", 400)); // Error if user is not the owner
        };
    } catch (err) {
        return next(err); // Forward error to the error handler
    }
};

/**
 * Retrieves videos by user account ID.
 * 
 * @async
 * @function getVideosByAccount
 * @param {Request} req - The request object containing the account ID.
 * @param {Response} res - The response object to send the result.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const getVideosByAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const account_id = req.params.accountId; // Get the account ID from the request

        const videos = await Video.find({ account_id: account_id }); // Find videos by account ID

        return res.status(200).json({
            success: true,
            data: videos || [], // Return videos or an empty array
        });
    } catch (err) {
        return next(err); // Forward error to the error handler
    }
};

/**
 * Retrieves random videos.
 * 
 * @async
 * @function getRandomVideos
 * @param {Request} req - The request object.
 * @param {Response} res - The response object to send the result.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const getRandomVideos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }]); // Randomly select 40 videos
        res.status(200).json(videos); // Return the random videos
    } catch (err) {
        next(err); // Forward error to the error handler
    }
};

/**
 * Adds a view to a video.
 * 
 * @async
 * @function addViewToVideo
 * @param {Request} req - The request object containing the video ID.
 * @param {Response} res - The response object to send the result.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 * @throws {Error} - Throws an error if the view increment fails.
 */

export const addViewToVideo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Increment the view count for the specified video by 1
        await Video.findByIdAndUpdate(req.params.videoId, {
            $inc: { views: 1 } // Increment the views field
        });

        return res.status(200).json({
            success: true,
            message: "The view has been increased." // Success message
        });
    } catch (err) {
        // Handle any errors that occur during the update
        return next(err); // Forward the error to the error handler
    };
};

