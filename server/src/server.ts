import * as dotenv from "dotenv";
import express from "express";
import {
    connectToDatabase,
    uiDataCollections, ssiDataCollections, prtctDataCollections,
    srvlDataCollections, accsDataCollections, droneDataCollections,
} from "./database.ts";
import { createContentRouter } from "./content-router.ts";

dotenv.config();

/**
 * DaiRec Vision content API (private).
 *
 * Browsers never call this server directly: the public page server (client/src/server.ts)
 * forwards read-only GET /api/* requests here. Writes need the x-api-key header matching
 * ADMIN_API_KEY and are refused entirely when ADMIN_API_KEY is not set.
 *
 *   MONGODB_URI    MongoDB connection string (required)
 *   PORT           listen port (default 5200)
 *   HOST           listen address (default 127.0.0.1, private to this machine;
 *                  use 0.0.0.0 only if the page server runs on another machine on a private network)
 *   ADMIN_API_KEY  enables POST/PUT/DELETE for requests sending it as x-api-key (optional)
 */
const { MONGODB_URI } = process.env;
const PORT = Number(process.env.PORT) || 5200;
const HOST = process.env.HOST || "127.0.0.1";

if (!MONGODB_URI) {
    console.error("No MongoDB connection string. Set MONGODB_URI environment variable.");
    process.exit(1);
}

await connectToDatabase(MONGODB_URI)
    .then(() => {
        const app = express();
        app.disable("x-powered-by");

        const api = express.Router();
        api.use("/userInterface", createContentRouter("userInterface", () => uiDataCollections.userInterface));
        api.use("/srvcscrnInterface", createContentRouter("srvcscrnInterface", () => ssiDataCollections.srvcscrnInterface));
        api.use("/protectPgData", createContentRouter("protectPgData", () => prtctDataCollections.prtctSrvcsInterface));
        api.use("/surveilPgData", createContentRouter("surveilPgData", () => srvlDataCollections.srvlSrvcsInterface));
        api.use("/accessPgData", createContentRouter("accessPgData", () => accsDataCollections.accsSrvcsInterface));
        api.use("/dronePgData", createContentRouter("dronePgData", () => droneDataCollections.droneSrvcsInterface));
        app.use("/api", api);

        app.use((_req, res) => { res.status(404).send("Not found"); });

        app.listen(PORT, HOST, () => {
            console.log(`Content API listening on http://${HOST}:${PORT}/api` +
                (process.env.ADMIN_API_KEY ? " (writes enabled with API key)" : " (read-only)"));
        });
    })
    .catch((error) => {
        console.error("Failed to connect to the database.", error);
        process.exit(1);
    });
