import { Request, Response, NextFunction } from 'express';
import * as pokemonService from '../services/pokemonService';
import { BadRequestError, NotFoundError } from '../handlers/errors';

async function getAllPokemons(req: Request, res: Response, next: NextFunction) {
  try {
    const sortBy = req.query.sortBy ? String(req.query.sortBy) : 'id';
    const order = req.query.order === 'desc' ? 'desc' : 'asc'; 
    const search = req.query.search ? String(req.query.search) : undefined;

    const pokemons = await pokemonService.getAllPokemons(sortBy, order, search);
    res.json(pokemons);
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

export default {
  getAllPokemons,
};
