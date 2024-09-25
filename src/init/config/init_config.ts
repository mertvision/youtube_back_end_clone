/**
 * Configuration initialization for loading environment variables.
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Importing third party modules
import dotenv from "dotenv"; // Importing dotenv to load environment variables from a .env file

/**
 * Initializes configuration by loading environment variables.
 * This function should be called at the beginning of the application.
 */
export const initConfigurations = () => {
    dotenv.config(); // Loads environment variables from the .env file into process.env
};
