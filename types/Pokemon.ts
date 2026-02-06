export interface Pokemon {
  id: number;
  url?: string;
  name: string;
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
  image: string;
  imageBack: string;
  types: PokemonTypes[];
  height: number;
  weight: number;
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  evolution_chain_url?: string;
  evolution_chain?: PokemonEvolutionChain;
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonTypes {
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
}

export interface PokemonEvolutionChain {
  chain: {
    species: {
      name: string;
      url: string;
    };
    evolves_to: {
      species: {
        name: string;
        url: string;
      };
      evolves_to: {
        species: {
          name: string;
          url: string;
        };
      }[];
    }[];
  };
}
