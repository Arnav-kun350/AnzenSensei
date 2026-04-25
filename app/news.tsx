import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
type NewsItem = {
  title: string;
  link: string;
  image?: string;
};

export default function NewsScreen() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const response = await fetch(
        "https://api.spaceflightnewsapi.net/v4/articles",
      );

      const data = await response.json();

      const filtered = data.results.filter((item: any) => {
        const title = item.title?.toLowerCase() || "";

        return (
          title.includes("cyber") ||
          title.includes("hack") ||
          title.includes("security") ||
          title.includes("malware") ||
          title.includes("attack")
        );
      });

      const finalData = filtered.length > 0 ? filtered : data.results;

      const newsList: NewsItem[] = finalData.map((item: any) => ({
        title: item.title || "No Title",
        link: item.url || "#",
        image: item.image_url || item.imageUrl || null,
      }));

      setNews(newsList);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Cyber News
      </ThemedText>

      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary} />
      ) : (
        <>
          {/* Show message if no cyber news */}
          {news.length === 0 && (
            <ThemedText style={styles.emptyText}>
              Showing general news (no cyber news found)
            </ThemedText>
          )}

          <FlatList
            data={news}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => Linking.openURL(item.link)}
              >
                {item.image && (
                  <Image source={{ uri: item.image }} style={styles.image} />
                )}

                <ThemedText type="body" style={styles.cardText}>
                  {item.title}
                </ThemedText>
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  title: {
    color: Colors.primary,
    marginBottom: 20,
  },

  card: {
    backgroundColor: Colors.card,
    padding: 12,
    borderRadius: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    marginBottom: 10,
  },
  cardText: {
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  emptyText: {
    color: Colors.textMuted,
    marginBottom: 10,
  },
});
