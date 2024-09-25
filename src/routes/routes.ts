/**
 * Main routes
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Importing our custom modules
import {generateRouter} from "../utils/router/router_utils"; // Importing router utility
// Importing our custom routes
import accountRouter from "./account/account_routes"; // Importing authentication routes
import videoRouter from "./video/video_routes"; // Importing video-related routes

// Defining a router
const router = generateRouter(); // Creating a new router instance

// Defining route handlers
router.use('/account', accountRouter); // Mounting authentication routes under '/auth'
router.use('/video', videoRouter); // Mounting video routes under '/videos'

// Exporting the configured router
export default router;