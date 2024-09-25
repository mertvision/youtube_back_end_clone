/**
 * Account Controller for handling user-related operations
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Importing necessary modules
import {NextFunction, Request, Response} from "express"; // Importing Express types
import {Account} from "../../schemes/account/account_schema"; // Importing the Account schema
import {CustomError} from "../../utils/error/custom_error"; // Importing CustomError for error handling
import {CryptoLib} from "../../lib/crypto/crypto_lib"; // Importing the CryptoLib for password handling
import {JWTLib} from "../../lib/jwt/jwt_lib"; // Importing JWTLib for token management

/**
 * Registers a new account.
 * 
 * @param {Request} req - The request object containing account details.
 * @param {Response} res - The response object to send the result.
 * @param {NextFunction} next - The next middleware function.
 */
export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extracting account information from the request body
        let first_name = req.body.first_name as string;
        let last_name = req.body.last_name as string || ' '; // Default to space if last name is not provided
        let username = req.body.username as string;
        let email = req.body.email as string;
        let password = req.body.password as string;

        // Hashing the user's password
        const hashedPassword = await CryptoLib._hashUserPassword(password, next);

        // Creating a new account
        const account = await Account.create({
            first_name: first_name,
            last_name: last_name,
            username: username,
            email: email,
            password: hashedPassword
        });

        await account.save(); // Saving the account

        return res.status(201).json({ // Sending response with created account data
            success: true,
            data: account
        });
    } catch (err) {
        return next(err); // Forwarding the error to the error handler
    };
};

/**
 * Logs in an existing account.
 * 
 * @param {Request} req - The request object containing login details.
 * @param {Response} res - The response object to send the result.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 * @throws {CustomError} - Throws an error for various login validation failures.
 */
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {emailOrUsername, password} = req.body; // Destructure email or username and password from request body

        if (!emailOrUsername) {
            return next(new CustomError("Please provide a value.", 400)); // Error if no input is provided
        };

        if (!password) {
            return next(new CustomError("Please provide a password.", 400)); // Error if no password is provided
        };

        // Finding account by email or username
        const account = await Account.findOne({
            $or: [
                { email: emailOrUsername },
                { username: emailOrUsername }
            ],
        });

        if (!account) {
            return next(new CustomError("User can't be found.", 404)); // Error if account not found
        };

        // Compare provided password with stored hashed password
        const comparedPasswords = await CryptoLib._comparePassword(password, account.password, next);
 
        if (!comparedPasswords) {
            return next(new CustomError("Your password is not correct.", 400)); // Error if password does not match
        };

        // Send JWT token on successful login
        JWTLib._sendToken(account, res);
    } catch (err) {
        return next(err); // Forwarding the error to the error handler
    };
};

/**
 * Finds a single account by ID.
 * 
 * @param {Request} req - The request object containing the account ID.
 * @param {Response} res - The response object to send the result.
 * @param {NextFunction} next - The next middleware function.
 */
export const findSingleAccount = async (req: Request<{ accountId?: string }>, res: Response, next: NextFunction) => {
    try {
        if (!req.params.accountId) {
            return next(new CustomError("Please provide a verified account id", 400)); // Error if no account ID is provided
        };

        const accountId = req.params.accountId;

        // Finding account by ID
        const account = await Account.findById({_id: accountId});

        if (!account) {
            return next(new CustomError("There is no account with this id.", 404)); // Error if account not found
        }

        return res.status(200).json({
            success: true,
            data: account // Sending found account data
        });
    } catch (err) {
        return next(err); // Forwarding the error to the error handler
    };
};

/**
 * Updates account information for a given account ID.
 * 
 * @param {Request} req - The request object containing updated account details.
 * @param {Response} res - The response object to send the result.
 * @param {NextFunction} next - The next middleware function.
 */
