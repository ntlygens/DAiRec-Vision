import * as mongodb from "mongodb";
import type { UserInterface, ServiceScreenInterface, ProtectSrvcsInterface } from "./interface.ts"

export const uiDataCollections: {
    userInterface?: mongodb.Collection<UserInterface>;
} = {};
export const ssiDataCollections: {
    srvcscrnInterface?: mongodb.Collection<ServiceScreenInterface>;
} = {};
export const prtctDataCollections: {
    prtctSrvcsInterface?: mongodb.Collection<ProtectSrvcsInterface>;
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
    const db2: mongodb.Db = client.db("drvdata");
    const userInterfaceCollction = db.collection<UserInterface>("userInterface");
    const srvcScrnCollection = db.collection<ServiceScreenInterface>("srvcscrnInterface");
    const prtctSrvcsCollection = db2.collection<ProtectSrvcsInterface>("protectPgData");

    uiDataCollections.userInterface = userInterfaceCollction;
    ssiDataCollections.srvcscrnInterface = srvcScrnCollection;
    prtctDataCollections.prtctSrvcsInterface = prtctSrvcsCollection;

    
    console.log(`Successfully connected to database:
         ${db.databaseName} and ${db2.databaseName} collections:
           ${userInterfaceCollction.collectionName},           
           ${srvcScrnCollection.collectionName}
           and
           ${prtctSrvcsCollection.collectionName}!!
           `
        );
}

