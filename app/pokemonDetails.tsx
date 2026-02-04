import { Stack, useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";

interface Pokemon {
  name: string;
  image: string;
  imageBack: string;
  types: PokemonTypes[];
  height: number;
  weight: number;
  stats: PokemonStat[];
}

interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
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

export default function PokemonDetails() {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const { name } = useLocalSearchParams();

  const fetchPokemonDetails = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    const pokemonDetail = {
      name: data.name,
      image: data.sprites.other["showdown"].front_default,
      imageBack: data.sprites.other["official-artwork"].back_default,
      types: data.types,
      height: data.height,
      weight: data.weight,
      stats: data.stats,
    };
    setPokemon(pokemonDetail);
  };

  useEffect(() => {
    fetchPokemonDetails();
  }, []);

  return (
    <>
      <ScrollView
        style={{
          // @ts-ignore
          backgroundColor: bgColorByType[pokemon?.types[0].type.name] || "#fff",
        }}
      >
        <View
          className="flex-1 pt-2"
          style={{
            backgroundColor:
              // @ts-ignore
              bgColorByType[pokemon?.types[0].type.name] || "#fff",
          }}
        >
          <View className="p-4">
            <View className="flex-row gap-3">
              <Pressable onPress={() => router.back()} className="mt-1">
                <Ionicons name="arrow-back" size={28} color="white" />
              </Pressable>
              <View>
                <Text className="text-[32px] font-bold capitalize text-white">
                  {pokemon?.name}
                </Text>
                <View className="flex-row gap-2">
                  {pokemon?.types.map((type) => (
                    <Text
                      key={type.type.name}
                      className="capitalize bg-white font-bold py-2 px-4 rounded-[32px] mt-2"
                      style={{ color: bgColorByType[type.type.name] }}
                    >
                      {type.type.name}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          </View>

          <View className="w-full justify-center items-center z-50 relative">
            <Image
              source={{
                uri: "https://icons.veryicon.com/png/128/object/material-design-icons-1/pokeball-1.png",
              }}
              className="absolute top-0 right-0 z-0 opacity-20"
              width={200}
              height={200}
            />
            <Image
              source={{ uri: pokemon?.image }}
              className="w-[400px] h-[400px] object-contain -mb-[100px]"
              style={
                { zIndex: 100, filter: "brightness(1.1) contrast(1.2)" } as any
              }
            />
          </View>
          <View className="w-full h-[150%] p-8 bg-white rounded-[50px]">
            <View className="my-4">
              <Text className="text-2xl font-bold mb-2">About</Text>
              <View className="flex-row justify-between py-1">
                <Text className="capitalize font-light text-base text-[#262525]">
                  Height
                </Text>
                <Text className="font-bold text-base">{pokemon?.height}</Text>
              </View>
              <View className="flex-row justify-between py-1">
                <Text className="capitalize font-light text-base text-[#262525]">
                  Weight
                </Text>
                <Text className="font-bold text-base">{pokemon?.weight}</Text>
              </View>
            </View>

            <Text className="text-2xl font-bold mb-2">Stats</Text>
            {pokemon?.stats.map((stat) => (
              <View
                key={stat.stat.name}
                className="flex-row justify-between py-1"
              >
                <Text className="capitalize font-light text-base text-[#262525]">
                  {stat.stat.name}
                </Text>
                <Text className="font-bold text-base">{stat.base_stat}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
