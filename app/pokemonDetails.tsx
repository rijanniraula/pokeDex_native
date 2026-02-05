import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Stack, useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useEffect, useState } from "react";
import { View, Image, ScrollView, Text } from "react-native";
import { BG_COLOR_BY_TYPE, STAT_COLOR_BY_TYPE } from "@/lib/constants";
import CustomTabs, { TabItem } from "@/components/CustomTabs";

interface Pokemon {
  id: number;
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
  const [value, setValue] = React.useState("account");

  const fetchPokemonDetails = async () => {
    const [pokemonRes, speciesRes] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`),
    ]);

    const pokemonData = await pokemonRes.json();
    const speciesData = await speciesRes.json();

    const description = speciesData.flavor_text_entries
      .find(
        (entry: any) =>
          entry.language.name === "en" && entry.version.name === "sapphire",
      )
      ?.flavor_text.replace(/\f|\n/g, " ");

    const pokemonDetail = {
      id: pokemonData.id,
      name: pokemonData.name,
      flavor_text_entries: speciesData.flavor_text_entries,
      image: pokemonData.sprites.other["official-artwork"].front_default,
      imageBack: pokemonData.sprites.other["official-artwork"].back_default,
      types: pokemonData.types,
      height: pokemonData.height,
      weight: pokemonData.weight,
      stats: pokemonData.stats,
    };

    setPokemon(pokemonDetail);
  };

  useEffect(() => {
    fetchPokemonDetails();
  }, []);

  const tabsData: TabItem[] = [
    {
      key: "about",
      title: "About",
      content: (
        <>
          <Text className="text-base font-semibold mb-2">
            {pokemon?.flavor_text_entries
              .find(
                (entry: any) =>
                  entry.language.name === "en" &&
                  entry.version.name === "sapphire",
              )
              ?.flavor_text.replace(/\f|\n/g, " ")}
          </Text>
          <View className="flex-row justify-between py-1">
            <Text className="capitalize font-light text-base text-gray-500">
              Height
            </Text>
            <Text className="font-bold text-base">{pokemon?.height}</Text>
          </View>
          <View className="flex-row justify-between py-1">
            <Text className="capitalize font-light text-base text-gray-500">
              Weight
            </Text>
            <Text className="font-bold text-base">{pokemon?.weight}</Text>
          </View>
        </>
      ),
    },
    {
      key: "stats",
      title: "Stats",
      content: (
        <>
          {pokemon?.stats.map((stat) => (
            <View key={stat.stat.name} className="flex-row items-center mb-2">
              {/* Name column */}
              <View className="w-[140px] flex-row items-center justify-between">
                <Text className="capitalize font-light text-base text-[#262525]">
                  {stat.stat.name}
                </Text>
                <Text className="font-bold text-base">{stat.base_stat}</Text>
              </View>

              {/* Bar + value */}
              <View className="flex-1 h-2 bg-gray-200 rounded-full ml-2">
                <View
                  className="h-2 rounded-full"
                  style={{
                    width: `${(stat.base_stat / 255) * 100}%`,
                    backgroundColor:
                      // @ts-ignore
                      STAT_COLOR_BY_TYPE[stat.stat.name] || "#fff",
                  }}
                />
              </View>
            </View>
          ))}
        </>
      ),
    },
    {
      key: "evolution",
      title: "Evolution",
      content: <Text>Notification settings</Text>,
    },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          animation: "slide_from_right",
        }}
      />
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
              resizeMode="contain"
              className="w-full h-[400px] absolute top-0 right-0 "
              style={
                { zIndex: 100, filter: "brightness(1.1) contrast(1.2)" } as any
              }
            />
          </View>
          <View className="w-full h-[110%] px-4 pt-16 bg-white rounded-t-[50px] mt-[320px]">
            <CustomTabs
              tabs={tabsData}
              defaultValue={tabsData[0].key}
              className="w-full"
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}
