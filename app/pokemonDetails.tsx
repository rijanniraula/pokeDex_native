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
import { Pokemon } from "@/types/Pokemon";
import { extractEvolutionChain } from "@/lib/extractEvolutionChain";

export default function PokemonDetails() {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [evolutionChain, setEvolutionChain] = useState<any>();
  const [evolutionPokemons, setEvolutionPokemons] = useState<Pokemon[]>([]);

  const { name, id } = useLocalSearchParams();
  console.log(id);

  const fetchPokemonDetails = async () => {
    const [pokemonRes, speciesRes] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`),
    ]);

    const pokemonData = await pokemonRes.json();
    const speciesData = await speciesRes.json();

    const pokemonDetail: Pokemon = {
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
      evolution_chain_url: speciesData.evolution_chain.url,
    };

    setPokemon(pokemonDetail);
  };

  const fetchEvolutionChain = async () => {
    const response = await fetch(`${pokemon?.evolution_chain_url}`);
    const data = await response.json();
    setEvolutionChain(data);
  };

  const fetchEvolutionPokemons = async (names: string[]) => {
    const results = await Promise.all(
      names.map(async (name) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await res.json();

        return {
          id: data.id,
          name: data.name,
          image: data.sprites.other["official-artwork"].front_default,
          types: data.types,
        };
      }),
    );

    setEvolutionPokemons(results);
  };

  useEffect(() => {
    fetchPokemonDetails();
  }, []);

  useEffect(() => {
    if (pokemon?.evolution_chain_url) {
      fetchEvolutionChain();
    }
  }, [pokemon?.evolution_chain_url]);

  useEffect(() => {
    if (evolutionChain?.chain) {
      const names = extractEvolutionChain(evolutionChain.chain);
      fetchEvolutionPokemons(names);
    }
  }, [evolutionChain]);

  console.log("Evolution chain: ", evolutionChain);
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
      content: (
        <View>
          <View className="flex-row flex-wrap gap-4">
            {evolutionPokemons.map((pokemon) => (
              <Pressable
                key={pokemon.id}
                onPress={() =>
                  router.push({
                    pathname: "/pokemonDetails",
                    params: { name: pokemon.name, id: pokemon.id },
                  })
                }
                className="w-[48%] h-[140px] rounded-3xl"
                style={{
                  // @ts-ignore
                  backgroundColor: BG_COLOR_BY_TYPE[pokemon.types[0].type.name],
                }}
              >
                <View className="h-full w-full relative overflow-hidden">
                  <Image
                    source={require("@/assets/images/pokeballWhite.webp")}
                    className="absolute -bottom-10 -right-10 opacity-20"
                    style={{ width: 120, height: 120 }}
                  />

                  <View className="mt-4 ml-4">
                    <Text className="text-lg font-bold text-white capitalize">
                      {pokemon.name}
                    </Text>
                    <View className="flex-row gap-2">
                      <Text className="capitalize bg-white/30 font-bold py-2 px-4 mt-1 w-fit rounded-[32px] color-white">
                        {pokemon.types[0].type.name}
                      </Text>
                    </View>
                  </View>

                  <Image
                    source={{ uri: pokemon.image }}
                    resizeMode="contain"
                    style={{
                      width: 90,
                      height: 90,
                      position: "absolute",
                      bottom: 4,
                      right: 4,
                    }}
                  />
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      ),
    },
    {
      key: "moves",
      title: "Move Set",
      content: (
        <View>
          <Text>test</Text>
        </View>
      ),
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
