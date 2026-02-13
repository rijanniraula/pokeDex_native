import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

export const ENDPOINTS = {
  BASE_POKEAPI: "https://pokeapi.co/api/v2",
  GET_ALL_POKEMONS: "/pokemon?limit=100000",
};

export const BG_COLOR_BY_TYPE: { [key: string]: string } = {
  all: "#9f9a9a",
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
  color: string;
  icon: React.ReactNode;
}

export const pokemonTypes: PokemonType[] = [
  {
    value: "fire",
    label: "Fire",
    color: "#F08030",
    icon: <MaterialCommunityIcons name="fire" size={24} color="#F08030" />,
  },
  {
    value: "water",
    label: "Water",
    color: "#6890F0",
    icon: <MaterialCommunityIcons name="water" size={24} color="#6890F0" />,
  },
  {
    value: "grass",
    label: "Grass",
    color: "#78C850",
    icon: <MaterialCommunityIcons name="leaf" size={24} color="#78C850" />,
  },
  {
    value: "electric",
    label: "Electric",
    color: "#F8D030",
    icon: <MaterialCommunityIcons name="flash" size={24} color="#F8D030" />,
  },
  {
    value: "psychic",
    label: "Psychic",
    color: "#F85888",
    icon: <MaterialCommunityIcons name="brain" size={24} color="#F85888" />,
  },
  {
    value: "ice",
    label: "Ice",
    color: "#98D8D8",
    icon: <MaterialCommunityIcons name="snowflake" size={24} color="#98D8D8" />,
  },
  {
    value: "dragon",
    label: "Dragon",
    color: "#7038F8",
    icon: <MaterialCommunityIcons name="dragon" size={24} color="#7038F8" />,
  },
  {
    value: "dark",
    label: "Dark",
    color: "#705848",
    icon: (
      <MaterialCommunityIcons name="weather-night" size={24} color="#705848" />
    ),
  },
  {
    value: "fairy",
    label: "Fairy",
    color: "#EE99AC",
    icon: <MaterialCommunityIcons name="flower" size={24} color="#EE99AC" />,
  },
  {
    value: "rock",
    label: "Rock",
    color: "#B8A038",
    icon: <MaterialCommunityIcons name="rock" size={24} color="#B8A038" />,
  },
  {
    value: "ground",
    label: "Ground",
    color: "#E0C068",
    icon: <MaterialCommunityIcons name="terrain" size={24} color="#E0C068" />,
  },
  {
    value: "poison",
    label: "Poison",
    color: "#A040A0",
    icon: <MaterialCommunityIcons name="biohazard" size={24} color="#A040A0" />,
  },
  {
    value: "bug",
    label: "Bug",
    color: "#A8B820",
    icon: <MaterialCommunityIcons name="ladybug" size={24} color="#A8B820" />,
  },
  {
    value: "flying",
    label: "Flying",
    color: "#A890F0",
    icon: <MaterialCommunityIcons name="airplane" size={24} color="#A890F0" />,
  },
  {
    value: "fighting",
    label: "Fighting",
    color: "#C03028",
    icon: (
      <MaterialCommunityIcons name="fist-raised" size={24} color="#C03028" />
    ),
  },
  {
    value: "steel",
    label: "Steel",
    color: "#B8B8D0",
    icon: <MaterialCommunityIcons name="gavel" size={24} color="#B8B8D0" />,
  },
  {
    value: "normal",
    label: "Normal",
    color: "#b8c2ce",
    icon: <MaterialCommunityIcons name="circle" size={24} color="#b8c2ce" />,
  },
];
