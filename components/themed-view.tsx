import { Colors } from "@/constants/theme";
import { type ViewProps } from "react-native";
import Animated, { Easing, FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export type ThemedViewProps = ViewProps & {
  padding?: boolean;
};

export function ThemedView({
  style,
  padding = true,
  ...otherProps
}: ThemedViewProps) {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors.background }}
      edges={["top", "left", "right"]}
    >
      <Animated.View
        entering={FadeIn.duration(400).easing(Easing.out(Easing.ease))}
        key="screen"
        style={[
          {
            flex: 1,
            padding: padding ? 16 : 0,
          },
          style,
        ]}
        {...otherProps}
      />
    </SafeAreaView>
  );
}
