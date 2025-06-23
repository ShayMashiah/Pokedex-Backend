import { Router } from 'express';
import pokemonController from '../controllers/pokemonController';
import { validatePokemonId } from '../validations/validate';
import  {validatePokemonQueryParams}  from '../validations/validate';

const router = Router();

router.get('/:id',validatePokemonId, pokemonController.getPokemonById);

router.get('/', validatePokemonQueryParams, pokemonController.getAllPokemons);

export default router;
