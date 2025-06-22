import { Router } from 'express';
import { pokemonSchema } from '../validations/pokemonsValidation';
import { validate } from '../validations/validate';
import userController from '../controllers/userController';

const router = Router();

router.get('/', userController.getAllUsers);

export default router;
