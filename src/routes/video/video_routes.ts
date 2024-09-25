/**
 * Video routes
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Importing custom modules
import {generateRouter} from "../../utils/router/router_utils";
import {addNewVideo, addViewToVideo, deleteSingleVideo, getRandomVideos, getSingleVideo, getVideosByAccount, updateSingleVideo} from "../../controllers/video/video_controllers";
import {hasAccess} from "../../middlewares/access/access";
import {uploadFile} from "../../middlewares/upload/upload_middleware";
import commentRouter from "../comment/comment_routes";

// Defining the video router
const videoRouter = generateRouter();

// Video routes
videoRouter.post('/', [hasAccess, uploadFile.fields([{ name: 'image' }, { name: 'file' }])], addNewVideo); // Add a new video: POST http://localhost:PORT/api/video/
videoRouter.get('/:videoId', getSingleVideo); // Retrieve a single video by ID: GET http://localhost:PORT/api/video/:videoId
videoRouter.put('/:videoId', hasAccess, updateSingleVideo); // Update a video by ID: PUT http://localhost:PORT/api/video/:videoId
videoRouter.delete('/:videoId', hasAccess, deleteSingleVideo); // Delete a video by ID: DELETE http://localhost:PORT/api/video/:videoId
videoRouter.get('/find/:accountId', getVideosByAccount); // Retrieve videos by account ID: GET http://localhost:PORT/api/video/find/:accountId
videoRouter.get('/find/random', getRandomVideos); // Retrieve random videos: GET http://localhost:PORT/api/video/find/random
videoRouter.put('/view/:videoId', addViewToVideo); // Add a view to a video by ID: PUT http://localhost:PORT/api/video/view/:videoId 
videoRouter.use('/:videoId/comments', commentRouter); // Comments for a video: GET/POST/PUT/DELETE http://localhost:PORT/api/video/:videoId/comments/

// Exporting the video router
export default videoRouter;

