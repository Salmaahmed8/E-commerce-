import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./backend/db/connect.js";
import cookieParser from "cookie-parser";
import fs from "node:fs";

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
app.use(cookieParser());

//routes
const routeFiles = fs.readFileSync("./backend/routes");

routeFiles.forEach((file) => {
    // use dynamic import
    import(`./backend/routes/${file}`)
      .then((route) => {
        app.use("/api", route.default);
      })
      .catch((err) => {
        console.log("Failed to load route file", err);
      });
  });

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