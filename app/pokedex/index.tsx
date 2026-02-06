import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  Text,
  FlatList,
  View,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { BG_COLOR_BY_TYPE, pokemonTypes } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Pokemon } from "@/types/Pokemon";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function PokedexPage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  const fetchPokemon = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=100",
      );
      const data = await response.json();

      try {
        const pokemonDetail = await Promise.all(
          data.results.map(async (pokemon: Pokemon) => {
            const req = await fetch(pokemon.url!);
            const res = await req.json();
            return {
              id: res.id,
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

  const handleFilterPokemon = () => {
    const filtered = pokemons.filter((pokemon) => {
      const matchesType =
        selectedType === "all" ||
        !selectedType ||
        pokemon.types.some((type) => type.type.name === selectedType);

      const matchesSearch =
        !searchQuery ||
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesType && matchesSearch;
    });

    setFilteredPokemons(filtered);
  };

  useEffect(() => {
    handleFilterPokemon();
  }, [pokemons, selectedType, searchQuery]);

  return (
    <>
      <View className="px-4 mt-4 bg-transparent">
        <Input
          placeholder="Search Pokemon"
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="rounded-xl border-gray-200 h-12"
          style={{ backgroundColor: "#fff" }}
        />
      </View>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mx-3 my-2"
          // style={{ height: 50 }}
        >
          {[
            {
              value: "all",
              label: "All",
              color: "#b71010",
              icon: (
                <MaterialCommunityIcons
                  name="pokeball"
                  size={16}
                  color="#b71010"
                />
              ),
            },
            ...pokemonTypes,
          ].map((type) => (
            <Pressable
              key={type.value}
              className="flex-row items-center gap-2 border border-gray-200 rounded-full px-4 py-2 mx-1"
              style={{
                backgroundColor:
                  selectedType === type.value
                    ? BG_COLOR_BY_TYPE[type.value] + "50"
                    : "transparent",
                borderColor: BG_COLOR_BY_TYPE[type.value],
              }}
              onPress={() => {
                setSelectedType(type.value);
              }}
            >
              {type.icon}
              <Text className="capitalize font-light text-base ">
                {type.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={filteredPokemons}
        numColumns={2}
        columnWrapperStyle={{ gap: 16 }}
        contentContainerStyle={{ gap: 16, paddingHorizontal: 16 }}
        keyExtractor={(pokemon) => pokemon.name}
        renderItem={({ item: pokemon }) => (
          <Link
            href={{
              pathname: "/pokemonDetails",
              params: {
                name: pokemon.name,
                id: pokemon.id,
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
