import * as express from "express";
import { ObjectId, type Collection } from "mongodb";

/**
 * One router for every content collection (replaces six near-identical route files).
 * GET /        all documents
 * GET /:id     one document
 * POST /       create
 * PUT /:id     update (partial, $set)
 * DELETE /:id  delete
 */
export function createContentRouter(label: string, getCollection: () => Collection<any> | undefined) {
    const router = express.Router();
    router.use(express.json());

    const fail = (res: express.Response, status: number, action: string, error: unknown) => {
        const message = error instanceof Error ? error.message : "unknown error";
        console.error(`[${label}] ${action} failed:`, message);
        res.status(status).send(message);
    };

    router.get("/", async (_req, res) => {
        try {
            res.status(200).send(await getCollection()?.find({}).toArray());
        } catch (error) {
            fail(res, 500, "list", error);
        }
    });

    router.get("/:id", async (req, res) => {
        try {
            const doc = await getCollection()?.findOne({ _id: new ObjectId(req.params.id) });
            if (doc) res.status(200).send(doc);
            else res.status(404).send(`${label} not found`);
        } catch (error) {
            fail(res, 400, "get", error);
        }
    });

    router.post("/", async (req, res) => {
        try {
            const result = await getCollection()?.insertOne(req.body);
            if (result?.acknowledged) res.status(201).send({ ...req.body, _id: result.insertedId });
            else res.status(500).send(`Failed to create ${label}`);
        } catch (error) {
            fail(res, 400, "create", error);
        }
    });

    router.put("/:id", async (req, res) => {
        try {
            const result = await getCollection()?.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
            if (result?.matchedCount) res.status(200).send(`Updated ${label} ${req.params.id}`);
            else res.status(404).send(`${label} not found: ${req.params.id}`);
        } catch (error) {
            fail(res, 400, "update", error);
        }
    });

    router.delete("/:id", async (req, res) => {
        try {
            const result = await getCollection()?.deleteOne({ _id: new ObjectId(req.params.id) });
            if (result?.deletedCount) res.status(202).send(`Deleted ${label} ${req.params.id}`);
            else if (!result) res.status(400).send(`Failed to delete ${label} ${req.params.id}`);
            else res.status(404).send(`${label} not found: ${req.params.id}`);
        } catch (error) {
            fail(res, 400, "delete", error);
        }
    });

    return router;
}
