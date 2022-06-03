import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import presta from "../models/presta";
import { collections } from "../services/database.service";
export const prestaRouter = express.Router();
prestaRouter.use(express.json());

prestaRouter.get("/mongo", decodeToken, async (_req: Request, res: Response) => {
    try {
        const user_no_register = await collections.user_no_register.find({}).toArray();
        res.status(200).send(user_no_register);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

prestaRouter.post("/mongo", decodeToken, async (_req: Request, res: Response) => {
    try {
        const newUser_no_register = _req.body;
        const result = await collections.user_no_register.insertOne(newUser_no_register);
        result
            ? res.status(201).send(`Successfully created a new user no register with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new user no register.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

prestaRouter.put("/mongo:id", decodeToken, async (_req: Request, res: Response) => {
    const id = _req.params.id;

    try {
        const updatedUser_no_register = _req.body;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.user_no_register.updateOne(query, { $set: updatedUser_no_register });
        result
            ? res.status(200).send(`Successfully updated user with id ${id}`)
            : res.status(304).send(`User with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

prestaRouter.delete("mongo/:id", decodeToken, async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.user_no_register.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed user with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove user no register with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`User with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});