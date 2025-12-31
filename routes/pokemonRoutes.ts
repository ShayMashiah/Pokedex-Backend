import { Router } from 'express';
import pokemonController from '../controllers/pokemonController';
import { validateId, validateParams } from '../validations/validate';
import { pokemonsParamsSchema } from '../validations/pokemonParamsAndQueryValidation';
import { pokemonIdSchema } from '../validations/pokemonIdValidation';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Pokemons
 *   description: Operations related to Pokémons
 */


/**
 * @swagger
 * /api/v1/pokemons/{id}:
 *   get:
 *     summary: Get a Pokémon by ID
 *     tags: [Pokemons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the Pokémon
 *     responses:
 *       200:
 *         description: A Pokémon object
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: Pokémon not found
 */
router.get('/:id', validateId(pokemonIdSchema), pokemonController.getPokemonById);

/**
 * @swagger
 * /api/v1/pokemons:
 *   get:
 *     summary: Get a list of Pokémon
 *     tags: [Pokemons]
 *     parameters:
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
 *         description: A list of Pokémon
 */

router.get('/', validateParams(pokemonsParamsSchema), pokemonController.getAllPokemons);



export default router;
