import * as React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useEffect, useState } from "react";
import { View, Image, ScrollView, Text } from "react-native";
import { BG_COLOR_BY_TYPE, STAT_COLOR_BY_TYPE } from "@/lib/constants";
import CustomTabs, { TabItem } from "@/components/CustomTabs";
import { RadarChart } from "react-native-gifted-charts";
import {
  heightToCm,
  heightToFeetInches,
  weightToKg,
  weightToLbs,
} from "@/lib/unitConverter";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

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
  abilities: PokemonAbility[];
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

interface PokemonAbility {
  ability: {
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
      abilities: pokemonData.abilities,
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
          <Text className="text-lg font-light mb-2">
            {pokemon?.flavor_text_entries
              .find(
                (entry: any) =>
                  entry.language.name === "en" &&
                  entry.version.name === "sapphire",
              )
              ?.flavor_text.replace(/\f|\n/g, " ")}
          </Text>
          <View className="flex-row justify-between mt-2 p-2 rounded-xl">
            <View className="flex-column gap-2 items-center border border-gray-400 rounded-xl p-2 w-[48%]">
              <View className="flex-row items-center gap-1">
                <FontAwesome5 name="ruler" size={16} color="gray" />
                <Text className="font-light text-lg text-gray-500">Height</Text>
              </View>
              <Text className="font-bold text-lg">
                {pokemon?.height
                  ? `${heightToCm(pokemon.height)} cm (${heightToFeetInches(pokemon.height)})`
                  : "--"}
              </Text>
            </View>

            <View className="flex-column gap-2 items-center border border-gray-400 rounded-xl p-2 w-[48%]">
              <View className="flex-row items-center gap-1">
                <FontAwesome6 name="weight-hanging" size={16} color="gray" />
                <Text className="font-light text-lg text-gray-500">Weight</Text>
              </View>
              <Text className="font-bold text-lg">
                {pokemon?.weight
                  ? `${weightToKg(pokemon.weight)} kg (${weightToLbs(pokemon.weight)} lbs)`
                  : "--"}
              </Text>
            </View>
          </View>

          <View>
            <Text className="text-2xl font-semibold mt-4 mb-2">Abilities</Text>
            <View className="flex-column gap-4">
              {pokemon?.abilities.map((ability) => (
                <View
                  key={ability.ability.name}
                  className="flex-row items-center border border-gray-300 rounded-xl px-4 py-6"
                >
                  <View className="w-2 h-2 bg-gray-500 rounded-full mr-2" />
                  <Text className="capitalize font-light text-base text-[#262525]">
                    {ability.ability.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </>
      ),
    },
    {
      key: "stats",
      title: "Stats",
      content: (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-column items-center gap-2">
            {pokemon?.stats.map((stat) => (
              <View key={stat.stat.name} className="flex-row items-center">
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
          </View>
          <RadarChart
            hideAsterLines={true}
            gridConfig={{
              showGradient: true,
              gradientColor: "#e9eff2ff",
              gradientOpacity: 0.5,
              fill: "#e9eff2ff",
            }}
            isAnimated={true}
            animationDuration={1000}
            startAngle={90}
            data={pokemon?.stats.map((stat) => stat.base_stat)}
            labels={pokemon?.stats.map(
              (stat) =>
                stat.stat.name.charAt(0).toUpperCase() +
                stat.stat.name.slice(1),
            )}
            dataLabels={pokemon?.stats.map((stat) => stat.base_stat.toString())}
            dataLabelsConfig={{ stroke: "transparent" }}
            dataLabelsPositionOffset={0}
            maxValue={255}
          />
        </ScrollView>
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
      <View
        style={{
          flex: 1,
          paddingTop: 12,
          backgroundColor:
            // @ts-ignore
            BG_COLOR_BY_TYPE[pokemon?.types[0].type.name] || "#fff",
        }}
      >
        <View style={{ flex: 1 }}>
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

          <View className="w-full justify-center items-center z-50 relative h-[310px]">
            <Image
              source={require("../assets/images/pokeballWhite.webp")}
              className="absolute top-0 right-12 z-0 opacity-20"
              style={{ width: 200, height: 200 }}
            />
            <Image
              source={{ uri: pokemon?.image }}
              style={{
                position: "absolute",
                top: 0,
                alignSelf: "center",
                width: "100%",
                height: 400,
                zIndex: 0,
              }}
              resizeMode="contain"
            />
          </View>
          <View className="flex-1 px-4 pt-16 bg-white rounded-t-[50px]">
            <CustomTabs
              tabs={tabsData}
              defaultValue={tabsData[0].key}
              className="w-full"
            />
          </View>
        </View>
      </View>
    </>
  );
}
