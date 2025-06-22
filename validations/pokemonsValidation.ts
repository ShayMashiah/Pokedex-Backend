import Joi from 'joi';

export const pokemonSchema = Joi.object({
  id: Joi.number().integer().required(),
  nameEnglish: Joi.string().required(),
  nameJapanese: Joi.string().optional().allow(null, ''),
  nameChinese: Joi.string().optional().allow(null, ''),
  nameFrench: Joi.string().optional().allow(null, ''),
  type: Joi.array().items(Joi.string()).required(),
  hp: Joi.number().integer().required(),
  attack: Joi.number().integer().required(),
  defense: Joi.number().integer().required(),
  spAttack: Joi.number().integer().required(),
  spDefense: Joi.number().integer().required(),
  speed: Joi.number().integer().required(),
  species: Joi.string().required(),
  description: Joi.string().required(),
  evolution: Joi.object().optional().allow(null),
  profile: Joi.object().optional().allow(null),
  image: Joi.object().optional().allow(null),
  ownerId: Joi.number().integer().optional().allow(null),
});
