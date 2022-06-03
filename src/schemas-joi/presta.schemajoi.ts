import Joi from 'joi';

const prestaSchema = Joi.object({
    id: Joi.string(),
    full_name: Joi.string().required(),
    email: Joi.string().required(),
    monto_prestar: Joi.number().required(),
    plazo_meses: Joi.string().required()
});

export default prestaSchema;