import LoaderBar from "@/components/LoadingBar";
import { Text } from "@/components/ui/text";
import {
  POKEMON_LOADING_FACTS,
  POKEMON_LOADING_MESSAGES,
} from "@/lib/pokemonFacts";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";

const DataFetchingLoader = () => {
  const [fact, setFact] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingMessage(
        POKEMON_LOADING_MESSAGES[
          Math.floor(Math.random() * POKEMON_LOADING_MESSAGES.length)
        ]
      );
      setFact(
        POKEMON_LOADING_FACTS[
          Math.floor(Math.random() * POKEMON_LOADING_FACTS.length)
        ]
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View className="flex-1 bg-orange-200/10">
      <View className="flex flex-row p-6 items-center relative">
        <Text variant={"h1"} className="mx-auto">
          PokéLite
        </Text>
      </View>

      <View className="items-center justify-evenly h-full p-4">
        <View className="relative">
          <Image
            source={require("../../assets/images/master_ball.png")}
            style={{ width: 300, height: 300 }}
            className="rounded-2xl mx-auto"
          />
          {/* <View
                className="absolute  w-full bg-red-200"
                style={{ height: 500, width: 500 }}
              /> */}
        </View>

        <View className="flex items-center gap-4">
          <Text className="text-red-600 text-center text-3xl font-space-grotesk-bold">
            {loadingMessage}
          </Text>
        </View>

        <View className="w-full px-4">
          <LoaderBar />
        </View>

        <View className=" flex gap-4 border-red-500/20 border-l-red-500 border-l-8 border-2 p-6 w-full rounded-xl">
          <View className="flex flex-row items-start justify-start gap-4">
            <Ionicons
              name="bulb-outline"
              size={24}
              color="#DD0000"
              className="p-2 bg-red-500/20 rounded-2xl"
            />
            <View className="flex-1 flex flex-col items-start gap-2">
              <Text className="text-red-600 text-center text-xl font-space-grotesk-bold">
                Did You Know?
              </Text>
              <Text className="text-xl">{fact}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DataFetchingLoader;
