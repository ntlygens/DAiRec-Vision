import * as express from "express";
import { ObjectId } from "mongodb";
import { accsDataCollections } from "./database.ts";

export const accsRouter = express.Router();

accsRouter.use(express.json());

// Get all accsSrvcsInterface objects
accsRouter.get("/", async (_req, res) => {
    try {
        const accsSrvcsInterface = await accsDataCollections?.accsSrvcsInterface?.find({}).toArray();
        console.log('accs-success', accsSrvcsInterface?.length);
        res.status(200).send(accsSrvcsInterface);
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.error("Error getting All accsSrvcsInterface:", message);
        res.status(500).send(message);
    }
});


// Get accsData by ID
accsRouter.get("/:id", async (req, res) => {

    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const accsData = await accsDataCollections?.accsSrvcsInterface?.findOne(query);
        if (accsData) {
            res.status(200).send(accsData);
        } else {
            res.status(404).send("Interface not found");
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.error("Error getting an accsData:", message);
        res.status(400).send(message);
    }
});

// Create a new accsData
accsRouter.post("/", async (req, res) => {
    try {
        const newUiData = req.body;
        const result = await accsDataCollections?.accsSrvcsInterface?.insertOne(newUiData);
        if ( result?.acknowledged) {
            res.status(201).send({ ...newUiData, _id: result?.insertedId });
            console.log(`Created a new accsData with id ${result.insertedId}`);

        } else {
            res.status(500).send("Failed to create a new accsData");
            // throw new Error("Failed to create a new accsData");
        }
        
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.error("Error creating a new accsData:", message);
        res.status(400).send(message);
    }
}); 

// Update an existing accsData
accsRouter.put("/:id", async (req, res) => {
    
    try {
        const id = req?.params?.id;
        const updatedUiData = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await accsDataCollections?.accsSrvcsInterface?.updateOne(
            query, 
            { $set: updatedUiData }
        );

        if (result && result?.matchedCount) {
            res.status(200).send(`Successfully updated accsData with id: ${id}`);
        } else {
            res.status(404).send(`Employee not found with id: ${id} `);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.error("Error updating an accsData:", message);
        res.status(400).send(message);
    }
});

// Delete an accsData
accsRouter.delete("/:id", async (req, res) => {

    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await accsDataCollections?.accsSrvcsInterface?.deleteOne(query);

        if (result && result?.deletedCount) {
            res.status(202).send(`Successfully deleted accsData with id: ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to delete accsData with id: ${id}`); 
        } else if (!result?.deletedCount) {
            res.status(404).send(`Employee not found with id: ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.error("Error deleting accsData:", message);
        res.status(400).send(message);
    }
});