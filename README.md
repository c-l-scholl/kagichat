# KagiChat

KagiChat is created by Camden Scholl and Stephanie Geber as a capstone project.
KagiChat is an end-to-end encrypted messaging app. Please note that this project is very experimental, and should NOT be considered secure. 

## How it Works
KagiChat generates ECC keys using the elliptic package, specifically Curve25519, on signup. The private key is stored in a broswer cookie, and the public key and other user data is stored in a MongoDB database. After signup/login, users are redirected to the messengers page, where they can select from all other available users to start or continue a chat. All messages are encrypted with the ECDH derived shared secret, and stored in the MongoDB cluster as ciphertext.

## How to Run
Create a .env file with the following fields: MONGO_URI, PORT, and SECRET. 
 - MONGO_URI should be a URI for a MongoDB cluster. 
 - PORT is the port that ExpressJS will use.
 - SECRET is used for creating JWT tokens.

## Start Up
Then, to start the backend, run
```bash
npm install 
npm run dev
```
To start the frontend, create a new terminal and run
```bash
cd frontend
npm install
npm run dev
```
