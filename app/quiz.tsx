import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { Colors } from "@/constants/theme";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import easyData from "../assets1/ml/data/easy.json";
import hardData from "../assets1/ml/data/hard.json";
const getRandomQuestions = (data: any[], count: number) => {
  const shuffled = [...data].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function QuizScreen() {
  const [level, setLevel] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  return (
    <ThemedView style={styles.container}>
      {!started ? (
        <>
          <ThemedText type="title" style={styles.title}>
            Cyber Quiz
          </ThemedText>

          <AnimatedButton
            style={styles.button}
            onPress={() => {
              setLevel("easy");
              const selected = getRandomQuestions(easyData, 20);
              console.log("EASY DATA:", easyData);
              console.log("SELECTED QUESTIONS:", selected);
              setQuestions(selected);
              setStarted(true);
              setFinished(false);
              setScore(0);
              setUserAnswers([]);
              setCurrent(0);
            }}
          >
            <ThemedText type="button" style={styles.buttonText}>
              Easy
            </ThemedText>
          </AnimatedButton>

          <AnimatedButton
            style={styles.button}
            onPress={() => {
              setLevel("hard");
              const selected = getRandomQuestions(hardData, 20);
              console.log("HARD DATA:", hardData);
              console.log("SELECTED QUESTIONS:", selected);
              setQuestions(selected);
              setStarted(true);
              setFinished(false);
              setScore(0);
              setUserAnswers([]);
              setCurrent(0);
            }}
          >
            <ThemedText type="button" style={styles.buttonText}>
              Hard
            </ThemedText>
          </AnimatedButton>
        </>
      ) : finished ? (
        <ScrollView style={{ width: "100%", padding: 20 }}>
          <ThemedText type="title" style={styles.score}>
            🎯 Score: {score} / {questions.length}
          </ThemedText>

          {questions.map((q, index) => (
            <View key={index} style={{ marginBottom: 15 }}>
              <ThemedText>{q.question}</ThemedText>

              <ThemedText style={{ color: Colors.success }}>
                Correct: {q.options[q.answer]}
              </ThemedText>

              <ThemedText style={{ color: Colors.warning }}>
                Your answer: {q.options[userAnswers[index]]}
              </ThemedText>
            </View>
          ))}

          <AnimatedButton
            style={styles.button}
            onPress={() => setStarted(false)}
          >
            <ThemedText type="button" style={styles.buttonText}>
              Back
            </ThemedText>
          </AnimatedButton>
        </ScrollView>
      ) : (
        <View>
          <ThemedText style={styles.progressText}>
            Question {current + 1} / {questions.length}
          </ThemedText>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${((current + 1) / questions.length) * 100}%` },
              ]}
            />
          </View>
          <ThemedText type="subtitle" style={styles.question}>
            {questions[current]?.question}
          </ThemedText>

          {questions[current]?.options.map((option: string, index: number) => (
            <AnimatedButton
              key={index}
              style={styles.button}
              onPress={() => {
                const newAnswers = [...userAnswers];
                newAnswers[current] = index;
                setUserAnswers(newAnswers);

                if (index === questions[current].answer) {
                  setScore(score + 1);
                }

                if (current + 1 < questions.length) {
                  setCurrent(current + 1);
                } else {
                  setFinished(true);
                }
              }}
            >
              <ThemedText type="button" style={styles.buttonText}>
                {option}
              </ThemedText>
            </AnimatedButton>
          ))}
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  title: {
    color: Colors.primary,
    marginBottom: 20,
  },

  button: {
    backgroundColor: Colors.primary,
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    width: "100%",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
  },

  question: {
    marginBottom: 20,
    textAlign: "center",
  },

  progressText: {
    color: Colors.textSecondary,
    marginBottom: 10,
  },

  progressBar: {
    width: "100%",
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 10,
    marginBottom: 15,
  },

  progressFill: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 10,
  },

  score: {
    color: Colors.primary,
    marginBottom: 20,
  },
});
