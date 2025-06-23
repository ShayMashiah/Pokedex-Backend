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

async function getPokemonById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid Pokémon ID' });
        return;
    }

    const pokemon = await pokemonService.getPokemonById(Number(id));
    res.json(pokemon);
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'statusCode' in error) {
      const err = error as { statusCode: number; message: string };
      res.status(err.statusCode).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}


export default {getAllPokemons,getPokemonById};
