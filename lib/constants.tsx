import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const ENDPOINTS = {
  BASE_POKEAPI: "https://pokeapi.co/api/v2",
  GET_ALL_POKEMONS: "/pokemon?limit=100000",
};

export const BG_COLOR_BY_TYPE = {
  grass: "#6edcc4",
  fire: "#fc7a6c",
  water: "#6fa8ff",
  electric: "#ffd45a",
  normal: "#dad8c2",
  bug: "#9edb4f",
  poison: "#c86edc",
  flying: "#9fa8ff",
  ground: "#f0c46a",
  rock: "#d0af52",
  steel: "#c9cbdc",
  psychic: "#ff6fa2",
  ice: "#6fdada",
  dragon: "#7c6cff",
  dark: "#7A6A5A",
  fairy: "#FF9BCB",
  fighting: "#F26B5B",
  ghost: "#8E7AD6",
  unknown: "#6ED6C6",
  shadow: "#6C63E5",
  stellar: "#6F7CFF",
};

export const STAT_COLOR_BY_TYPE = {
  hp: "#6EDCC4",
  attack: "#fc7a6c",
  defense: "#6fa8ff",
  "special-attack": "#ffd45a",
  "special-defense": "#c4c095ff",
  speed: "#9edb4f",
};

export interface PokemonType {
  value: string;
  label: string;
  icon: React.ReactNode;
}

export const pokemonTypes: PokemonType[] = [
  {
    value: "fire",
    label: "Fire",
    icon: <MaterialCommunityIcons name="fire" size={24} color="#F08030" />,
  },
  {
    value: "water",
    label: "Water",
    icon: <MaterialCommunityIcons name="water" size={24} color="#6890F0" />,
  },
  {
    value: "grass",
    label: "Grass",
    icon: <MaterialCommunityIcons name="leaf" size={24} color="#78C850" />,
  },
  {
    value: "electric",
    label: "Electric",
    icon: <MaterialCommunityIcons name="flash" size={24} color="#F8D030" />,
  },
  {
    value: "psychic",
    label: "Psychic",
    icon: <MaterialCommunityIcons name="brain" size={24} color="#F85888" />,
  },
  {
    value: "ice",
    label: "Ice",
    icon: <MaterialCommunityIcons name="snowflake" size={24} color="#98D8D8" />,
  },
  {
    value: "dragon",
    label: "Dragon",
    icon: <MaterialCommunityIcons name="dragon" size={24} color="#7038F8" />,
  },
  {
    value: "dark",
    label: "Dark",
    icon: (
      <MaterialCommunityIcons name="weather-night" size={24} color="#705848" />
    ),
  },
  {
    value: "fairy",
    label: "Fairy",
    icon: <MaterialCommunityIcons name="flower" size={24} color="#EE99AC" />,
  },
  {
    value: "rock",
    label: "Rock",
    icon: <MaterialCommunityIcons name="rock" size={24} color="#B8A038" />,
  },
  {
    value: "ground",
    label: "Ground",
    icon: <MaterialCommunityIcons name="terrain" size={24} color="#E0C068" />,
  },
  {
    value: "poison",
    label: "Poison",
    icon: <MaterialCommunityIcons name="biohazard" size={24} color="#A040A0" />,
  },
  {
    value: "bug",
    label: "Bug",
    icon: <MaterialCommunityIcons name="ladybug" size={24} color="#A8B820" />,
  },
  {
    value: "flying",
    label: "Flying",
    icon: <MaterialCommunityIcons name="airplane" size={24} color="#A890F0" />,
  },
  {
    value: "fighting",
    label: "Fighting",
    icon: (
      <MaterialCommunityIcons name="fist-raised" size={24} color="#C03028" />
    ),
  },
  {
    value: "steel",
    label: "Steel",
    icon: <MaterialCommunityIcons name="gavel" size={24} color="#B8B8D0" />,
  },
];
