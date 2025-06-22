import { Router } from 'express';
import pokemonController from '../controllers/pokemonController';


const router = Router();

router.get('/', pokemonController.getAllPokemons);

router.get('/:id', pokemonController.getPokemonById);

export default router;
