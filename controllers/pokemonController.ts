import { Request, Response, NextFunction } from 'express';
import * as pokemonService from '../services/pokemonService';
import { BadRequestError, NotFoundError } from '../handlers/errors';

async function getAllPokemons(req: Request, res: Response, next: NextFunction) {
  try {
    const sortBy = (req.query.sortBy as string) || 'id';
    const order = (req.query.order as 'asc' | 'desc') || 'asc';
    const search = req.query.search as string | undefined;
    const limit = req.query.limit !== undefined ? +req.query.limit : 10;
    const page = req.query.page ? +req.query.page : 1;


    const { data, totalCount } = await pokemonService.getAllPokemons(
      sortBy,
      order,
      search,
      limit,
      page
    );

    const totalPages = limit > 0 ? Math.ceil(totalCount / limit) : 1;

    res.json({
      data,
      totalCount,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    if (error instanceof BadRequestError) {
      res.status(400).json({ message: error.message });
      return;
    }
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: 'Internal Server Error' });
  }
}



async function getPokemonById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const pokemon = await pokemonService.getPokemonById(id);
    res.json(pokemon);
    } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export default {getAllPokemons,getPokemonById};

