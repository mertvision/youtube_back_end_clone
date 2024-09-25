/**
 * JWT library for JWT operations
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Importing custom modules
import {JWTEnvInterface} from "../../interfaces/env/env_jwt_interface"; // Importing interface for environment variables

// Importing third party modules
import {Request, Response} from "express"; // Importing Request and Response types from express
import jwt from "jsonwebtoken"; // Importing jsonwebtoken for creating and verifying tokens

export class JWTLib {
    
    // Static method to send a JWT token to the client
    static async _sendToken(account: any, res: Response) {
        const env = process.env as unknown as JWTEnvInterface; // Type assertion for environment variables

        // Retrieve configuration values from environment variables
        const JWT_SECRET_KEY = env.JWT_SECRET_KEY; // Secret key used to sign the JWT
        const JWT_EXPIRE = env.JWT_EXPIRE; // Expiration time for the JWT
        const JWT_COOKIE_EXPIRE = env.JWT_COOKIE_EXPIRE; // Expiration time for the cookie
        const NODE_ENV = process.env.NODE_ENV as string; // Current environment (e.g., development or production)

        // Create a payload for the JWT
        const payload = {
            id: account?.id as string, // User ID
            first_name: account?.first_name as string, // User's first name
        };

        // Sign the JWT using the payload and secret key
        const token = jwt.sign(payload, JWT_SECRET_KEY, {
            expiresIn: parseInt(JWT_EXPIRE), // Set the token expiration time
        });

        // Send the JWT to the client in a cookie and as part of the response JSON
        return res.status(200) // Set HTTP status code to OK (200)
            .cookie("access_token", token, {
                httpOnly: true, // Cookie is not accessible via JavaScript (client-side)
                expires: new Date(Date.now() + parseInt(JWT_COOKIE_EXPIRE)), // Set cookie expiration time
                secure: NODE_ENV === 'development' ? false : true, // Use secure flag based on environment
            })
            .json({
                success: true, // Indicates the request was successful
                access_token: token, // Return the JWT as part of the response
                data: {
                    id: account?.id, // User ID in the response
                    first_name: account?.first_name // User's first name in the response
                },
            }); 
    };

    // Static method to check if the token is included in the request headers
    static async isTokenIncluded(req: Request): Promise<boolean> {
        // Check if the authorization header is present and starts with "Bearer:"
        const authorization = req.headers.authorization;
        if (!authorization?.startsWith("Bearer:")) {
            return false; // Token is not included
        };
        return true; // Token is included
    };

    // Static method to extract the access token from the request headers
    static async _getAccessTokenFromHeader(req: Request): Promise<string | undefined> {
        const authorization = req.headers.authorization; // Get the authorization header
        if (authorization) {
            const access_token = authorization.split(" ")[1]; // Extract the token from "Bearer <token>"
            return access_token; // Return the extracted token
        };
        return undefined; // Return undefined if authorization header is not present
    };
};
