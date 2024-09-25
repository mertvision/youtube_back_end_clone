/**
 * Account schema
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Importing our custom interface
import {AccountInterface} from "../../interfaces/schemes/account_interface";
// Importing third party modules
import mongoose, {Schema} from "mongoose";

// Schema definition for the Account model
const AccountSchema: Schema<AccountInterface> = new Schema({
    first_name: {
        type: String,
        required: [true, "Please provide a first name value."],
        unique: false,
        trim: true,
        minlength: 3,
    },
    last_name: {
        type: String,
        required: false,
        unique: false,
        trim: true,
        minlength: 1,
    },
    username: {
        type: String,
        required: [true, "Please provide a username value."],
        unique: true,
        trim: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: [true, "Please provide an e-mail address."],
        unique: true, // Ensures email is unique
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, // Regex for valid email format
            'Please provide a valid e-mail',
        ],
    },
    password: {
        type: String,
        required: [true, "Please provide a password value."],
        unique: true,
        minlength: 8,
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'advanced_user', 'moderator', 'admin', 'super_admin'], // Role options
    },
    profile_image: {
        type: String,
        default: 'profile_image.jpg', // Default profile image
    },
    createdAt: {
        type: Date,
        default: Date.now, // Default creation date
    },
    blocked: {
        type: Boolean,
        default: false, // Default blocked status
    },
    is_email_verified: {
        type: Boolean,
        default: false, // Default email verification status
    },
}, { timestamps: true }); // Automatically manage createdAt and updatedAt timestamps

// Exporting the Account model based on the Account schema
export const Account = mongoose.model<AccountInterface>('Account', AccountSchema);
