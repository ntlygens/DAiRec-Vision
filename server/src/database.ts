import * as mongodb from "mongodb";
// import type { Employee } from "./employee.ts";
import type { UserInterface, ServiceScreenInterface } from "./interface.ts"
// export const collections: {
//     employees?: mongodb.Collection<Employee>;
// } = {};
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
    // await applySchemaValidation(db);

    // const employeesCollection = db.collection<Employee>("employees");
    const userInterfaceCollction = db.collection<UserInterface>("userInterface");
    const srvcScrnCollection = db.collection<ServiceScreenInterface>("srvcscrnInterface");

    // collections.employees = employeesCollection;
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

async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "position", "level"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                position: {
                    bsonType: "string",
                    description: "'position' is required and is a string",
                },
                level: {
                    enum: ["junior", "mid", "senior"],
                    description: "'level' is required and must be one of 'junior', 'mid', 'senior'",
                },
            },
        }
    };

    // Try to update existing collection validator; if the collection doesn't exist create it.
    try {
        await db.command({
            collMod: "employees",
            validator: jsonSchema,
            validationLevel: "strict",
        });
    } catch (error: any) {
        // If the collection does not exist, create it with the validator
        if (error.codeName === "NamespaceNotFound" || /does not exist/i.test(error.message || "")) {
            await db.createCollection("employees", { validator: jsonSchema, validationLevel: "strict" });
        } else {
            throw error;
        }
    }
}
