import { Router } from 'express';
import pokemonRoutes from './pokemonRoutes';
import userRoutes from './userRoutes';

const router = Router();

const routesList = [
  { path: '/pokemons', handler: pokemonRoutes },
  { path: '/users', handler: userRoutes },
];

routesList.forEach(({ path, handler }) => {
  router.use(path, handler);
});

export default router;
