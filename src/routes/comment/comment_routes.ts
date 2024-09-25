/**
 * Comment routes
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Importing modules
import express from "express";

// Importing comment controllers
import {getComments, addNewComment, deleteComment} from "../../controllers/comment/comment_controllers";
import {hasAccess} from "../../middlewares/access/access";

// Defining the comment router
const commentRouter = express.Router({ mergeParams: true });

// Comment routes
commentRouter.get('/', getComments); // Retrieve comments for a video: GET http://localhost:PORT/api/video/:videoId/comments/
commentRouter.post('/', hasAccess, addNewComment); // Add a new comment: POST http://localhost:PORT/api/video/:videoId/comments/
commentRouter.delete('/:commentId', hasAccess, deleteComment); // Delete a comment by ID: DELETE http://localhost:PORT/api/video/:videoId/comments/:commentId

// Exporting the comment router
export default commentRouter;
