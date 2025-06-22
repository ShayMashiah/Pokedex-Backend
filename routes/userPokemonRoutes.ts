import { Router } from 'express';

const router = Router();

router.post('/', (_req, res) => {
  res.send('Create User Pokemon link');
});

router.get('/user/:userId',(_req, res) => {
  res.send('Get Pokemons By User');
});


export default router;
