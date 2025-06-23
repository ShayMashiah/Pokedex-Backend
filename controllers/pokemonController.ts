import { Request, Response, NextFunction } from 'express';
import * as pokemonService from '../services/pokemonService';

async function getAllPokemons(req: Request, res: Response, next: NextFunction) {
  try {
    const sortBy = req.query.sortBy ? String(req.query.sortBy) : 'id';
    const order = req.query.order === 'desc' ? 'desc' : 'asc'; 
    const search = req.query.search ? String(req.query.search) : undefined;

    const pokemons = await pokemonService.getAllPokemons(sortBy, order, search);
    res.json(pokemons);
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'statusCode' in error) {
      const err = error as { statusCode: number; message: string };
      res.status(err.statusCode).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

async function getPokemonById(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  try {
    const pokemon = await pokemonService.getPokemonById(id);
    if (!pokemon) {
       res.status(404).json({ message: 'Pokémon not found' });
       return;
    }
    res.json(pokemon);
  } catch (error) {
    next(error);
  }
}

export default {getAllPokemons, getPokemonById};
