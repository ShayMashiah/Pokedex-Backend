import { Router } from 'express';
import { pokemonSchema } from '../validations/pokemonsValidation';
import { validate } from '../validations/validate';

const router = Router();

router.get('/', (_req, res) => {
  res.send('Get my Pokémons');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Get my Pokémon with ID: ${id}`);
});

router.post('/', validate(pokemonSchema), (req, res) => {
  res.send('add a new Pokémon to my Pokemons');
});

export default router;
