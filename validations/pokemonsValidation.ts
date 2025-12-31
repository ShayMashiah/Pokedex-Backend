import Joi from 'joi';
import { PokemonType } from '../lib/types';

const pokemonTypes = Object.values(PokemonType);

export const pokemonSchema = Joi.object({
  id: Joi.number().integer().required(),

  nameEnglish: Joi.string().required(),

  type: Joi.array().items(Joi.string().valid(...pokemonTypes)).required(),

  hp: Joi.number().integer().required(),
  attack: Joi.number().integer().required(),
  defense: Joi.number().integer().required(),
  spAttack: Joi.number().integer().required(),
  spDefense: Joi.number().integer().required(),
  speed: Joi.number().integer().required(),

  species: Joi.string().required(),
  description: Joi.string().required(),

  height: Joi.string().optional().allow(null, ''),
  weight: Joi.string().optional().allow(null, ''),
  gender: Joi.string().optional().allow(null, ''),
  ability: Joi.array().items(Joi.array().items(Joi.string())).optional().allow(null),

  imageSprite: Joi.string().uri().optional().allow(null, ''),
  imageThumbnail: Joi.string().uri().optional().allow(null, ''),
  imageHires: Joi.string().uri().optional().allow(null, ''),

});
