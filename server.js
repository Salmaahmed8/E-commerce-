import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fs from "node:fs";
import path from 'path';
import compression from 'compression';


import connect from "./backend/db/connect.js";
import errorHandler from "./backend/helpers/errorhandler.js"
import productRoutes from './backend/routes/productRoutes.js';
import userRoutes from './backend/routes/userRoutes.js';
import orderRoutes from './backend/routes/orderRoutes.js';
import uploadRoutes from './backend/routes/uploadRoutes.js';
import paymentRoutes from './backend/routes/paymentRoutes.js';

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

//error handler middleware
app.use(errorHandler)

const __dirname = path.resolve(); // Set {__dirname} to current working directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//routes
const routeFiles = fs.readdirSync(`./backend/routes`);
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

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/upload', uploadRoutes);
app.use('/api/v1/payment', paymentRoutes);


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