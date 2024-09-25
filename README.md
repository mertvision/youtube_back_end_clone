# Youtube Back End Clone with Node.js

## 1. Description of The App

This application is a YouTube back-end clone project that uses TypeScript as the programming language, Node.js as the runtime environment, MongoDB as the database, and JSON Web Token for authorization processes. It doesn't include all of YouTube's features, but it supports basic functionalities like registration, login, subscribing, uploading videos, updating videos, posting comments, and deleting comments. The server's API endpoints for testing in Postman are provided here:

https://www.postman.com/mertvision/youtube/overview

## 2. The Application's Dependencies and Folder Structure

**Dependencies**: The third-party software (dependencies) that this application requires to function are listed below with their current versions. These are also available in the package.json file.

```
"bcrypt": "^5.1.1",
"cookie-parser": "^1.4.6",
"cors": "^2.8.5",
"dotenv": "^16.4.5",
"express": "^4.21.0",
"express-fileupload": "^1.5.1",
"helmet": "^7.1.0",
"jsonwebtoken": "^9.0.2",
"mongoose": "^8.6.2",
"morgan": "^1.10.0",
"multer": "^1.4.5-lts.1",
"nodemon": "^3.1.5"
```

**Folder and File Structure**

The following folders or files are located in the root directory of the application:

<img width="181" alt="Ekran Resmi 2024-09-25 16 37 48" src="https://github.com/user-attachments/assets/2716c2d3-8422-465d-a198-788e0ff32173">

+ src: This folder is the main directory of the application and is located in the root. It contains the main code of the application written in TypeScript, with the source code stored here. When this folder is compiled, the TypeScript code here is converted to ECMAScript 2015 JavaScript code under the "dist" folder.

+ dist: When the "src" folder is compiled, a "dist" folder is created in the root directory, which contains the compiled ECMAScript 2015 JavaScript code.

+ .env: This is the file where environment variables are defined.

+ .editorconfig: This file contains editor configuration settings.

+ tsconfig.json: This file contains TypeScript configurations.

+ .nvmrc: This file contains the version of Node that was used while developing the application.

+ package.json: This file contains information related to the application.

## 3. Run

**Check .env File**: Before running the application, it is important to have the .env file in the root directory, as this file holds the environment variable information for the project. Essential functions, such as establishing a connection to the database and enabling the application to run, rely on the variables defined in this file. Below is the environment variable contained in the .env file for this application:

```
## NODE ENVIRONMENT
NODE_ENV=development

## SERVER
SERVER_PROTOCOL=http
SERVER_HOST=localhost
SERVER_PORT=8090

## JWT
JWT_SECRET_KEY=c5a3e94ffbac64ce6d76ec22ef08bbb85885d080cdc61cca83bbf044b1cb7e97
JWT_EXPIRE=36000000 ## 10 HOURS 
JWT_COOKIE_EXPIRE= 36000000 ## 10 H0URS

## MONGODB
MONGO_URI=mongodb://localhost:27017
```

**Install Dependencies**: To get the application up and running, install the dependencies: Enter the command `npm install` in the terminal to download the dependencies.

**Obtain JavaScript Output**: Use the command `npx tsc` in the terminal to compile the TypeScript code under the 'src' directory. A folder named 'dist' will be created in the root, containing the JavaScript code."

**Run the Application**: While in the root directory, enter the command `npm run start` in the terminal. The application will start.


