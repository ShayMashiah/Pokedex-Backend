import { Router } from 'express';
import userPokemonController from '../controllers/userPokemonController';
import { validate, validateId, validateParams } from '../validations/validate';
import { userPokemonSchema } from '../validations/userPokemonValidation';
import { paramsSchema } from '../validations/userPokemonParamsAndQueryValidation';


const router = Router();

router.post('/',validate(userPokemonSchema), userPokemonController.addNewPokemonToMyPokemons);

router.get("/:userId", validateParams(paramsSchema) ,userPokemonController.getAllPokemonsByUserId);

export default router;
