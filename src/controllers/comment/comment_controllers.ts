/**
 * Comment controllers
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Importing custom modules
import {CustomError} from "../../utils/error/custom_error"; // Custom error handling
import {Comment} from "../../schemes/comment/comment_schema"; // Comment schema

// Importing third party modules
import {Request, Response, NextFunction} from "express"; // Express request, response, and next function types
import mongoose from "mongoose"; // Mongoose for MongoDB interactions

/**
 * Retrieves comments for a specific video.
 * 
 * @async
 * @function getComments
 * @param {Request} req - The request object containing the video ID.
 * @param {Response} res - The response object to send the result.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 * @throws {CustomError} - Throws an error if the video ID is not provided or is invalid.
 */
export const getComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.params.videoId) {
            return next(new CustomError("Please provide a video id", 400)); // Error if no video ID is provided
        };

        if (!mongoose.Types.ObjectId.isValid(req.params.videoId)) {
            return next(new CustomError("Please provide a verified video id", 400)); // Error if video ID is invalid
        };

        const comments = await Comment.find({ video_id: req.params.videoId }); // Retrieve comments for the video

        if (!comments) {
            return res.status(200).json({
                success: true,
                data: [] // Return empty array if no comments are found
            });
        };

        return res.status(200).json({
            success: true,
            data: comments // Return retrieved comments
        });
    } catch (err) {
        return next(err); // Forward error to the error handler
    };
};

/**
 * Adds a new comment to a specific video.
 * 
 * @async
 * @function addNewComment
 * @param {Request} req - The request object containing video ID and comment description.
 * @param {Response} res - The response object to send the result.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 * @throws {CustomError} - Throws an error if any required fields are missing or invalid.
 */
export const addNewComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const auth_account_id = req.account?.id; // ID of the authenticated user
        let video_id: string | undefined;
        let description: string | undefined;

        if (!req.params.videoId) {
            return next(new CustomError("Please provide a video id", 400)); // Error if no video ID is provided
        };

        if (!mongoose.Types.ObjectId.isValid(req.params.videoId)) {
            return next(new CustomError("Please provide a verified video id", 400)); // Error if video ID is invalid
        };

        if (!req.body.description) {
            return next(new CustomError("Please provide a description", 400)); // Error if no description is provided
        };

        video_id = req.params.videoId; // Set video ID
        description = req.body.description; // Set comment description

        const comment = await Comment.create({
            account_id: auth_account_id, // Set account ID
            video_id: video_id, // Set video ID
            description: description, // Set comment description
            edited: false // Initial state for the comment
        });

        await comment.save(); // Save the new comment

        return res.status(200).json({
            success: true,
            comment // Return the newly created comment
        });
    } catch (err) {
        return next(err); // Forward error to the error handler
    }
};

/**
 * Deletes a specific comment.
 * 
 * @async
 * @function deleteComment
 * @param {Request} req - The request object containing the comment ID.
 * @param {Response} res - The response object to send the result.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 * @throws {CustomError} - Throws an error if the comment ID is missing or invalid.
 */
export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const auth_account_id = req.account?.id; // ID of the authenticated user
        let comment_id: string | undefined;

        if (!req.params.commentId) {
            return next(new CustomError("Please provide a comment id.", 400)); // Error if no comment ID is provided
        };

        if (!mongoose.Types.ObjectId.isValid(req.params.commentId)) {
            return next(new CustomError("Please provide a verified comment id.", 400)); // Error if comment ID is invalid
        };

        comment_id = req.params.commentId; // Set comment ID

        const comment = await Comment.findById(comment_id); // Find the comment by ID

        if (!comment) {
            return res.status(200).json({
                success: true,
                message: "Comment couldn't be find." // Message if comment is not found
            });
        };

        if (String(comment.account_id) === String(auth_account_id)) {
            await Comment.findByIdAndDelete(comment_id); // Delete the comment if the user is the owner
            return res.status(200).json({
                success: true,
                message: "Your comment has been deleted." // Success message
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "You cannot delete this comment." // Error if user is not the owner
            });
        }
    } catch (err) {
        return next(err); // Forward error to the error handler
    };
};
