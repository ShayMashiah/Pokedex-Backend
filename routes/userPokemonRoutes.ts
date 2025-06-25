import { Router } from 'express';
import userPokemonController from '../controllers/userPokemonController';
import { validate, validateUserIdParam } from '../validations/validate';
import { userPokemonSchema } from '../validations/userPokemonValidation';

const router = Router();

router.post('/',validate(userPokemonSchema), userPokemonController.addNewPokemonToMyPokemons);

router.get("/:userId", validateUserIdParam, userPokemonController.getAllPokemonsByUserId);

export default router;
