export enum PokemonType {
  Normal = 'Normal',
  Fire = 'Fire',
  Water = 'Water',
  Grass = 'Grass',
  Electric = 'Electric',
  Ice = 'Ice',
  Fighting = 'Fighting',
  Poison = 'Poison',
  Ground = 'Ground',
  Flying = 'Flying',
  Psychic = 'Psychic',
  Bug = 'Bug',
  Rock = 'Rock',
  Ghost = 'Ghost',
  Dragon = 'Dragon',
  Dark = 'Dark',
  Steel = 'Steel',
  Fairy = 'Fairy',
}
export type PokemonTypeKey = keyof typeof PokemonType;


export interface Pokemon {
  id: number;
  nameEnglish: string;

  type: PokemonType[];

  hp: number;
  attack: number;
  defense: number;
  spAttack: number;
  spDefense: number;
  speed: number;

  species: string;
  description: string;

  height?: string | null;
  weight?: string | null;
  ability?: string[] | null; 
  gender?: string | null;

  sprite?: string | null;
  thumbnail?: string | null;
  hires?: string | null;
}

export interface User {
    id: number;
}

export interface userPokemon {
    userId: number;
    pokemonId: number;
}