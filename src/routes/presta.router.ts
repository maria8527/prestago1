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
});

router.get("/pesta/:id", async (req: Request, res: Response) => {
    console.log('params: ');
    const id = parseInt(req.params.id);
    const result: QueryResult = await pool.query('SELECT * FROM registro WHERE id = $1', [id]);
    return res.json(result.rows);
});

router.post("/presta", async (req: Request, res: Response) => {
    const {nombrecompleto, fechanacimiento, celular, tipodocumento, numerodoc, profesion,
    direccion, email, rol, contraseña} = req.body;

    const result = await pool.query('INSERT INTO registro VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
    ([nombrecompleto, fechanacimiento, celular, tipodocumento, numerodoc, profesion,
    direccion, email, rol, contraseña]));
    res.json({
        message: 'User register successfully',
        body:{
            user: {nombrecompleto, fechanacimiento, celular, tipodocumento, numerodoc, profesion,
                direccion, email, rol, contraseña}
        }
    })
    return res.json(result.rows);
});

router.put("/presta/:id", async (req: Request, res: Response) =>{
    const id = parseInt(req.params.id);
    const { nombrecompleto, fechanacimiento, celular, tipodocumento, numerodoc, profesion,
        direccion, email, rol, contraseña} = req.body;

    const result = await pool.query('UPDATE users SET nombrecompleto = $1, fechanacimiento = $2, celular = $3, tipodocumento = $4, numerodoc = $5, profesion = $6, direccion = $7, email = $8, rol = $9, contraseña = $10 WHERE id = $11',
    [
        nombrecompleto, 
        fechanacimiento, 
        celular, 
        tipodocumento, 
        numerodoc, 
        profesion,
        direccion, 
        email, 
        rol, 
        contraseña,
        id
    ]);
    res.json('User update!');
});

router.delete("/presta/:id", async (req: Request, res: Response) =>{
    try { 
        const {id} = req.params;
        await pool.query(`DELETE FROM user WHERE id = ${id};`)
        res.status(200).json('User deleted successfully');
    } catch (error) {
        res.status(500).json({error: "Internal server error"});
        console.log(error); 
    }
})



export default router;