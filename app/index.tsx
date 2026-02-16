// app/index.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";

export default function Index() {
  const onBoarded = AsyncStorage.getItem("pokemon_seeded");

  if (onBoarded) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/pokedex" />;
}
