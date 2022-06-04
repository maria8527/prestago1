import Joi, { number, string, date } from 'joi';

const prestamoSchema = Joi.object({
    id: Joi.number(),
    nombre_completo: Joi.string().required(),
    fecha_pago_cuotas: Joi.date().required(),
    tiempo_pagar: Joi.string().required(),
    cuota_pagar: Joi.number().required(),
    monto_prestar: Joi.number().required(),
    plazo_en_meses: Joi.string().required(),
    fecha_creacion: Joi.date().required(),
    tasa_interes: Joi.string().required(),
    estado: Joi.string().required()
 });

 export default prestamoSchema;