import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import {
    AntDesign,
    Entypo,
    Feather,
    FontAwesome5,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Linking, Pressable, ScrollView, View } from "react-native";

const LegalDescription = ({
  setOnBoardingSteps,
}: {
  setOnBoardingSteps: (step: number) => void;
}) => {
  return (
    <View className="flex-1 bg-orange-200/10 justify-between">
      <View className="flex flex-row p-6 items-center relative">
        <AntDesign
          name="arrow-left"
          size={24}
          color="black"
          onPress={() => router.back()}
          className="absolute left-6"
        />
        <Text variant={"h1"} className="mx-auto">
          PokéLite
        </Text>
      </View>
      <ScrollView className="flex-1 px-6">
        {/* legal description */}
        <View>
          <View className="flex flex-row items-center gap-2">
            <MaterialCommunityIcons name="gavel" size={20} color="#DD0000" />
            <Text className="text-2xl font-space-grotesk-bold">
              Legal Disclaimer
            </Text>
          </View>
          <View className="mt-2 p-4 border border-red-500/20 bg-red-500/10 rounded-lg">
            <Text className="text-lg font-bold">©2024 Pokémon. ©1995–2024</Text>
            <Text className="text-lg font-bold">
              Nintendo/Creatures Inc./GAME FREAK inc.
            </Text>
            <Text className="text-lg">
              Pokémon and Pokémon character names are trademarks of Nintendo.
            </Text>
            <Text className="text-lg mt-4">
              This application,{" "}
              <Text className="text-lg text-red-600 font-bold">PokéLite</Text>,
              is an unofficial fan project and is not affiliated with,
              maintained by, or endorsed by Nintendo, Creatures Inc., or GAME
              FREAK inc. in any capacity.
            </Text>
          </View>
        </View>

        {/* Credits */}
        <View className="mt-8">
          <View className="flex flex-row items-center gap-2">
            <FontAwesome5 name="database" size={20} color="#DD0000" />
            <Text className="text-2xl font-space-grotesk-bold">
              Data Credits
            </Text>
          </View>
          <View className="mt-2 p-4 border border-red-500/20 rounded-lg">
            <Text className="text-lg">
              All Pokémon-related data, statistics, and high-quality assets used
              within this application are provided by the{" "}
              <Text className="text-lg text-red-600 font-bold">PokéAPI</Text>.
            </Text>
            <Text className="text-lg mt-4">
              I would like to express my deepest gratitude to the PokéAPI
              maintainers and the open-source community for providing such an
              incredible public resource for developers worldwide.
            </Text>
          </View>
        </View>

        {/* Socials */}
        <View className="mt-8">
          <View className="flex flex-row items-center gap-2">
            <FontAwesome5 name="user-friends" size={20} color="#DD0000" />
            <Text className="text-2xl font-space-grotesk-bold">Socials</Text>
          </View>
          <Pressable
            className="mt-2 p-4 border border-red-500/20 rounded-lg"
            onPress={() => Linking.openURL("https://github.com/rijanniraula")}
          >
            {/* Github */}
            <View className="flex flex-row items-center justify-between">
              <View className="flex flex-row items-center gap-2">
                <AntDesign
                  name="github"
                  size={20}
                  className="p-2 bg-red-500/10 rounded-full"
                  color="#DD0000"
                />
                <Text className="text-lg">Github</Text>
              </View>
              <Feather name="external-link" size={20} color="black" />
            </View>
          </Pressable>
          <Pressable
            className="mt-4 p-4 border border-red-500/20 rounded-lg"
            onPress={() =>
              Linking.openURL("https://www.linkedin.com/in/rijan-niraula/")
            }
          >
            {/* LinkedIn */}
            <View className="flex flex-row items-center justify-between">
              <View className="flex flex-row items-center gap-2">
                <Entypo
                  name="linkedin"
                  size={20}
                  className="p-2 bg-red-500/10 rounded-full"
                  color="#DD0000"
                />
                <Text className="text-lg">LinkedIn</Text>
              </View>
              <Feather name="external-link" size={20} color="black" />
            </View>
          </Pressable>
        </View>
      </ScrollView>
      <View className="w-full p-4">
        <Button
          variant={"destructive"}
          className="rounded-2xl h-16 w-full"
          onPress={() => router.push("/onboarding/dataFetchingLoader")}
        >
          <Text className="text-xl font-bold">Get Started</Text>
        </Button>
      </View>
    </View>
  );
};

export default LegalDescription;
