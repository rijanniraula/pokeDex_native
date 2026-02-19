import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import React from "react";
import { Image, View } from "react-native";

export default function OnBoarding() {
  return (
    <View className="flex-1 bg-orange-200/10 justify-between">
      <View className="flex flex-row p-6 items-center relative">
        <Text variant={"h1"} className="mx-auto">
          PokéLite
        </Text>
      </View>

      <View className="items-center mt-16 gap-10">
        <View className="relative">
          <Image
            source={require("../../assets/images/appLogo.png")}
            style={{ width: 300, height: 300 }}
            className="rounded-2xl mx-auto"
          />
          {/* <View
            className="absolute  w-full bg-red-200"
            style={{ height: 500, width: 500 }}
          /> */}
        </View>

        <View className="py-16 gap-16 items-center">
          <View className="flex items-center gap-4">
            <Text variant={"h1"} className="text-5xl">
              Welcome To
            </Text>
            <Text variant={"h1"} className="text-red-600 text-5xl">
              PokéLite
            </Text>
          </View>
          <Text className="text-center text-xl px-20">
            The fastest, cleanest way to explore the world of Pokémon.
          </Text>
        </View>

        <View className="w-full px-4 pb-4">
          <Button
            variant={"destructive"}
            className="rounded-2xl h-16 w-full"
            onPress={() => router.push("/onboarding/legalDescription")}
          >
            <Text className="text-xl font-bold">Next</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
