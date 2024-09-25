/**
 * Custom error handler middleware
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Importing our custom modules
import {CustomError} from '../../utils/error/custom_error'; // Importing a custom error class for structured error handling
// Importing third party modules
import {Request, Response, NextFunction} from 'express'; // Importing types from express

// Middleware function to handle custom errors in the application
export const customErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // Initialize the customError variable with the original error
    let customError = err;

    // Check the type of error and create a CustomError instance accordingly
    if (err.name === 'SyntaxError') {
        // Handle syntax errors with a specific message and a 400 status code
        customError = new CustomError('Unexpected Syntax', 400);
    } else if (err.name === 'ValidationError') {
        // Handle validation errors by using the error's message and setting a status code of 400
        customError = new CustomError(err.message, 400);
    } else if (err.code === 11000) {
        // Handle MongoDB duplicate key errors with a specific message and a 400 status code
        customError = new CustomError('Duplicate Key Found: Check Your Input', 400);
    };

    // Send the error response with the appropriate status code and message
    res.status(customError.status || 500).json({
        success: false, // Indicates that the request was not successful
        message: customError.message // Error message to be included in the response
    });
};
