export async function analyzeMessage(message) {
  const text = message.toLowerCase();

  // 🔁 Local fallback function
  function localDetection(msg) {
    let score = 0;

    // 🚨 Strong scam indicators (HIGH weight)
    const highRisk = ["otp", "password", "bank", "account", "verify", "login"];

    // ⚠️ Medium indicators
    const mediumRisk = [
      "urgent",
      "click",
      "win",
      "prize",
      "lottery",
      "free",
      "offer",
    ];

    // 💰 money patterns
    const moneyPattern = /₹|\$|\d{3,}/;

    highRisk.forEach((word) => {
      if (msg.includes(word)) score += 2;
    });

    mediumRisk.forEach((word) => {
      if (msg.includes(word)) score += 1;
    });

    if (moneyPattern.test(msg)) score += 2;

    if (msg.includes("http") || msg.includes("www")) score += 2;

    // 🚨 FINAL DECISION
    if (score >= 3) {
      return { label: "SCAM", color: "red" };
    }

    return { label: "SAFE", color: "green" };
  }

  // 🌐 Try Ollama AI first
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000); // 4 sec timeout

    const response = await fetch("http://192.168.1.69:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: "mistral",
        prompt: `Classify this message strictly as SCAM or SAFE. Answer only one word.\nMessage: ${message}`,
        stream: false,
      }),
    });

    clearTimeout(timeout);

    const data = await response.json();

    if (!data.response) {
      console.log("Ollama failed → fallback");
      return localDetection(text);
    }

    const result = data.response.trim().toUpperCase();

    if (result.includes("SCAM")) {
      return { label: "SCAM", color: "red" };
    }

    return { label: "SAFE", color: "green" };
  } catch (error) {
    console.log("Ollama error → fallback");

    return localDetection(text);
  }
}
