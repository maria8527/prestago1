import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import presta from "../models/presta";
import { collections } from "../services/database.service";
import { decodeToken } from "../firebase/adminTokens";
export const prestaRouter = express.Router();
prestaRouter.use(express.json());


prestaRouter.get("/mongo", decodeToken ,async (_req: Request, res: Response) => {
    try {
        const user_no_register = await collections.user_no_register.find({}).toArray();
        res.status(200).send(user_no_register);
    } catch (error) {
        res.status(500).send(error.message);
    }
});