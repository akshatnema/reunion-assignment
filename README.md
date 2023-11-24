# Reunion-Assignment

This repository contains the implementation of project assigned as [Full Stack Developer Assignment](https://reunion-one.notion.site/Full-Stack-Assignment-Reunion-d8eb44c39e5e46b6b2b9a1e0db07a5de) from Reunion. Project is made using **React + TailwindCss + Flowbite + DaisyUI** at frontend and Node js Express backend server to control all endpoints with **MongoDB** used as database to store the data related to users and their properties.

### Deployed Links

Website - [https://reunion-akshat-assignment.netlify.app](https://reunion-akshat-assignment.netlify.app).

Backend Server Endpoint - [https://reunion-backend-zsiu.onrender.com](https://reunion-backend-zsiu.onrender.com).

Postman Workspace to describe APIs - [https://elements.getpostman.com/redirect?entityId=19209285-75e54cf3-35c9-4209-a0cd-31d93b82f02e&entityType=collection](https://elements.getpostman.com/redirect?entityId=19209285-75e54cf3-35c9-4209-a0cd-31d93b82f02e&entityType=collection)

### Steps to setup this project

Project is divided into 2 directories - `server` and `web`. We have to spin up both server and web simultaneously to fetch the data from database and show them on website. Here are the following steps:-

1. Navigate to `server` directory and install the NPM dependencies. Use following commands:

    ```bash
    cd server/
    npm install
    ```

2. Make a `.env` file for environment variables inside the folder as:

    ```
    JWT_SECRET=
    MONGO_URL=
    ```

3. Run the backend server using the command:

    ```bash
    node ./server.js
    ```

4. Now, navigate to `web` folder and install the NPM dependencies. Use following commands:

    ```bash
    cd web/
    npm install
    ```

5. Make a `.env` file for environment variables inside the folder as:

    ```
    VITE_BACKEND_URL='http://localhost:5000'
    ```

6. Run the frontend server using the command:

    ```bash
    npm run dev
    ```

7. Make an optimized build using following command:
    ```bash
    npm run build
    ```
