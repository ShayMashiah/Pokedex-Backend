import { Router } from 'express';
import pokemonRoutes from './pokemonRoutes';
import userRoutes from './userRoutes';
import userPokemonRoutes from './userPokemonRoutes';

const router = Router();

const routesList = [
  { path: '/pokemons', handler: pokemonRoutes },
  { path: '/users', handler: userRoutes },
  { path: '/userpokemons', handler: userPokemonRoutes },
  
];

routesList.forEach(({ path, handler }) => {
  router.use(path, handler);
});

export default router;
