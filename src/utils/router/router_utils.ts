/**
 * Router utils
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Importing modules
import express from "express";

// Function to generate and return a new router instance
export const generateRouter = () => {
    const router = express.Router(); // Create a new router instance
    return router;                  // Return the router
};
