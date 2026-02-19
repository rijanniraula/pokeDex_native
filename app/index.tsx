// app/index.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const [status, setStatus] = useState<"loading" | "onboarded" | "new">(
    "loading"
  );

  useEffect(() => {
    AsyncStorage.getItem("pokemon_seeded").then((value) => {
      setStatus(value === "true" ? "onboarded" : "new");
    });
  }, []);

  if (status === "loading") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#DD0000" />
      </View>
    );
  }

  if (status === "onboarded") {
    return <Redirect href="/pokedex" />;
  }

  return <Redirect href="/onboarding" />;
}
