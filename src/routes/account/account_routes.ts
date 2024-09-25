/**
 * Account routes
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Importing authentication controllers
import {login,register, findSingleAccount, updateAccountInformations, deleteSingleAccount, subscribeAccount, unsubscribeAccount} from "../../controllers/account/account_controllers";
import {generateRouter} from "../../utils/router/router_utils";
import {hasAccess} from "../../middlewares/access/access";

// Defining the authentication router
const accountRouter = generateRouter();

// Authentication routes
accountRouter.post('/register', register); // User registration: POST http://localhost:PORT/api/account/register
accountRouter.post('/login', login); // User login: POST http://localhost:PORT/api/account/login
accountRouter.get('/find/:accountId', findSingleAccount); // http://localhost:PORT/api/account/find/:accountId
accountRouter.put('/:accountId', hasAccess, updateAccountInformations); // http://localhost:8090/api/account/:accountId
accountRouter.delete('/:accountId', hasAccess, deleteSingleAccount); // http://localhost:8090/api/account/:accountId
accountRouter.put('/sub/:accountId', hasAccess, subscribeAccount); // http://localhost:8090/api/account/sub/:accountId
accountRouter.put('/unsub/:accountId', hasAccess, unsubscribeAccount); // http://localhost:8090/api/channel/unsub/:channelId

// Exporting the authentication router
export default accountRouter;
