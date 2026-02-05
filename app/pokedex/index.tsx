import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, View, Image } from "react-native";
import { BG_COLOR_BY_TYPE } from "@/lib/constants";

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

export default function PokedexPage() {
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
              image: res.sprites.other["showdown"].front_default,
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
            className="w-[48%] h-[160px] rounded-3xl"
            style={{
              // @ts-ignore
              backgroundColor: BG_COLOR_BY_TYPE[pokemon.types[0].type.name],
            }}
          >
            <View className="h-full w-full flex-row justify-between overflow-hidden relative">
              <Image
                source={require("@/assets/images/pokeballWhite.webp")}
                className="absolute -bottom-12 -right-12 z-0 opacity-20"
                style={{ width: 150, height: 150 }}
              />
              <View className="mt-4 ml-4">
                <Text className="text-xl font-bold text-white capitalize">
                  {pokemon.name}
                </Text>
                <View className="flex-row gap-2">
                  <Text className="capitalize bg-white/30 font-bold py-2 px-4 mt-1 w-fit rounded-[32px] color-white">
                    {pokemon.types[0].type.name}
                  </Text>
                </View>
              </View>
              <View className="absolute bottom-2 right-2">
                <Image
                  source={{ uri: pokemon.image }}
                  resizeMode="contain"
                  style={{ width: 110, height: 110 }}
                />
              </View>
            </View>
          </Link>
        )}
      />
    </>
  );
}
