import { Router } from 'express';
import pokemonController from '../controllers/pokemonController';
import { validatePokemonId, validateQuery } from '../validations/validate';
import { querySchema } from '../validations/queryValidation';

const router = Router();

router.get('/:id',validatePokemonId, pokemonController.getPokemonById);

router.get('/', validateQuery(querySchema), pokemonController.getAllPokemons);

export default router;
