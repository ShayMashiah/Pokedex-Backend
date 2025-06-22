import { Router } from 'express';
import userPokemonController from '../controllers/userPokemonController';

const router = Router();

router.post('/', userPokemonController.addNewPokemon);

router.get('/user/:userId',(_req, res) => {
  res.send('Get Pokemons By User');
});


export default router;
