import * as express from "express";
import { ObjectId } from "mongodb";
import { uiDataCollections } from "./database.ts";


export const uiRouter = express.Router();

uiRouter.use(express.json());

// Get all userInterface objects
uiRouter.get("/", async (_req, res) => {
    try {
        const userInterface = await uiDataCollections?.userInterface?.find({}).toArray();
        res.status(200).send(userInterface);
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.error("Error getting All userInterface:", message);
        res.status(500).send(message);
    }
});

// Get uiData by ID
uiRouter.get("/:id", async (req, res) => {

    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const uiData = await uiDataCollections?.userInterface?.findOne(query);
        if (uiData) {
            res.status(200).send(uiData);
        } else {
            res.status(404).send("Interface not found");
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.error("Error getting an uiData:", message);
        res.status(400).send(message);
    }
});

// Create a new uiData
uiRouter.post("/", async (req, res) => {
    try {
        const newUiData = req.body;
        const result = await uiDataCollections?.userInterface?.insertOne(newUiData);
        if ( result?.acknowledged) {
            res.status(201).send({ ...newUiData, _id: result?.insertedId });
            console.log(`Created a new uiData with id ${result.insertedId}`);

        } else {
            res.status(500).send("Failed to create a new uiData");
            // throw new Error("Failed to create a new uiData");
        }
        
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.error("Error creating a new uiData:", message);
        res.status(400).send(message);
    }
}); 

// Update an existing uiData
uiRouter.put("/:id", async (req, res) => {
    
    try {
        const id = req?.params?.id;
        const updatedUiData = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await uiDataCollections?.userInterface?.updateOne(
            query, 
            { $set: updatedUiData }
        );

        if (result && result?.matchedCount) {
            res.status(200).send(`Successfully updated uiData with id: ${id}`);
        } else {
            res.status(404).send(`Employee not found with id: ${id} `);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.error("Error updating an uiData:", message);
        res.status(400).send(message);
    }
});

// Delete an uiData
uiRouter.delete("/:id", async (req, res) => {

    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await uiDataCollections?.userInterface?.deleteOne(query);

        if (result && result?.deletedCount) {
            res.status(202).send(`Successfully deleted uiData with id: ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to delete uiData with id: ${id}`); 
        } else if (!result?.deletedCount) {
            res.status(404).send(`Employee not found with id: ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.error("Error deleting uiData:", message);
        res.status(400).send(message);
    }
});