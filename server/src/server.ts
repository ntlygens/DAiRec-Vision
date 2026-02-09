import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database.ts";
import { uiRouter } from "./ui-interface.routes.ts";
import { ssiRouter } from "./ss-interface.routes.ts";

dotenv.config();

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
    console.error("No MongoDB connection string. Set MONGODB_URI environment variable.");
    process.exit(1);
}

await connectToDatabase(MONGODB_URI)
    .then(() => {
        const app = express();
        app.use(cors());

        app.use("/userInterface", uiRouter);
        app.use("/srvcscrnInterface", ssiRouter);
        // app.use("/userInterface", uiRouter);

        app.listen(5200, () => {
            console.log("Server is running on port 5200");
        });
        // console.log("Database connection established");
    })
    .catch((error) => {
        console.error("Failed to connect to the database.", error);
        process.exit(1);
    });
