import { Router } from 'express';
import userPokemonController from '../controllers/userPokemonController';
import { validate } from '../validations/validate';
import { userPokemonSchema } from '../validations/userPokemonValidation';

const router = Router();

router.post('/',validate(userPokemonSchema), userPokemonController.addNewPokemonToMyPokemons);

export default router;
