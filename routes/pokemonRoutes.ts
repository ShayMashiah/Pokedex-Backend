import { Router } from 'express';
import pokemonController from '../controllers/pokemonController';


const router = Router();

router.get('/', pokemonController.getAllPokemons);

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Get Pokémon with ID: ${id}`);
});

export default router;
