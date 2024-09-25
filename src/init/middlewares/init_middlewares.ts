/**
 * Middleware initialization for the Express server.
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Importing Node.js core modules
import path from "path"; // Importing path module to handle file paths

// Importing custom modules
import routes from "../../routes/routes"; // Importing application routes
import {customErrorHandler} from "../../middlewares/error/error_handler"; // Importing custom error handler

// Importing third party modules
import express from "express"; // Importing Express framework
import helmet from "helmet"; // Importing helmet for security headers
import morgan from "morgan"; // Importing morgan for logging HTTP requests
import cookieParser from "cookie-parser"; // Importing cookie-parser for handling cookies
import cors from "cors"; // Importing CORS middleware

/**
 * Initializes middleware for the Express server.
 * This function sets up various middlewares including static file serving, 
 * request logging, cookie parsing, and custom error handling.
 *
 * @param {any} server - The Express server instance.
 */
export const initMiddlewares = (server: any) => {
    /* Serve static files from the "public/images" directory */
    server.use("/images", express.static(path.join(__dirname, "../", "../", "../", "public/images")));
    /* Serve static files from the "public/videos" directory */
    server.use("/videos", express.static(path.join(__dirname, "../", "../", "../", "public/videos")));
    
    server.use(cors()); // CORS
    server.use(express.json()); // Parse incoming JSON requests
    server.use(cookieParser()); // Parse cookies in the requests
    server.use('/api', routes); // Set up API routes
    server.use(customErrorHandler); // Handle errors with custom middleware
    server.use(helmet()); // Set security headers using helmet
    server.use(morgan('dev')); // Log HTTP requests in 'dev' format
};
