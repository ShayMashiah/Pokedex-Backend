import { Request, Response, NextFunction } from 'express';
import * as userPokemonService from '../services/userPokemonService';
import { BadRequestError, NotFoundError } from '../handlers/errors';

async function addNewPokemonToMyPokemons(req: Request, res: Response, next: NextFunction) {
  const { userId, pokemonId } = req.body;

  try {
    const newPokemon = await userPokemonService.addNewPokemonToMyPokemons(userId, pokemonId);
    res.status(201).json(newPokemon);
  } catch (error) {
    if (error instanceof BadRequestError) {
      res.status(400).json({ message: error.message });
      return;
    }
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    console.error('Error in addNewPokemonToMyPokemons:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function getAllPokemonsByUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = +req.params.userId;
  const search = req.query.search as string | undefined;
  const sortBy = (req.query.sortBy as string) || "id";
  const order = (req.query.order as "asc" | "desc") || "asc";
  const limit = req.query.limit ? +req.query.limit : 10;
  const page = req.query.page ? +req.query.page : 1;

  try {
      const { data, totalCount } = await userPokemonService.getAllPokemonsByUserId(
        userId,
        sortBy,
        order,
        search,
        limit,
        page
      );
      const totalPages = Math.ceil(totalCount / limit);

      res.json({
        data,
        totalCount,
        totalPages,
        currentPage: page,
      });
  } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(404).json({ message: error.message });
        return;
      }
      console.error("Error in getAllPokemonsByUserId:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
}

export default {addNewPokemonToMyPokemons,getAllPokemonsByUserId};
