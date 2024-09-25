/**
 * Initializes the MongoDB connection using Mongoose.
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Importing mongoose and ConnectOptions for type safety
import mongoose, { ConnectOptions } from "mongoose"; // Importing mongoose for database interactions

/**
 * Establishes a connection to the MongoDB database.
 * This function should be called to connect to the database at the start of the application.
 */
export const initMongodbConnection = async () => {
    try {
        // Connect to MongoDB using the URI from environment variables
        await mongoose.connect(process?.env?.MONGO_URI || '', {
            dbName: "youtube" // Specify the database name
        } as ConnectOptions);
        
        console.log("MongoDB connection is successful."); // Log success message
    } catch (err) {
        console.log("Mongodb connection error:", err); // Log any errors encountered during connection
    }
};
