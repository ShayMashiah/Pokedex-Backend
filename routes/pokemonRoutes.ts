import { Router } from 'express';
import pokemonController from '../controllers/pokemonController';
import { validateId, validateParams } from '../validations/validate';
import { pokemonsParamsSchema } from '../validations/pokemonParamsAndQueryValidation';
import { pokemonIdSchema } from '../validations/pokemonIdValidation';

const router = Router();

router.get('/:id',validateId(pokemonIdSchema), pokemonController.getPokemonById);

router.get('/', validateParams(pokemonsParamsSchema), pokemonController.getAllPokemons);

export default router;
