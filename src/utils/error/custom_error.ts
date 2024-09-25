/**
 * Custom error class
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Custom error class for handling application-specific errors
export class CustomError extends Error {
  public status: number; // HTTP status code associated with the error

  constructor(message: string, status: number) {
      super(message);      // Pass the error message to the base Error class
      this.name = 'CustomError'; // Set the name of the error
      this.status = status; // Assign the provided status code
  };
};
