import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";

interface Pokemon {
  name: string;
  url: string;
  image: string;
  imageBack: string;
  types: PokemonTypes[];
}

interface PokemonTypes {
  type: {
    name: string;
    url: string;
  };
}

const bgColorByType = {
  grass: "#6EDC9A",
  fire: "#FC6C6D",
  water: "#6FA8FF",
  electric: "#FFD45A",
  normal: "#DAD8C2",
  bug: "#9EDB4F",
  poison: "#C86EDC",
  flying: "#9FA8FF",
  ground: "#F0C46A",
  rock: "#D0AF52",
  steel: "#C9CBDC",
  psychic: "#FF6FA2",
  ice: "#6FDADA",
  dragon: "#7C6CFF",
  dark: "#7A6A5A",
  fairy: "#FF9BCB",
  fighting: "#F26B5B",
  ghost: "#8E7AD6",
  unknown: "#6ED6C6",
  shadow: "#6C63E5",
  stellar: "#6F7CFF",
};

export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const fetchPokemon = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0",
      );
      const data = await response.json();

      try {
        const pokemonDetail = await Promise.all(
          data.results.map(async (pokemon: Pokemon) => {
            const req = await fetch(pokemon.url);
            const res = await req.json();
            return {
              name: pokemon.name,
              image: res.sprites.front_default,
              imageBack: res.sprites.back_default,
              url: pokemon.url,
              types: res.types,
            };
          }),
        );
        setPokemons(pokemonDetail);
      } catch (e) {
        console.error("Error: ", e);
      }
    } catch (e) {
      console.error("Error: ", e);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <>
      <View className="bg-white">
        <Text className="font-bold text-blue-500">Welcome to Nativewind!</Text>
      </View>
      <FlatList
        data={pokemons}
        numColumns={2}
        columnWrapperStyle={{ gap: 16 }}
        contentContainerStyle={{ gap: 16, padding: 16 }}
        keyExtractor={(pokemon) => pokemon.name}
        renderItem={({ item: pokemon }) => (
          <Link
            href={{
              pathname: "/pokemonDetails",
              params: {
                name: pokemon.name,
              },
            }}
            className="w-[48%] rounded-[32px] p-2.5"
            style={{
              // @ts-ignore
              backgroundColor: bgColorByType[pokemon.types[0].type.name] + "90",
            }}
          >
            <View className="h-full w-full flex-col items-center justify-between">
              <View className="items-center">
                <Text className="text-xl font-bold capitalize">
                  {pokemon.name}
                </Text>
                <Text className="capitalize">{pokemon.types[0].type.name}</Text>
              </View>
              <Image
                source={{ uri: pokemon.image }}
                style={{ width: 150, height: 150 }}
              />
            </View>
          </Link>
        )}
      />
    </>
  );
}
