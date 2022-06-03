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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pool = require('../services/db');
const router = (0, express_1.Router)();
router.get("/presta", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield pool.query("SELECT * FROM registro");
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}));
router.get("/pesta/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('params: ');
    const id = parseInt(req.params.id);
    const result = yield pool.query('SELECT * FROM registro WHERE id = $1', [id]);
    return res.json(result.rows);
}));
router.post("/presta", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombrecompleto, fechanacimiento, celular, tipodocumento, numerodoc, profesion, direccion, email, rol, contraseña } = req.body;
    const result = yield pool.query('INSERT INTO registro VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)', ([nombrecompleto, fechanacimiento, celular, tipodocumento, numerodoc, profesion,
        direccion, email, rol, contraseña]));
    res.json({
        message: 'User register successfully',
        body: {
            user: { nombrecompleto, fechanacimiento, celular, tipodocumento, numerodoc, profesion,
                direccion, email, rol, contraseña }
        }
    });
    return res.json(result.rows);
}));
router.put("/presta/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { nombrecompleto, fechanacimiento, celular, tipodocumento, numerodoc, profesion, direccion, email, rol, contraseña } = req.body;
    const result = yield pool.query('UPDATE users SET nombrecompleto = $1, fechanacimiento = $2, celular = $3, tipodocumento = $4, numerodoc = $5, profesion = $6, direccion = $7, email = $8, rol = $9, contraseña = $10 WHERE id = $11', [
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
}));
router.delete("/presta/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.default = router;
//# sourceMappingURL=presta.router.js.map