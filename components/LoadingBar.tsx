import React from "react";
import { Text, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

const LoaderBar = ({ text = "Loading..." }) => {
  const translateX = useSharedValue(0);

  // Animate stripes
  React.useEffect(() => {
    translateX.value = withRepeat(withTiming(40, { duration: 800 }), -1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View className="mt-1 h-5 w-full rounded bg-red-500/20 overflow-hidden">
      {/* Progress fill */}
      <View className="absolute inset-0 bg-red-500" />

      {/* Animated stripes */}
      <Animated.View
        className="absolute inset-0 flex-row opacity-30"
        style={animatedStyle}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <View key={i} className="w-4 h-full bg-white/40 rotate-12 mr-2" />
        ))}
      </Animated.View>

      {/* Label */}
      <View className="absolute inset-0 items-center justify-center">
        <Text className="text-xs font-semibold text-white">{text}</Text>
      </View>
    </View>
  );
};

export default LoaderBar;
