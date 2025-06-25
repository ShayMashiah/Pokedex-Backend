import { Router } from 'express';
import userPokemonController from '../controllers/userPokemonController';
import { validate, validateUserIdParam, validateSearchParam } from '../validations/validate';
import { userPokemonSchema } from '../validations/userPokemonValidation';

const router = Router();

router.post('/',validate(userPokemonSchema), userPokemonController.addNewPokemonToMyPokemons);

router.get("/:userId", validateSearchParam , validateUserIdParam ,userPokemonController.getAllPokemonsByUserId);

export default router;
