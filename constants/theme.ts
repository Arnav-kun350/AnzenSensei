/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

export const Colors = {
  // 🌑 Backgrounds
  background: "#0B0F1A",
  card: "#121826",
  surface: "#1A2238",

  // 🎯 Primary (Cyber Gradient Base)
  primary: "#7C4DFF",
  secondary: "#00E5FF",

  // 🟢 Status Colors
  success: "#00E676",
  warning: "#FF9100",
  danger: "#FF3D00",

  // 📝 Text
  textPrimary: "#FFFFFF",
  textSecondary: "#9BA1A6",
  textMuted: "#6B7280",

  // 🎨 UI Elements
  border: "#2A2F45",
  inputBg: "#1E263B",

  // ✨ Gradients (we'll use later)
  gradientPrimary: ["#7C4DFF", "#00E5FF"],
  gradientDanger: ["#FF3D00", "#FF9100"],
  gradientSuccess: ["#00E676", "#00E5FF"],
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
