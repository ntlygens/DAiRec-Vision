import * as mongodb from "mongodb";
import type { UserInterface, ServiceScreenInterface } from "./interface.ts"

export const uiDataCollections: {
    userInterface?: mongodb.Collection<UserInterface>;
} = {};
export const ssiDataCollections: {
    srvcscrnInterface?: mongodb.Collection<ServiceScreenInterface>;
} = {};

export async function connectToDatabase(uri: string) {
    const client: mongodb.MongoClient = new mongodb.MongoClient(uri);
    await client.connect().then(() => {
        console.log("MongoDB connected");
    }).catch((error) => {
        console.error("MongoDB connection error:", error);
        throw error;
    });

    const db: mongodb.Db = client.db("ODM");
    const userInterfaceCollction = db.collection<UserInterface>("userInterface");
    const srvcScrnCollection = db.collection<ServiceScreenInterface>("srvcscrnInterface");

    uiDataCollections.userInterface = userInterfaceCollction;
    ssiDataCollections.srvcscrnInterface = srvcScrnCollection;

    console.log(`Successfully connected to database:
         ${db.databaseName} and collections:
           ${userInterfaceCollction.collectionName}
           and
           ${srvcScrnCollection.collectionName}
           `
        );
}

