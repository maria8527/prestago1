"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_joi_validation_1 = require("express-joi-validation");
const adminTokens_1 = require("../firebase/adminTokens");
const validator_1 = __importDefault(require("../utilities/validator"));
const registro_schema_1 = __importDefault(require("../schemas-joi/registro.schema"));
const prestamo_schema_1 = __importDefault(require("../schemas-joi/prestamo.schema"));
const pago_schema_1 = __importDefault(require("../schemas-joi/pago.schema"));
const pool = require('../services/db');
const router = (0, express_1.Router)();
router.use((err, _req, res, next) => {
    if (err && err.type in express_joi_validation_1.ContainerTypes) {
        const e = err;
        res.status(400).send(`You submitted a bad ${e.type} paramater`);
    }
    else {
        res.status(500).send('Internal server error');
    }
});
router.get("/registro", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield pool.query("SELECT * FROM registro");
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}));
router.get("/registro/:id", adminTokens_1.decodeToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('params: ');
    try {
        const id = parseInt(req.params.id);
        const result = yield pool.query('SELECT * FROM registro WHERE id = $1', [id]);
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}));
router.post("/registro", adminTokens_1.decodeToken, validator_1.default.body(registro_schema_1.default), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre_completo, fecha_nacimiento, numero_celular, tipo_documento, N_documento, profesion_u_oficio, direccion, email, rol, contraseña } = req.body;
        const result = yield pool.query('INSERT INTO registro VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)', ([nombre_completo, fecha_nacimiento, numero_celular, tipo_documento, N_documento, profesion_u_oficio,
            direccion, email, rol, contraseña]));
        res.json({
            message: 'User register successfully',
            body: {
                user: { nombre_completo, fecha_nacimiento, numero_celular, tipo_documento, N_documento, profesion_u_oficio,
                    direccion, email, rol, contraseña }
            }
        });
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}));
router.put("/registro/:id", adminTokens_1.decodeToken, validator_1.default.body(registro_schema_1.default), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { nombre_completo, fecha_nacimiento, numero_celular, tipo_documento, N_documento, profesion_u_oficio, direccion, email, rol, contraseña } = req.body;
        const result = yield pool.query('UPDATE users SET nombrecompleto = $1, fechanacimiento = $2, celular = $3, tipodocumento = $4, numerodoc = $5, profesion = $6, direccion = $7, email = $8, rol = $9, contraseña = $10 WHERE id = $11', [
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
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}));
router.delete("/registro/:id", validator_1.default.body(registro_schema_1.default), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield pool.query(`DELETE FROM user WHERE id = ${id};`);
        res.status(200).json('User deleted successfully');
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.log(error);
    }
}));
router.get("/prestamo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield pool.query("SELECT * FROM prestamo");
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}));
router.get("/prestamo/:id", adminTokens_1.decodeToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('params: ');
        const id = parseInt(req.params.id);
        const result = yield pool.query('SELECT * FROM prestamo WHERE id = $1', [id]);
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}));
router.post("/prestamo", adminTokens_1.decodeToken, validator_1.default.body(prestamo_schema_1.default), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre_completo, fecha_creacion, monto_prestar, plazo_en_meses, tasa_interes, estado } = req.body;
        const result = yield pool.query('INSERT INTO prestamo VALUES ($1,$2,$3,$4,$5,$6,$7)', ([nombre_completo, fecha_creacion, monto_prestar, plazo_en_meses, tasa_interes, estado]));
        res.json({
            message: 'lend lease register successfully',
            body: {
                user: { nombre_completo, fecha_creacion, monto_prestar, plazo_en_meses, tasa_interes, estado }
            }
        });
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}));
router.put("/prestamo/:id", adminTokens_1.decodeToken, validator_1.default.body(prestamo_schema_1.default), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { nombre_completo, fecha_creacion, monto_prestar, plazo_en_meses, tasa_interes, estado } = req.body;
        const result = yield pool.query('UPDATE prestamo SET nombrecompleto = $1, fechacreacion = $2, montoprestar = $3, plazoenmese = $4, tasainteres = $5, estado = $6 WHERE id = $7', [nombre_completo,
            fecha_creacion,
            monto_prestar,
            plazo_en_meses,
            tasa_interes,
            estado,
            id
        ]);
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}));
router.delete("/prestamo/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield pool.query(`DELETE FROM prestamo  WHERE id = ${id};`);
        res.status(200).json('lend lease deleted successfully');
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.log(error);
    }
}));
router.get("/pago", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield pool.query("SELECT * FROM pago");
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}));
router.get("/pago/:id", adminTokens_1.decodeToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('params: ');
        const id = parseInt(req.params.id);
        const result = yield pool.query('SELECT * FROM pago WHERE id = $1', [id]);
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}));
router.post("/pago", adminTokens_1.decodeToken, validator_1.default.body(pago_schema_1.default), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fecha_pago_cuotas, tiempo_pagar, cuota_pagar } = req.body;
        const result = yield pool.query('INSERT INTO pago VALUES ($1,$2,$3,$4,)', ([fecha_pago_cuotas, tiempo_pagar, cuota_pagar]));
        res.json({
            message: 'pyment register successfully',
            body: {
                user: { fecha_pago_cuotas, tiempo_pagar, cuota_pagar }
            }
        });
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}));
router.put("/pago/:id", adminTokens_1.decodeToken, validator_1.default.body(pago_schema_1.default), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { fecha_pago_cuotas, tiempo_pagar, cuota_pagar } = req.body;
        const result = yield pool.query('UPDATE pago SET fechapagocuotas = $1, tiempopagar = $2, cuotapagar = $3 WHERE id = $4', [fecha_pago_cuotas,
            tiempo_pagar,
            cuota_pagar,
            id
        ]);
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}));
router.delete("/pago/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield pool.query(`DELETE FROM pago  WHERE id = ${id};`);
        res.status(200).json('payment deleted successfully');
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.log(error);
    }
}));
router.get("/historial", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield pool.query("SELECT * FROM historial");
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}));
router.get("/historial/:id", adminTokens_1.decodeToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('params: ');
        const id = parseInt(req.params.id);
        const result = yield pool.query('SELECT * FROM hitorial WHERE id = $1', [id]);
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}));
router.delete("/historial/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield pool.query(`DELETE FROM historial  WHERE id = ${id};`);
        res.status(200).json('historial deleted successfully');
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.log(error);
    }
}));
exports.default = router;
//# sourceMappingURL=presta.router.js.map