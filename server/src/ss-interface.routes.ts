import * as express from "express";
import { ObjectId } from "mongodb";
import { ssiDataCollections } from "./database.ts";


export const ssiRouter = express.Router();

ssiRouter.use(express.json());

// Get all srvcscrnInterface objects
ssiRouter.get("/", async (_req, res) => {
    try {
        const srvcscrnInterface = await ssiDataCollections?.srvcscrnInterface?.find({}).toArray();
        res.status(200).send(srvcscrnInterface);
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.error("Error getting All srvcscrnInterface:", message);
        res.status(500).send(message);
    }
});

// Get ssiData by ID
ssiRouter.get("/:id", async (req, res) => {

    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const ssiData = await ssiDataCollections?.srvcscrnInterface?.findOne(query);
        if (ssiData) {
            res.status(200).send(ssiData);
        } else {
            res.status(404).send("Interface not found");
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.error("Error getting an ssiData:", message);
        res.status(400).send(message);
    }
});

// Create a new ssiData
ssiRouter.post("/", async (req, res) => {
    try {
        const newUiData = req.body;
        const result = await ssiDataCollections?.srvcscrnInterface?.insertOne(newUiData);
        if ( result?.acknowledged) {
            res.status(201).send({ ...newUiData, _id: result?.insertedId });
            console.log(`Created a new ssiData with id ${result.insertedId}`);

        } else {
            res.status(500).send("Failed to create a new ssiData");
            // throw new Error("Failed to create a new ssiData");
        }
        
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.error("Error creating a new ssiData:", message);
        res.status(400).send(message);
    }
}); 

// Update an existing ssiData
ssiRouter.put("/:id", async (req, res) => {
    
    try {
        const id = req?.params?.id;
        const updatedUiData = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await ssiDataCollections?.srvcscrnInterface?.updateOne(
            query, 
            { $set: updatedUiData }
        );

        if (result && result?.matchedCount) {
            res.status(200).send(`Successfully updated ssiData with id: ${id}`);
        } else {
            res.status(404).send(`Employee not found with id: ${id} `);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.error("Error updating an ssiData:", message);
        res.status(400).send(message);
    }
});

// Delete an ssiData
ssiRouter.delete("/:id", async (req, res) => {

    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await ssiDataCollections?.srvcscrnInterface?.deleteOne(query);

        if (result && result?.deletedCount) {
            res.status(202).send(`Successfully deleted ssiData with id: ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to delete ssiData with id: ${id}`); 
        } else if (!result?.deletedCount) {
            res.status(404).send(`Employee not found with id: ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.error("Error deleting ssiData:", message);
        res.status(400).send(message);
    }
});