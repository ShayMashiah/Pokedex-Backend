import Joi from 'joi';

export const pokemonIdSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
});
