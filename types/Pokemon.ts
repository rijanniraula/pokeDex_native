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
  moves?: PokemonMove[];
  capture_rate?: string;
  habitat?: string;
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

export interface PokemonMove {
  move: {
    name: string;
    url: string;
    accuracy?: number;
    power?: number;
    pp?: number;
    type?: string;
    category?: string;
    damage_class?: string;
    effect_entries?: {
      effect: string;
      language: {
        name: string;
      };
    }[];
  };
}
