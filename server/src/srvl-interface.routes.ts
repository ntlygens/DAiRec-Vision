import * as express from "express";
import { ObjectId } from "mongodb";
import { srvlDataCollections } from "./database.ts";

export const srvlRouter = express.Router();

srvlRouter.use(express.json());

// Get all srvlSrvcsInterface objects
srvlRouter.get("/", async (_req, res) => {
    try {
        const srvlSrvcsInterface = await srvlDataCollections?.srvlSrvcsInterface?.find({}).toArray();
        console.log('srvl-success', srvlSrvcsInterface?.length);
        res.status(200).send(srvlSrvcsInterface);
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.error("Error getting All srvlSrvcsInterface:", message);
        res.status(500).send(message);
    }
});


// Get srvlData by ID
srvlRouter.get("/:id", async (req, res) => {

    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const srvlData = await srvlDataCollections?.srvlSrvcsInterface?.findOne(query);
        if (srvlData) {
            res.status(200).send(srvlData);
        } else {
            res.status(404).send("Interface not found");
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.error("Error getting an srvlData:", message);
        res.status(400).send(message);
    }
});

// Create a new srvlData
srvlRouter.post("/", async (req, res) => {
    try {
        const newUiData = req.body;
        const result = await srvlDataCollections?.srvlSrvcsInterface?.insertOne(newUiData);
        if ( result?.acknowledged) {
            res.status(201).send({ ...newUiData, _id: result?.insertedId });
            console.log(`Created a new srvlData with id ${result.insertedId}`);

        } else {
            res.status(500).send("Failed to create a new srvlData");
            // throw new Error("Failed to create a new srvlData");
        }
        
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.error("Error creating a new srvlData:", message);
        res.status(400).send(message);
    }
}); 

// Update an existing srvlData
srvlRouter.put("/:id", async (req, res) => {
    
    try {
        const id = req?.params?.id;
        const updatedUiData = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await srvlDataCollections?.srvlSrvcsInterface?.updateOne(
            query, 
            { $set: updatedUiData }
        );

        if (result && result?.matchedCount) {
            res.status(200).send(`Successfully updated srvlData with id: ${id}`);
        } else {
            res.status(404).send(`Employee not found with id: ${id} `);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.error("Error updating an srvlData:", message);
        res.status(400).send(message);
    }
});

// Delete an srvlData
srvlRouter.delete("/:id", async (req, res) => {

    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await srvlDataCollections?.srvlSrvcsInterface?.deleteOne(query);

        if (result && result?.deletedCount) {
            res.status(202).send(`Successfully deleted srvlData with id: ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to delete srvlData with id: ${id}`); 
        } else if (!result?.deletedCount) {
            res.status(404).send(`Employee not found with id: ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.error("Error deleting srvlData:", message);
        res.status(400).send(message);
    }
});