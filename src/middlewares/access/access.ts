/**
 * Get access middleware
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Importing our custom modules
import {CustomError} from "../../utils/error/custom_error"; // Importing a custom error class for error handling

// Importing third party modules
import {Request, Response, NextFunction} from "express"; // Importing types from express
import jwt from "jsonwebtoken"; // Importing the jsonwebtoken library for token handling

/* 
User authentication middleware. 
This function checks if the user is authenticated 
by verifying the JWT token present in the cookies.
After successful authentication, the user can perform actions related to their account.
*/
export const hasAccess = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Retrieve the JWT token from the cookies
        const token = req.cookies.access_token;

        // Check if the token is missing
        if (!token) {
            return next(new CustomError("Please provide a token or authenticate.", 401)); // Respond with an error if no token is provided
        };

        // Ensure the token is a string
        if (typeof token !== 'string') {
            return next(new CustomError("Invalid token format.", 400)); // Respond with an error if the token format is incorrect
        };

        // Retrieve the JWT secret key from environment variables
        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

        // Verify the JWT token using the secret key
        jwt.verify(token, JWT_SECRET_KEY, (err: any, result: any) => {
            if (err) {
                return next(err); // Pass the error to the next middleware if verification fails
            };

            // Attach user account details to the request object for later use
            req.account = {
                id: result.id,
                first_name: result.first_name,
            };

            next(); // Proceed to the next middleware if authentication is successful
        });
    } catch (err) {
        return next(err); // Handle any other errors that may occur
    };
};
