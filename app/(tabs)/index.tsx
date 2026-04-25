import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth, db } from "../../firebaseConfig";
export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);

      if (u) {
        const docRef = doc(db, "users", u.uid);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          setUserData(snap.data());
        }
      }
    });

    return unsubscribe;
  }, []);
  return (
    <ThemedView style={styles.container}>
      <AnimatedButton
        style={styles.loginButton}
        onPress={() => {
          if (user) {
            signOut(auth);
          } else {
            router.push("/login");
          }
        }}
      >
        <ThemedText type="button" style={styles.loginText}>
          {user ? "Logout" : "Login"}
        </ThemedText>
      </AnimatedButton>
      <ThemedText type="title" style={styles.title}>
        AnzenSensei
      </ThemedText>
      <ThemedText type="subtitle" style={styles.subtitle}>
        Cyber Safety Companion
      </ThemedText>
      {user && (
        <ThemedText style={styles.welcomeText}>
          Welcome, {userData?.name || user.email}
        </ThemedText>
      )}

      <View style={styles.grid}>
        <AnimatedButton
          style={styles.card}
          onPress={() => router.push("/phishing")}
        >
          <Ionicons name="shield-checkmark" size={32} color="#00F5A0" />
          <ThemedText type="body" style={styles.cardText}>
            Phishing Scanner
          </ThemedText>
        </AnimatedButton>

        <AnimatedButton
          style={styles.card}
          onPress={() => router.push("/message")}
        >
          <Ionicons name="chatbubble-ellipses" size={32} color="#00D9FF" />
          <Text style={styles.cardText}>Message Scanner</Text>
        </AnimatedButton>

        <AnimatedButton
          style={styles.card}
          onPress={() => router.push("/password")}
        >
          <Ionicons name="key" size={32} color="#00F5A0" />
          <Text style={styles.cardText}>Password Tools</Text>
        </AnimatedButton>

        <AnimatedButton
          style={styles.card}
          onPress={() => router.push("/news")}
        >
          <Ionicons name="newspaper" size={32} color="#00D9FF" />
          <Text style={styles.cardText}>Cyber News</Text>
        </AnimatedButton>

        <AnimatedButton
          style={styles.card}
          onPress={() => router.push("/quiz")}
        >
          <Ionicons name="game-controller" size={32} color="#00F5A0" />
          <Text style={styles.cardText}>Cyber Quiz</Text>
        </AnimatedButton>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  welcomeText: {
    color: Colors.secondary,
    textAlign: "center",
    marginTop: 6,
  },

  title: {
    fontSize: 30,
    color: Colors.primary,
    fontWeight: "bold",
    textAlign: "center",
  },

  loginButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    zIndex: 10,
  },

  loginText: {
    color: "#fff",
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 14,
    color: Colors.secondary,
    textAlign: "center",
    marginBottom: 30,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
  },

  card: {
    width: "47%",
    backgroundColor: Colors.card,
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  cardText: {
    color: Colors.textPrimary,
    marginTop: 10,
    fontSize: 14,
    textAlign: "center",
  },
});
