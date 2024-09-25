/**
 * Initializes and starts the Express server.
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Exporting the init function to set up and start the server
export const init = (server: any): void => {
      try {
          // Retrieve server configuration from environment variables
          const SERVER_PROTOCOL = process.env.SERVER_PROTOCOL as string; // Protocol (http or https)
          const SERVER_HOST = process.env.SERVER_HOST as string; // Hostname (e.g., localhost)
          const SERVER_PORT = process.env.SERVER_PORT as string; // Port number
  
          // Construct the server address using the retrieved configurations
          let serverAddress = `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}`;
          let cbMessage = `Server is running on ${serverAddress}`; // Message to be logged
  
          // Start the server and listen on the specified port
          server.listen(SERVER_PORT, () => {
              console.log(cbMessage); // Log the server address once it's running
          });
      } catch (err) {
          console.log(err); // Log any errors encountered during initialization
      }
};
  