export const updateAccountInformations = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authAccountId = req?.account?.id; // ID of the authenticated user
        const updateAccountId = req.params.accountId; // ID of the account to be updated

        if (!updateAccountId) {
            return next(new CustomError("Please provide an account id.", 400)); // Error if no account ID is provided
        };

        if (authAccountId !== updateAccountId) {
            return next(new CustomError("You cannot update this channel", 500)); // Error if user tries to update another account
        };

        const updatedAccount = await Account.findByIdAndUpdate(updateAccountId, { $set: req.body }, { new: true }); // Update the account
        await updatedAccount?.save(); // Save the updated account

        return res.status(200).json({
            success: true,
            data: updatedAccount, // Sending updated account data
        });
    } catch (err) {
        return next(err); // Forwarding the error to the error handler
    };
};

/**
 * Subscribes the authenticated account to another account.
 * 
 * @param {Request} req - The request object containing the account ID to subscribe to.
 * @param {Response} res - The response object to send the result.
 * @param {NextFunction} next - The next middleware function.
 */
export const subscribeAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authAccountId = req.account?.id; // ID of the authenticated user
        const subscribeAccountId = req.params.accountId; // ID of the account to subscribe to

        // Prevent self-subscription
        if (authAccountId !== subscribeAccountId) {
            await Account.findByIdAndUpdate(authAccountId, {
                $addToSet: { subscribedUsers: subscribeAccountId } // Add to subscribedUsers array
            });

            await Account.findByIdAndUpdate(subscribeAccountId, {
                $addToSet: { subscribers: authAccountId } // Add to subscribers array
            });

            return res.status(200).json({
                success: true,
                message: `You have been subscribed to ${subscribeAccountId}.`,
            });
        } else {
            return next(new CustomError("You cannot subscribe to yourself.", 400)); // Error if user tries to subscribe to themselves
        }
    } catch (err) {
        return next(err); // Forwarding the error to the error handler
    }
};

/**
 * Unsubscribes the authenticated account from another account.
 * 
 * @param {Request} req - The request object containing the account ID to unsubscribe from.
 * @param {Response} res - The response object to send the result.
 * @param {NextFunction} next - The next middleware function.
 */
export const unsubscribeAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authAccountId = req.account?.id; // ID of the authenticated user
        const unsubscribeAccountId = req.params.accountId; // ID of the account to unsubscribe from

        // Prevent self-unsubscription
        if (authAccountId !== unsubscribeAccountId) {
            await Account.findByIdAndUpdate(authAccountId, {
                $pull: { subscribedUsers: unsubscribeAccountId } // Remove from subscribedUsers array
            });

            await Account.findByIdAndUpdate(unsubscribeAccountId, {
                $pull: { subscribers: authAccountId } // Remove from subscribers array
            });

            return res.status(200).json({
                success: true,
                message: `You have been unsubscribed from ${unsubscribeAccountId}.`,
            });
        } else {
            return next(new CustomError("You cannot unsubscribe to yourself.", 400)); // Error if user tries to unsubscribe from themselves
        };
    } catch (err) {
        return next(err); // Forwarding the error to the error handler
    };
};

/**
 * Deletes a single account.
 * 
 * @param {Request} req - The request object containing the account ID to delete.
 * @param {Response} res - The response object to send the result.
 * @param {NextFunction} next - The next middleware function.
 */
export const deleteSingleAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authAccountId = req?.account?.id; // ID of the authenticated user
        const deleteAccountId = req.params.accountId; // ID of the account to be deleted

        if (!deleteAccountId) {
            return next(new CustomError("Please provide a channel id.", 400)); // Error if no account ID is provided
        };

        if (authAccountId !== deleteAccountId) {
            return next(new CustomError("You cannot delete this channel.", 500)); // Error if user tries to delete another account
        } else {
            await Account.findByIdAndDelete(deleteAccountId); // Delete the account

            return res.status(200).clearCookie("access_token").json({
                success: true,
                message: "Your channel has been deleted successfully.", // Sending success message
            });
        }
    } catch (err) {
        return next(err); // Forwarding the error to the error handler
    };
};

