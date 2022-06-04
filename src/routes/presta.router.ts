import {Router} from 'express'; 
import express, { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { ContainerTypes, ExpressJoiError } from "express-joi-validation";
import { NextFunction } from "express";
import { decodeToken } from '../firebase/adminTokens';
import validator from '../utilities/validator';
import posgrestSchema from '../schemas-joi/presta.schemajoiposg';
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
router.get("/presta", async (req: Request, res: Response) => {
    try { 
        const result: QueryResult = await pool.query("SELECT * FROM registro");
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json(error);
        console.log(error); 
    }
});

router.get("/presta/:id", decodeToken, async (req: Request, res: Response) => {
    console.log('params: ');
    const id = parseInt(req.params.id);
    const result: QueryResult = await pool.query('SELECT * FROM registro WHERE id = $1', [id]);
    return res.json(result.rows);
});

router.post("/presta", decodeToken, validator.body(posgrestSchema), async (req: Request, res: Response) => {
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
    })
    return res.json(result.rows);
});

router.put("/presta/:id", decodeToken, validator.body(posgrestSchema), async (req: Request, res: Response) =>{
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
    res.json('User update!');
});

router.delete("/presta/:id", validator.body(posgrestSchema), async (req: Request, res: Response) =>{
    try { 
        const {id} = req.params;
        await pool.query(`DELETE FROM user WHERE id = ${id};`)
        res.status(200).json('User deleted successfully');
    } catch (error) {
        res.status(500).json({error: "Internal server error"});
        console.log(error); 
    }
});

router.get("/presta", async (req: Request, res: Response) => {
    try { 
        const result: QueryResult = await pool.query("SELECT * FROM prestamo");
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json(error);
        console.log(error); 
    }
});

router.get("/presta/:id", decodeToken, async (req: Request, res: Response) => {
    console.log('params: ');
    const id = parseInt(req.params.id);
    const result: QueryResult = await pool.query('SELECT * FROM prestamo WHERE id = $1', [id]);
    return res.json(result.rows);
});

router.post("/presta", decodeToken, validator.body(posgrestSchema), async (req: Request, res: Response) => {
    const {nombre_completo, fecha_creacion, monto_prestar, plazo_en_meses, tasa_interes, estado} = req.body;

    const result = await pool.query('INSERT INTO prestamo VALUES ($1,$2,$3,$4,$5,$6,$7)',
    ([nombre_completo, fecha_creacion, monto_prestar, plazo_en_meses, tasa_interes, estado ]));
    res.json({
        message: 'lend lease register successfully',
        body:{
            user: {nombre_completo, fecha_creacion, monto_prestar, plazo_en_meses, tasa_interes, estado}
        }
    })
    return res.json(result.rows);
});

router.put("/presta/:id", decodeToken, validator.body(posgrestSchema), async (req: Request, res: Response) =>{
    const id = parseInt(req.params.id);
    const { nombre_completo, fecha_creacion, monto_prestar, plazo_en_meses, tasa_interes, estado} = req.body;

    const result = await pool.query('UPDATE prestamo SET nombrecompleto = $1, fechacreacion = $2, montoprestar = $3, plazoenmese = $4, tasainteres = $5, estado = $6 WHERE id = $7',
    [   nombre_completo, 
        fecha_creacion,
        monto_prestar,
        plazo_en_meses,
        tasa_interes,
        estado,
        id
    ]);
    res.json('lend lease update!');
});

router.delete("/presta/:id", validator.body(posgrestSchema), async (req: Request, res: Response) =>{
    try { 
        const {id} = req.params;
        await pool.query(`DELETE FROM prestamo  WHERE id = ${id};`)
        res.status(200).json('lend lease deleted successfully');
    } catch (error) {
        res.status(500).json({error: "Internal server error"});
        console.log(error); 
    }
});

router.get("/presta", async (req: Request, res: Response) => {
    try { 
        const result: QueryResult = await pool.query("SELECT * FROM pago");
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json(error);
        console.log(error); 
    }
});

router.get("/presta/:id", decodeToken, async (req: Request, res: Response) => {
    console.log('params: ');
    const id = parseInt(req.params.id);
    const result: QueryResult = await pool.query('SELECT * FROM pago WHERE id = $1', [id]);
    return res.json(result.rows);
});

router.post("/presta", decodeToken, validator.body(posgrestSchema), async (req: Request, res: Response) => {
    const {fecha_pago_cuotas,tiempo_pagar,cuota_pagar} = req.body;

    const result = await pool.query('INSERT INTO pago VALUES ($1,$2,$3,$4,)',
    ([fecha_pago_cuotas,tiempo_pagar,cuota_pagar ]));
    res.json({
        message: 'pyment register successfully',
        body:{
            user: {fecha_pago_cuotas,tiempo_pagar,cuota_pagar}
        }
    })
    return res.json(result.rows);
});


router.put("/presta/:id", decodeToken, validator.body(posgrestSchema), async (req: Request, res: Response) =>{
    const id = parseInt(req.params.id);
    const { fecha_pago_cuotas,tiempo_pagar,cuota_pagar} = req.body;

    const result = await pool.query('UPDATE pago SET fechapagocuotas = $1, tiempopagar = $2, cuotapagar = $3 WHERE id = $4',
    [   fecha_pago_cuotas,
        tiempo_pagar,
        cuota_pagar,
        id
    ]);
    res.json('payment update!');
});

router.delete("/presta/:id", validator.body(posgrestSchema), async (req: Request, res: Response) =>{
    try { 
        const {id} = req.params;
        await pool.query(`DELETE FROM pago  WHERE id = ${id};`)
        res.status(200).json('payment deleted successfully');
    } catch (error) {
        res.status(500).json({error: "Internal server error"});
        console.log(error); 
    }
});

router.get("/presta", async (req: Request, res: Response) => {
    try { 
        const result: QueryResult = await pool.query("SELECT * FROM historial");
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json(error);
        console.log(error); 
    }
});

router.get("/presta/:id", decodeToken, async (req: Request, res: Response) => {
    console.log('params: ');
    const id = parseInt(req.params.id);
    const result: QueryResult = await pool.query('SELECT * FROM hitorial WHERE id = $1', [id]);
    return res.json(result.rows);
});

router.delete("/presta/:id", validator.body(posgrestSchema), async (req: Request, res: Response) =>{
    try { 
        const {id} = req.params;
        await pool.query(`DELETE FROM historial  WHERE id = ${id};`)
        res.status(200).json('historial deleted successfully');
    } catch (error) {
        res.status(500).json({error: "Internal server error"});
        console.log(error); 
    }
});

export default router;
