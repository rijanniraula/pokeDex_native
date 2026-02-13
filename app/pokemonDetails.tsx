import CustomTabs, { TabItem } from "@/components/CustomTabs";
import { Text } from "@/components/ui/text";
import {
  BG_COLOR_BY_TYPE,
  pokemonTypes,
  STAT_COLOR_BY_TYPE,
} from "@/lib/constants";
import { extractEvolutionChain } from "@/lib/extractEvolutionChain";
import {
  heightToCm,
  heightToFeetInches,
  weightToKg,
  weightToLbs,
} from "@/lib/unitConverter";
import { Pokemon } from "@/types/Pokemon";
import {
  Feather,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router, Stack, useLocalSearchParams } from "expo-router";
import * as React from "react";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import { RadarChart } from "react-native-gifted-charts";

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
      moves: pokemonData.moves,
      capture_rate: speciesData.capture_rate,
      habitat: speciesData.habitat?.name,
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

  const fetchMoveDetail = async () => {
    if (!pokemon?.moves) return;

    const updatedMoves = await Promise.all(
      pokemon.moves.map(async (m) => {
        const res = await fetch(m.move.url);
        const data = await res.json();

        return {
          ...m,
          move: {
            ...m.move,
            accuracy: data.accuracy,
            power: data.power,
            pp: data.pp,
            type: data.type?.name,
            category: data.meta?.category?.name,
            damage_class: data.damage_class?.name,
            effect_entries: data.effect_entries,
          },
        };
      }),
    );

    setPokemon((prev) => (prev ? { ...prev, moves: updatedMoves } : prev));
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

  useEffect(() => {
    if (pokemon?.id) {
      fetchMoveDetail();
    }
  }, [pokemon?.id]);

  const tabsData: TabItem[] = [
    {
      key: "about",
      title: "About",
      content: (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text className="text-lg mb-2">
              {pokemon?.flavor_text_entries
                .find(
                  (entry: any) =>
                    entry.language.name === "en" &&
                    entry.version.name === "sapphire",
                )
                ?.flavor_text.replace(/\f|\n/g, " ")}
            </Text>
            <View className="flex-row justify-between mt-2 p-2 rounded-xl">
              <View className="flex-column gap-2 items-center border border-gray-200 bg-gray-200 rounded-xl p-4 w-[48%]">
                <View className="flex-row items-center gap-2">
                  <FontAwesome5 name="ruler" size={14} color="gray" />
                  <Text className=" text-lg text-gray-500">Height</Text>
                </View>
                <Text className="font-bold text-lg">
                  {pokemon?.height
                    ? `${heightToCm(pokemon.height)} cm (${heightToFeetInches(pokemon.height)})`
                    : "--"}
                </Text>
              </View>

              <View className="flex-column gap-2 items-center border border-gray-200 bg-gray-200 rounded-xl p-4 w-[48%]">
                <View className="flex-row items-center gap-2">
                  <FontAwesome6 name="weight-hanging" size={14} color="gray" />
                  <Text className=" text-lg text-gray-500">Weight</Text>
                </View>
                <Text className="font-poppins-medium text-lg">
                  {pokemon?.weight
                    ? `${weightToKg(pokemon.weight)} kg (${weightToLbs(pokemon.weight)} lbs)`
                    : "--"}
                </Text>
              </View>
            </View>
            <View className="flex-row justify-between mt-2 p-2 rounded-xl">
              <View className="flex-column gap-2 items-center border border-gray-200 bg-gray-200 rounded-xl p-4 w-[48%]">
                <View className="flex-row items-center gap-1">
                  <MaterialCommunityIcons
                    name="pokeball"
                    size={16}
                    color="gray"
                  />
                  <Text className=" text-lg text-gray-500">Capture Rate</Text>
                </View>
                <Text className="font-poppins-medium text-lg">
                  {pokemon?.capture_rate}
                </Text>
              </View>

              <View className="flex-column gap-2 items-center border border-gray-200 bg-gray-200 rounded-xl p-4 w-[48%]">
                <View className="flex-row items-center gap-2">
                  <FontAwesome6
                    name="location-crosshairs"
                    size={16}
                    color="gray"
                  />
                  <Text className=" text-lg text-gray-500">Habitat</Text>
                </View>
                <Text className="font-poppins-medium text-lg">
                  {pokemon?.habitat ? `${pokemon.habitat}` : "--"}
                </Text>
              </View>
            </View>

            <View>
              <Text className="text-2xl font-poppins-medium mt-4 mb-2">
                Abilities
              </Text>
              <View className="flex-column gap-4">
                {pokemon?.abilities.map((ability) => (
                  <View
                    key={ability.ability.name}
                    className="flex-row items-center border border-gray-300 rounded-xl px-4 py-6"
                  >
                    <View className="w-2 h-2 bg-gray-500 rounded-full mr-2" />
                    <Text className="capitalize font-poppins-medium text-base text-[#262525]">
                      {ability.ability.name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
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
                  <Text className="capitalize font-poppins-medium text-base text-[#262525]">
                    {stat.stat.name}
                  </Text>
                  <Text className="font-poppins-medium text-base">
                    {stat.base_stat}
                  </Text>
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
        <ScrollView showsVerticalScrollIndicator={false}>
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
                    backgroundColor:
                      BG_COLOR_BY_TYPE[pokemon.types[0].type.name],
                  }}
                >
                  <View className="h-full w-full relative overflow-hidden">
                    <Image
                      source={require("@/assets/images/pokeballWhite.webp")}
                      className="absolute -bottom-10 -right-10 opacity-20"
                      style={{ width: 120, height: 120 }}
                    />

                    <View className="mt-4 ml-4">
                      <Text className="text-lg font-poppins-medium text-white capitalize">
                        {pokemon.name}
                      </Text>
                      <View className="flex-row gap-2">
                        <Text className="capitalize bg-white/30 font-poppins-medium py-2 px-4 mt-1 w-fit rounded-[32px] color-white">
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
        </ScrollView>
      ),
    },
    {
      key: "moves",
      title: "Move Set",
      content: (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-column gap-4">
            {pokemon?.moves?.map((move) => (
              <View
                key={move.move.name}
                className="flex-row gap-4 border border-gray-300 rounded-xl px-4 py-6"
                style={{
                  // @ts-ignore
                  backgroundColor:
                    pokemonTypes.find((type) => type.value === move.move.type)
                      ?.color + "50" || "#fff",
                  borderColor:
                    pokemonTypes.find((type) => type.value === move.move.type)
                      ?.color || "#fff",
                  borderWidth: 1,
                  borderRadius: 16,
                }}
              >
                <View
                  className="w-1/8 flex-1 flex-row items-center justify-center p-2 rounded-xl"
                  style={{
                    backgroundColor:
                      pokemonTypes.find((type) => type.value === move.move.type)
                        ?.color + "50" || "#fff",
                  }}
                >
                  {
                    pokemonTypes.find((type) => type.value === move.move.type)
                      ?.icon
                  }
                </View>

                <View className="w-5/6">
                  <Text className="capitalize font-poppins-medium text-base">
                    {move.move.name}
                  </Text>

                  <View className="flex-row justify-between mt-2">
                    <View className="flex-row items-center gap-1">
                      <FontAwesome6 name="bolt" size={14} color="gray" />
                      <Text>PWR: {move.move.power ?? "--"}</Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                      <Feather name="target" size={14} color="gray" />
                      <Text>ACC: {move.move.accuracy ?? "--"}</Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                      <Ionicons name="pricetag" size={14} color="gray" />
                      <Text>PP: {move.move.pp ?? "--"}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
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
                <Text className="text-[32px] font-poppins-bold capitalize text-white">
                  {pokemon?.name}
                </Text>
                <View className="flex-row gap-2">
                  {pokemon?.types.map((type) => (
                    <Text
                      key={type.type.name}
                      className="capitalize bg-white font-bold py-2 px-4 rounded-[32px]"
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
              <Text className="text-3xl font-poppins-bold text-white">
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
