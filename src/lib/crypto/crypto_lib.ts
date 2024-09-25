/**
 * Crypto library for custom crypto operations
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

import bcrypt from "bcrypt"; // Importing bcrypt for hashing and comparing passwords
import {NextFunction} from "express"; // Importing NextFunction type for error handling in Express

export class CryptoLib {
    // Static method to hash a user's password
    static async _hashUserPassword(password: string, next: NextFunction) {
        try {
            // Generate a salt with 10 rounds of processing
            const salt = await bcrypt.genSalt(10);
            // Hash the password using the generated salt
            const hashedPassword = await bcrypt.hash(password, salt);
            // Return the hashed password
            return hashedPassword;
        } catch (err) {
            next(err); // Pass the error to the next middleware for handling
        };
    };

    // Static method to compare a plain password with a hashed password
    static async _comparePassword(password: string, hashedPassword: string, next: NextFunction) {
        try {
            // Compare the plain password with the hashed password
            const result = await bcrypt.compare(password, hashedPassword); // Ensure to await the comparison
            return result; // Return the result of the comparison (true or false)
        } catch (err) {
            next(err); // Pass the error to the next middleware for handling
        };
    };
}
