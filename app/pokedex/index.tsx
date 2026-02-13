import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { BG_COLOR_BY_TYPE, pokemonTypes } from "@/lib/constants";
import { getPokemon } from "@/lib/pokemonQueries";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, ScrollView, View } from "react-native";

export default function PokedexPage() {
  // We only need one state for the list now
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  // This single effect replaces all fetching and manual JS filtering
  useEffect(() => {
    const loadData = async () => {
      const data = await getPokemon(searchQuery, selectedType);
      setPokemons(data);
    };

    loadData();
  }, [searchQuery, selectedType]);

  return (
    <>
      <View className="px-4 mt-4 bg-transparent">
        <Input
          placeholder="Search Pokemon"
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="rounded-xl border-gray-200 h-12 text-black"
          style={{ backgroundColor: "#fff" }}
        />
      </View>

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mx-3 my-2"
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
              onPress={() => setSelectedType(type.value)}
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
        data={pokemons}
        numColumns={2}
        columnWrapperStyle={{ gap: 16 }}
        contentContainerStyle={{
          gap: 16,
          paddingHorizontal: 16,
          paddingBottom: 100,
        }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: pokemon }) => (
          <Link
            href={{
              pathname: "/pokemonDetails",
              params: { name: pokemon.name, id: pokemon.id },
            }}
            asChild
          >
            <Pressable
              className="w-[48%] h-[160px] rounded-3xl overflow-hidden"
              style={{
                backgroundColor:
                  BG_COLOR_BY_TYPE[pokemon.types?.[0]?.type?.name] || "#9f9a9a",
              }}
            >
              <View className="h-full w-full flex-row justify-between relative p-4">
                <Image
                  source={require("@/assets/images/pokeballWhite.webp")}
                  className="absolute -bottom-12 -right-12 z-0 opacity-20"
                  style={{ width: 150, height: 150 }}
                />

                <View>
                  <Text className="text-xl font-poppins-medium text-white capitalize">
                    {pokemon.name}
                  </Text>
                  {/* Note: If you need multiple types per card, you'll need to update the query to return them */}
                  <View className="flex-row gap-2">
                    <Text className="capitalize bg-white/30 font-poppins-medium py-1 px-3 mt-1 rounded-full color-white text-xs">
                      {pokemon.types?.[0]?.type?.name}
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
            </Pressable>
          </Link>
        )}
      />
    </>
  );
}
