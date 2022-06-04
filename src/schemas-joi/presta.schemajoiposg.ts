import Joi, { number, string, date } from 'joi';

const posgrestSchema = Joi.object({
    id: Joi.number(),
    nombre_completo: Joi.string().required(),
    fecha_nacimiento: Joi.date().required(),
    numero_celular: Joi.number().required(),
    tipo_documento: Joi.string().required(),
    N_documento: Joi.number().required(),
    profesion_u_oficio: Joi.string().required(),
    direccion: Joi.string().required(),
    email: Joi.string().required(),
    rol: Joi.string().required(),
    contraseña: Joi.string().required(),
    fecha_pago_cuotas: Joi.date().required(),
    tiempo_pagar: Joi.string().required(),
    cuota_pagar: Joi.number().required(),
    monto_prestar: Joi.number().required(),
    plazo_en_meses: Joi.string().required(),
    fecha_creacion: Joi.date().required(),
    tasa_interes: Joi.string().required(),
    estado: Joi.string().required()
});

export default posgrestSchema;