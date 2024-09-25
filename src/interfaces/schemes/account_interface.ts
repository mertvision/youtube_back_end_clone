/**
 * Account Interface
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Importing third party modules
import {Document} from "mongoose"; // Importing Document type from mongoose for type safety

// Account Interface extending Mongoose Document
export interface AccountInterface extends Document {
    /**
     * User's first name (required field)
     */
    first_name: string;

    /**
     * User's last name (optional field)
     */
    last_name?: string;

    /**
     * Unique username for the account (required field)
     */
    username: string;

    /**
     * User's email address (required field)
     */
    email: string;

    /**
     * User's password (required field, should be hashed)
     */
    password: string;

    /**
     * Role of the user in the system, can be one of the following:
     * 'user', 'advanced_user', 'moderator', 'admin', 'super_admin'
     */
    role: 'user' | 'advanced_user' | 'moderator' | 'admin' | 'super_admin';

    /**
     * URL or path to the user's profile image (required field)
     */
    profile_image: string;

    /**
     * Date when the account was created (required field)
     */
    createdAt: Date;

    /**
     * Indicates whether the account is blocked (required field)
     */
    blocked: boolean;

    /**
     * Indicates whether the user's email has been verified (required field)
     */
    is_email_verified: boolean;
};
