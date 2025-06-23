import { Router } from 'express';
import pokemonController from '../controllers/pokemonController';
import  {validatePokemonQueryParams}  from '../validations/validate';

const router = Router();

router.get('/', validatePokemonQueryParams, pokemonController.getAllPokemons);

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Get Pokémon with ID: ${id}`);
});

export default router;
