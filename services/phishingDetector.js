import { extractFeatures } from "./featureExtractor";
import { predict } from "./randomForest";

export async function detectPhishing(url) {
  try {
    const features = await extractFeatures(url);

    const result = predict(features);

    if (result === -1) {
      return {
        label: "PHISHING",
        color: "red",
      };
    }

    return {
      label: "LEGITIMATE",
      color: "green",
    };
  } catch (error) {
    return {
      label: "ERROR ANALYZING URL",
      color: "orange",
    };
  }
}
