import {Router} from 'express'; 
import express, { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { ContainerTypes, ExpressJoiError } from "express-joi-validation";
import { NextFunction } from "express";
import { decodeToken } from '../firebase/adminTokens';
import validator from '../utilities/validator';
import registroSchema  from '../schemas-joi/presta.schemajoiposg';
import  prestamoSchema from '../schemas-joi/prestamo.schemajoi';
import pagoSchema from '../schemas-joi/pago.schemajoi'
const pool = require('../services/db');

const router = Router();

router.use((err: any|ExpressJoiError, _req: Request, res: Response, next: NextFunction) => {
    if (err && err.type in ContainerTypes){
        const e: ExpressJoiError = err
        res.status(400).send(`You submitted a bad ${e.type} paramater`)
    }else{
        res.status(500).send('Internal server error')

    }
});
router.get("/registro", async (req: Request, res: Response) => {
    try { 
        const result: QueryResult = await pool.query("SELECT * FROM registro");
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json(error);
        console.log(error); 
    }
});

router.get("/registro/:id", decodeToken, async (req: Request, res: Response) => {
    console.log('params: ');
    try{
    const id = parseInt(req.params.id);
    const result: QueryResult = await pool.query('SELECT * FROM registro WHERE id = $1', [id]);
    res.status(200).json(result.rows);
    }catch(error){
        res.status(500).json(error);
        console.log(error); 
    }
});

router.post("/registro", decodeToken, validator.body(registroSchema), async (req: Request, res: Response) => {
    try{ 
    const {nombre_completo, fecha_nacimiento, numero_celular, tipo_documento, N_documento, profesion_u_oficio,
    direccion, email, rol, contraseña} = req.body;

    const result = await pool.query('INSERT INTO registro VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
    ([nombre_completo, fecha_nacimiento, numero_celular, tipo_documento, N_documento, profesion_u_oficio,
    direccion, email, rol, contraseña]));
    res.json({
        message: 'User register successfully',
        body:{
            user: {nombre_completo, fecha_nacimiento, numero_celular, tipo_documento, N_documento, profesion_u_oficio,
                direccion, email, rol, contraseña}
                
        }   
    });
    res.status(200).json(result.rows);

   }catch(error){
    res.status(500).json(error);
    console.log(error); 
}
    
});

router.put("/registro/:id", decodeToken, validator.body(registroSchema), async (req: Request, res: Response) =>{
    try{
    const id = parseInt(req.params.id);
    const { nombre_completo, fecha_nacimiento, numero_celular, tipo_documento, N_documento, profesion_u_oficio,
    direccion, email, rol, contraseña} = req.body;

    const result = await pool.query('UPDATE users SET nombrecompleto = $1, fechanacimiento = $2, celular = $3, tipodocumento = $4, numerodoc = $5, profesion = $6, direccion = $7, email = $8, rol = $9, contraseña = $10 WHERE id = $11',
    [
        nombre_completo, 
        fecha_nacimiento, 
        numero_celular, 
        tipo_documento, 
        N_documento, 
        profesion_u_oficio,
        direccion, 
        email, 
        rol, 
        contraseña,
        id
    ]);
    res.status(200).json(result.rows);
    res.json('User update!');

    }catch(error){
    res.status(500).json(error);
    console.log(error); 
}
});

router.delete("/registro/:id", validator.body(registroSchema), async (req: Request, res: Response) =>{
    try { 
        const {id} = req.params;
        await pool.query(`DELETE FROM user WHERE id = ${id};`)
        res.status(200).json('User deleted successfully');
    } catch (error) {
        res.status(500).json({error: "Internal server error"});
        console.log(error); 
    }
});



export default router;