// app/_layout.tsx
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function Layout() {
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
      </SafeAreaProvider>
    </>
  );
}
