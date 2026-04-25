import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { analyzeMessage } from "../services/messageAI";

export default function MessageScanner() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");

  const scanMessage = async () => {
    if (!message) return;

    setResult("Analyzing...");

    const res = await analyzeMessage(message);

    setResult(res.label);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Message Scanner</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter message"
        placeholderTextColor="#888"
        value={message}
        onChangeText={setMessage}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={scanMessage}>
        <Text style={styles.buttonText}>Scan Message</Text>
      </TouchableOpacity>

      {result !== "" && <Text style={styles.result}>{result}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0F14",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 26,
    color: "#00F5A0",
    fontWeight: "bold",
    marginBottom: 30,
  },

  input: {
    width: "100%",
    backgroundColor: "#111A22",
    padding: 15,
    borderRadius: 10,
    color: "#fff",
    marginBottom: 20,
    minHeight: 100,
  },

  button: {
    backgroundColor: "#00F5A0",
    padding: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },

  result: {
    marginTop: 30,
    fontSize: 18,
    color: "#fff",
  },
});
