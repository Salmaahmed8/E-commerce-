import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./backend/db/connect.js";

dotenv.config();

const port = process.env.PORT || 4000;

const app = express();

//middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


const server = async () => {
    try {
        await connect();
        app.listen(port, () => {
            console.log(`server is running on port ${port}`);    
        });
    } catch (error) {
        console.log("Failed to start server..", error.message);
        process.exit(1);
    }
};
server();