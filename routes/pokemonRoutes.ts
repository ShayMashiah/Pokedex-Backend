import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.send('Get all Pokémon');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Get Pokémon with ID: ${id}`);
});

export default router;
