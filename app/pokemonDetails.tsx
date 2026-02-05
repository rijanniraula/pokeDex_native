import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useEffect, useState } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import { BG_COLOR_BY_TYPE } from "@/lib/constants";

interface Pokemon {
  id: number;
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

export default function PokemonDetails() {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const { name } = useLocalSearchParams();

  const fetchPokemonDetails = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    const pokemonDetail = {
      id: data.id,
      name: data.name,
      image: data.sprites.other["official-artwork"].front_default,
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
          backgroundColor:
            // @ts-ignore
            BG_COLOR_BY_TYPE[pokemon?.types[0].type.name] || "#fff",
        }}
      >
        <View
          className="flex-1 pt-2"
          style={{
            backgroundColor:
              // @ts-ignore
              BG_COLOR_BY_TYPE[pokemon?.types[0].type.name] || "#fff",
          }}
        >
          <View className="px-2 flex-row justify-between ">
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
                      // @ts-ignore
                      style={{ color: BG_COLOR_BY_TYPE[type.type.name] }}
                    >
                      {type.type.name}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
            <View>
              <Text className="text-3xl font-bold text-white">
                #
                {pokemon?.id ? pokemon.id.toString().padStart(6, "0") : ""}{" "}
              </Text>
            </View>
          </View>

          <View className="w-full justify-center items-center z-50 relative">
            <Image
              source={require("../assets/images/pokeballWhite.webp")}
              className="absolute top-0 right-12 z-0 opacity-20"
              style={{ width: 200, height: 200 }}
            />
            <Image
              source={{ uri: pokemon?.image }}
              className="w-[400px] h-[400px] object-contain -mb-[80px]"
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
