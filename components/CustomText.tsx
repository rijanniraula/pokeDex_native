import { Text as RNText, TextProps, StyleSheet } from "react-native";

export default function Text({ style, ...props }: TextProps) {
  const flattenedStyle = StyleSheet.flatten(style);
  let fontFamily = "PoppinsRegular";

  if (
    flattenedStyle?.fontWeight === "bold" ||
    flattenedStyle?.fontWeight === "700"
  ) {
    fontFamily = "PoppinsBold";
  } else if (
    flattenedStyle?.fontWeight === "500" ||
    flattenedStyle?.fontWeight === "600"
  ) {
    fontFamily = "PoppinsMedium";
  }

  return <RNText {...props} style={[{ fontFamily }, style]} />;
}
