import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { detectPhishing } from "../services/phishingDetector";

export default function PhishingScanner() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const scanURL = async () => {
    if (!url) return;

    setLoading(true);
    setResult(null);

    const res = await detectPhishing(url);

    setResult(res);
    setLoading(false);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Phishing Scanner
      </ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Enter URL"
        placeholderTextColor="#888"
        value={url}
        onChangeText={setUrl}
      />

      <TouchableOpacity style={styles.button} onPress={scanURL}>
        <ThemedText type="button" style={styles.buttonText}>
          Scan URL
        </ThemedText>
      </TouchableOpacity>

      {loading && <ThemedText style={styles.loading}>Scanning...</ThemedText>}

      {result && !loading && (
        <View style={styles.resultBox}>
          <ThemedText
            type="subtitle"
            style={{
              color:
                result.label === "Phishing" ? Colors.danger : Colors.success,
            }}
          >
            {result.label}
          </ThemedText>

          {result.probability && (
            <ThemedText style={styles.probability}>
              Probability: {(result.probability * 100).toFixed(2)}%
            </ThemedText>
          )}
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
    marginBottom: 30,
  },

  input: {
    width: "100%",
    backgroundColor: Colors.inputBg,
    padding: 15,
    borderRadius: 12,
    color: Colors.textPrimary,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  button: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
  },

  result: {
    marginTop: 30,
    fontSize: 18,
    color: "#fff",
  },
  loading: {
    marginTop: 20,
    textAlign: "center",
    color: Colors.textSecondary,
  },

  resultBox: {
    marginTop: 30,
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  probability: {
    marginTop: 10,
    color: Colors.textSecondary,
  },
});
