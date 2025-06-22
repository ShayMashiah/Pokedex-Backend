import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.send('Get my Pokémons');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Get my Pokémon with ID: ${id}`);
});

router.post('/', (req, res) => {
  res.send('add a new Pokémon to my Pokemons');
});

export default router;
