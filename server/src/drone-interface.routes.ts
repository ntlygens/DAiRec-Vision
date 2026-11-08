import * as express from "express";
import { ObjectId } from "mongodb";
import { droneDataCollections } from "./database.ts";

export const droneRouter = express.Router();

droneRouter.use(express.json());

// Get all droneSrvcsInterface objects
droneRouter.get("/", async (_req, res) => {
    try {
        const droneSrvcsInterface = await droneDataCollections?.droneSrvcsInterface?.find({}).toArray();
        console.log('drone-success', droneSrvcsInterface?.length);
        res.status(200).send(droneSrvcsInterface);
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.error("Error getting All droneSrvcsInterface:", message);
        res.status(500).send(message);
    }
});

// Get droneData by ID
droneRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const droneData = await droneDataCollections?.droneSrvcsInterface?.findOne(query);
        if (droneData) {
            res.status(200).send(droneData);
        } else {
            res.status(404).send("Interface not found");
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.error("Error getting a droneData:", message);
        res.status(400).send(message);
    }
});

// Create a new droneData
droneRouter.post("/", async (req, res) => {
    try {
        const newData = req.body;
        const result = await droneDataCollections?.droneSrvcsInterface?.insertOne(newData);
        if (result?.acknowledged) {
            res.status(201).send({ ...newData, _id: result?.insertedId });
            console.log(`Created a new droneData with id ${result.insertedId}`);
        } else {
            res.status(500).send("Failed to create a new droneData");
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.error("Error creating a new droneData:", message);
        res.status(400).send(message);
    }
});

// Update an existing droneData
droneRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const updatedData = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await droneDataCollections?.droneSrvcsInterface?.updateOne(
            query,
            { $set: updatedData }
        );
        if (result && result?.matchedCount) {
            res.status(200).send(`Successfully updated droneData with id: ${id}`);
        } else {
            res.status(404).send(`droneData not found with id: ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.error("Error updating a droneData:", message);
        res.status(400).send(message);
    }
});

// Delete a droneData
droneRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await droneDataCollections?.droneSrvcsInterface?.deleteOne(query);
        if (result && result?.deletedCount) {
            res.status(202).send(`Successfully deleted droneData with id: ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to delete droneData with id: ${id}`);
        } else if (!result?.deletedCount) {
            res.status(404).send(`droneData not found with id: ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.error("Error deleting droneData:", message);
        res.status(400).send(message);
    }
});
