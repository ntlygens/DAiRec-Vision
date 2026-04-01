import * as express from "express";
import { ObjectId } from "mongodb";
import { prtctDataCollections } from "./database.ts";


export const prtctRouter = express.Router();

prtctRouter.use(express.json());

// Get all prtctSrvcsInterface objects
prtctRouter.get("/", async (_req, res) => {
    try {
        const prtctSrvcsInterface = await prtctDataCollections?.prtctSrvcsInterface?.find({}).toArray();
        console.log('prtct-success: ', prtctSrvcsInterface?.length);
        res.status(200).send(prtctSrvcsInterface);
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.error("Error getting All prtctSrvcsInterface:", message);
        res.status(500).send(message);
    }
});

// Get prtctData by ID
prtctRouter.get("/:id", async (req, res) => {

    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const prtctData = await prtctDataCollections?.prtctSrvcsInterface?.findOne(query);
        if (prtctData) {
            res.status(200).send(prtctData);
        } else {
            res.status(404).send("Interface not found");
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.error("Error getting an prtctData:", message);
        res.status(400).send(message);
    }
});

// Create a new prtctData
prtctRouter.post("/", async (req, res) => {
    try {
        const newUiData = req.body;
        const result = await prtctDataCollections?.prtctSrvcsInterface?.insertOne(newUiData);
        if ( result?.acknowledged) {
            res.status(201).send({ ...newUiData, _id: result?.insertedId });
            console.log(`Created a new prtctData with id ${result.insertedId}`);

        } else {
            res.status(500).send("Failed to create a new prtctData");
            // throw new Error("Failed to create a new prtctData");
        }
        
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.error("Error creating a new prtctData:", message);
        res.status(400).send(message);
    }
}); 

// Update an existing prtctData
prtctRouter.put("/:id", async (req, res) => {
    
    try {
        const id = req?.params?.id;
        const updatedUiData = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await prtctDataCollections?.prtctSrvcsInterface?.updateOne(
            query, 
            { $set: updatedUiData }
        );

        if (result && result?.matchedCount) {
            res.status(200).send(`Successfully updated prtctData with id: ${id}`);
        } else {
            res.status(404).send(`Employee not found with id: ${id} `);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.error("Error updating an prtctData:", message);
        res.status(400).send(message);
    }
});

// Delete an prtctData
prtctRouter.delete("/:id", async (req, res) => {

    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await prtctDataCollections?.prtctSrvcsInterface?.deleteOne(query);

        if (result && result?.deletedCount) {
            res.status(202).send(`Successfully deleted prtctData with id: ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to delete prtctData with id: ${id}`); 
        } else if (!result?.deletedCount) {
            res.status(404).send(`Employee not found with id: ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.error("Error deleting prtctData:", message);
        res.status(400).send(message);
    }
});