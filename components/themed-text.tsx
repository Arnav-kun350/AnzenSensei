import { Colors } from "@/constants/theme";
import { StyleSheet, Text, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  type?: "body" | "title" | "subtitle" | "caption" | "button";
};

export function ThemedText({ style, type = "body", ...rest }: ThemedTextProps) {
  return (
    <Text
      style={[
        { color: Colors.textPrimary },
        type === "body" && styles.body,
        type === "title" && styles.title,
        type === "subtitle" && styles.subtitle,
        type === "caption" && styles.caption,
        type === "button" && styles.button,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  body: {
    fontSize: 16,
    lineHeight: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 34,
  },

  subtitle: {
    fontSize: 20,
    fontWeight: "600",
  },

  caption: {
    fontSize: 13,
    color: Colors.textMuted,
  },

  button: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
