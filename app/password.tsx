import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { Colors } from "@/constants/theme";
import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import { Alert, Dimensions, StyleSheet, TextInput, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function PasswordTools() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const BAR_WIDTH = Dimensions.get("window").width - 32;
  const progress = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    width: progress.value * 300,
  }));

  const checkStrength = () => {
    if (!password) return;

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) {
      setStrength("WEAK");
      progress.value = withTiming(0.33, { duration: 500 });
    } else if (score === 2) {
      setStrength("MEDIUM");
      progress.value = withTiming(0.66, { duration: 500 });
    } else {
      setStrength("STRONG");
      progress.value = withTiming(1, { duration: 500 });
    }
  };
  const generatePassword = () => {
    const length = 12;
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

    let newPassword = "";

    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(newPassword);
    setStrength("");
  };
  const copyPassword = async () => {
    if (!password) return;

    await Clipboard.setStringAsync(password);
    Alert.alert("Copied!", "Password copied to clipboard");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Password Tools
      </ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Enter password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
      />

      <AnimatedButton style={styles.button} onPress={checkStrength}>
        <ThemedText type="button" style={styles.buttonText}>
          Check Strength
        </ThemedText>
      </AnimatedButton>
      <AnimatedButton style={styles.button} onPress={generatePassword}>
        <ThemedText type="button" style={styles.buttonText}>
          Generate Password
        </ThemedText>
      </AnimatedButton>
      <AnimatedButton style={styles.button} onPress={copyPassword}>
        <ThemedText type="button" style={styles.buttonText}>
          Copy Password
        </ThemedText>
      </AnimatedButton>

      {strength !== "" && (
        <View style={{ width: "100%", alignItems: "center" }}>
          <ThemedText
            style={[
              styles.result,
              {
                color:
                  strength === "WEAK"
                    ? Colors.danger
                    : strength === "MEDIUM"
                      ? Colors.warning
                      : Colors.success,
              },
            ]}
          >
            🔐 {strength}
          </ThemedText>

          {/* 🔥 ADD STRENGTH BAR HERE */}
          <View style={styles.strengthBar}>
            <Animated.View
              style={[
                styles.strengthFill,
                animatedStyle,
                {
                  backgroundColor:
                    strength === "WEAK"
                      ? Colors.danger
                      : strength === "MEDIUM"
                        ? Colors.warning
                        : Colors.success,
                },
              ]}
            />
          </View>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },

  title: {
    color: Colors.primary,
    textAlign: "center",
    marginBottom: 25,
  },

  input: {
    width: "100%",
    backgroundColor: Colors.inputBg,
    padding: 14,
    borderRadius: 12,
    color: Colors.textPrimary,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  button: {
    backgroundColor: Colors.primary,
    padding: 14,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 12, // ✅ THIS FIXES CROWDING
  },

  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },

  result: {
    marginTop: 25,
    fontSize: 18,
    textAlign: "center",
  },
  strengthBar: {
    width: "100%",
    height: 4, // ✅ THIN BAR
    backgroundColor: Colors.border,
    borderRadius: 5,
    marginTop: 8,
    overflow: "hidden",
  },

  strengthFill: {
  height: "100%",
  borderRadius: 5,
},
});
