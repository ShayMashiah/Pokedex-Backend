import Joi from 'joi';
import { pokemonSchema } from './pokemonsValidation';

export const userSchema = Joi.object({
  id: Joi.number().integer(), 
  pokemons: Joi.array().items(pokemonSchema).optional(),
});
