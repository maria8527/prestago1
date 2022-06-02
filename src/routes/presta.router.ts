import {Router} from 'express'; 
import express, { Request, Response } from 'express';
import { QueryResult } from 'pg';
const pool = require('../services/db');

const router = Router();

router.get("/presta", async (req: Request, res: Response) => {
    try { 
        const result: QueryResult = await pool.query("SELECT * FROM registro");
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json(error);
        console.log(error); 
    }

})



export default router;