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
          style={{
            ...styles.container,
            backgroundColor:
              // @ts-ignore
              bgColorByType[pokemon?.types[0].type.name] || "#fff",
          }}
        >
          <View style={{ padding: 16 }}>
            <View
              style={{
                flexDirection: "row",
                // alignItems: "center",
                gap: 12,
              }}
            >
              <Pressable onPress={() => router.back()} style={{ marginTop: 4 }}>
                <Ionicons name="arrow-back" size={28} color="white" />
              </Pressable>
              <View>
                <Text
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    color: "white",
                  }}
                >
                  {pokemon?.name}
                </Text>
                <View style={{ flexDirection: "row", gap: 8 }}>
                  {pokemon?.types.map((type) => (
                    <Text
                      key={type.type.name}
                      style={{
                        textTransform: "capitalize",
                        backgroundColor: "#ffffff",
                        color: bgColorByType[type.type.name],
                        fontWeight: "bold",
                        paddingVertical: 8,
                        paddingHorizontal: 16,
                        borderRadius: 32,
                        marginTop: 8,
                      }}
                    >
                      {type.type.name}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: "https://icons.veryicon.com/png/128/object/material-design-icons-1/pokeball-1.png",
              }}
              style={styles.pokeballBgImage}
              width={200}
              height={200}
            />
            <Image
              source={{ uri: pokemon?.image }}
              style={styles.pokemonImage}
            />
          </View>
          <View style={styles.pokemonDetailsCard}>
            <View style={styles.detailsContainer}>
              <Text style={styles.sectionTitle}>About</Text>
              <View style={styles.statRow}>
                <Text style={styles.statName}>Height</Text>
                <Text style={styles.statValue}>{pokemon?.height}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statName}>Weight</Text>
                <Text style={styles.statValue}>{pokemon?.weight}</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Stats</Text>
            {pokemon?.stats.map((stat) => (
              <View key={stat.stat.name} style={styles.statRow}>
                <Text style={styles.statName}>{stat.stat.name}</Text>
                <Text style={styles.statValue}>{stat.base_stat}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 8,
  },
  pokeballBgImage: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 0,
    opacity: 0.2,
  },
  imageContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    position: "relative",
  },
  pokemonImage: {
    width: 400,
    height: 400,
    resizeMode: "contain",
    filter: "brightness(1.1) contrast(1.2)",
    marginBottom: -100,
  },
  pokemonDetailsCard: {
    width: "100%",
    height: "150%",
    padding: 32,
    backgroundColor: "#fff",
    borderRadius: 50,
    zIndex: 50,
  },
  detailsContainer: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  statName: {
    textTransform: "capitalize",
    fontWeight: 300,
    fontSize: 16,
    color: "#262525ff",
  },
  statValue: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
