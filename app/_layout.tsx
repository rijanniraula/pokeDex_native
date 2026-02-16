// app/_layout.tsx
import { initDb } from "@/lib/db";
import { seedPokemonIfNeeded } from "@/lib/seedPokemon";
import { PortalHost } from "@rn-primitives/portal";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded, error] = useFonts({
    PoppinsLight: require("../assets/fonts/Poppins-Light.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    PoppinsBolder: require("../assets/fonts/Poppins-ExtraBold.ttf"),
    SpaceGrotesk: require("../assets/fonts/SpaceGrotesk-Regular.ttf"),
    SpaceGroteskBold: require("../assets/fonts/SpaceGrotesk-Bold.ttf"),
    SpaceGroteskMedium: require("../assets/fonts/SpaceGrotesk-Medium.ttf"),
    SpaceGroteskLight: require("../assets/fonts/SpaceGrotesk-Light.ttf"),
    SpaceGroteskSemiBold: require("../assets/fonts/SpaceGrotesk-SemiBold.ttf"),
  });

  useEffect(() => {
    initDb();
    seedPokemonIfNeeded();
  }, []);

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle={"dark-content"} />
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </SafeAreaView>
        <PortalHost />
      </SafeAreaProvider>
    </>
  );
}
