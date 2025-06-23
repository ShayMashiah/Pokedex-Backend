import Joi from 'joi';

export const userPokemonSchema = Joi.object({
    userId: Joi.number().integer().required(),
    pokemonId: Joi.number().integer().required(),
});
