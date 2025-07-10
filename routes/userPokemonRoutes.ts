import { Router } from 'express';
import userPokemonController from '../controllers/userPokemonController';
import { validate, validateId, validateParams } from '../validations/validate';
import { userPokemonSchema } from '../validations/userPokemonValidation';
import { paramsSchema } from '../validations/userPokemonParamsAndQueryValidation';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: UserPokemons
 *   description: Operations related to user's Pokémon
 */

/**
 * @swagger
 * /api/v1/userpokemons:
 *   post:
 *     summary: Add a new Pokémon to user's collection
 *     tags: [UserPokemons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPokemon'
 *     responses:
 *       201:
 *         description: Pokémon added to user's collection
 *       400:
 *         description: Validation error
 */
router.post('/', validate(userPokemonSchema), userPokemonController.addNewPokemonToMyPokemons);

/**
 * @swagger
 * /api/v1/userpokemons/{userId}:
 *   get:
 *     summary: Get all Pokémons for a specific user
 *     tags: [UserPokemons]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: A list of user's Pokémons
 *       400:
 *         description: Validation error
 *       404:
 *         description: User not found or no Pokémons
 */
router.get("/:userId", validateParams(paramsSchema), userPokemonController.getAllPokemonsByUserId);


export default router;
