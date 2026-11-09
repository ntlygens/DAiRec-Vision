import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import {
    connectToDatabase,
    uiDataCollections, ssiDataCollections, prtctDataCollections,
    srvlDataCollections, accsDataCollections, droneDataCollections,
} from "./database.ts";
import { createContentRouter } from "./content-router.ts";

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

        app.use("/userInterface", createContentRouter("userInterface", () => uiDataCollections.userInterface));
        app.use("/srvcscrnInterface", createContentRouter("srvcscrnInterface", () => ssiDataCollections.srvcscrnInterface));
        app.use("/protectPgData", createContentRouter("protectPgData", () => prtctDataCollections.prtctSrvcsInterface));
        app.use("/surveilPgData", createContentRouter("surveilPgData", () => srvlDataCollections.srvlSrvcsInterface));
        app.use("/accessPgData", createContentRouter("accessPgData", () => accsDataCollections.accsSrvcsInterface));
        app.use("/dronePgData", createContentRouter("dronePgData", () => droneDataCollections.droneSrvcsInterface));

        app.listen(5200, () => {
            console.log("Server is running on port 5200");
        });
    })
    .catch((error) => {
        console.error("Failed to connect to the database.", error);
        process.exit(1);
    });
