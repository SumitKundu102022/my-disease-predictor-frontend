import React, { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@components/ui/Alert";
import { CheckCircle, AlertTriangle, Loader2, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";


const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

interface PredictionDisplayProps {
  predictions: { className: string; probability: number }[];
  image?: File | null;
  isLoading: boolean;
  error: string | null;
}

const PredictionDisplay: React.FC<PredictionDisplayProps> = ({
  predictions,
  image,
  isLoading,
  error,
}) => {
  // const hasPredictions = predictions && predictions.length > 0;
  // Ensure predictions is an array and not empty
  const hasPredictions = Array.isArray(predictions) && predictions.length > 0;
  const topPrediction = hasPredictions ? predictions[0] : null; // Get the top prediction

  const [remedies, setRemedies] = useState<string[]>([]);
  const [remedyLoading, setRemedyLoading] = useState(false);
  const [remedyError, setRemedyError] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch remedies if there's a top prediction and not already loading/errored
    if (topPrediction && !isLoading && !error) {
      const fetchRemedies = async () => {
        setRemedyLoading(true);
        setRemedies([]);
        setRemedyError(null);

        try {
          const prompt = `Provide 5 concise home remedies for "${topPrediction.className}" in a bulleted list format. Do not include any introductory or concluding sentences. Only provide the bullet points. Each remedy should be short.`;
          let chatHistory = [];
          chatHistory.push({ role: "user", parts: [{ text: prompt }] });

          const payload = { contents: chatHistory };
          // const apiKey = ""; // Canvas will automatically provide this at runtime
          const apiKey = GEMINI_API_KEY;  // Canvas will automatically provide this at runtime
          const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

          const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error(`LLM API error: ${response.statusText}`);
          }

          const result = await response.json();

          if (
            result.candidates &&
            result.candidates.length > 0 &&
            result.candidates[0].content &&
            result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0
          ) {
            const text = result.candidates[0].content.parts[0].text;
            // Split the text into bullet points
            interface RemedyParseResult {
              parsedRemedies: string[];
            }

            const parsedRemedies: RemedyParseResult["parsedRemedies"] = text
              .split("\n")
              .filter(
              (line: string) =>
                line.trim().startsWith("*") || line.trim().startsWith("-")
              )
              .map((line: string) => line.trim().substring(1).trim());
            setRemedies(parsedRemedies);
          } else {
            setRemedyError(
              "Could not generate remedies. Unexpected LLM response."
            );
          }
        } catch (err: any) {
          console.error("Error fetching remedies:", err);
          setRemedyError(err.message || "Failed to fetch home remedies.");
        } finally {
          setRemedyLoading(false);
        }
      };

      fetchRemedies();
    }
  }, [topPrediction, isLoading, error]); // Re-run when topPrediction changes or main loading/error state changes

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {image && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="w-full max-w-md mx-auto rounded-xl overflow-hidden border border-gray-200 shadow-lg"
          >
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded for prediction"
              className="w-full h-auto object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-8">
          <Loader2 className="animate-spin w-10 h-10 text-white mb-4" />
          <p className="text-white">
            Analyzing image and generating predictions...
          </p>
        </div>
      )}

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {topPrediction && !isLoading && !error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-500" />
              Prediction Results
            </h2>
            <div className="space-y-4">
              {/* {predictions.map((prediction, index) => ( */}
              <div
                // key={index}
                className={cn(
                  "p-4 rounded-lg border border-green-500 bg-green-50",
                  // index === 0
                  //   ? "border-green-500 bg-green-50"
                  //   : "border-gray-200",
                  "flex items-center justify-between"
                )}
              >
                <span className="text-lg font-medium">
                  {topPrediction.className}
                </span>
                <span className="text-gray-700">
                  {topPrediction.probability.toFixed(4)}
                </span>
              </div>
              {/* ))} */}
            </div>
            {/* Home Remedies Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2 mt-4">
                <Home className="w-6 h-6 text-orange-500" />{" "}
                {/* Home icon for remedies */}
                Home Remedies
              </h2>
              {remedyLoading && (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
                  <p className="ml-2 text-gray-600">Generating remedies...</p>
                </div>
              )}
              {remedyError && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Remedy Error</AlertTitle>
                  <AlertDescription>{remedyError}</AlertDescription>
                </Alert>
              )}
              {!remedyLoading && !remedyError && remedies.length > 0 && (
                <ul className="list-disc list-inside text-left space-y-2 text-gray-700">
                  {remedies.map((remedy, index) => (
                    <li key={index}>{remedy}</li>
                  ))}
                </ul>
              )}
              {!remedyLoading && !remedyError && remedies.length === 0 && (
                <p className="text-gray-600">
                  No specific home remedies found or generated for this
                  condition.
                </p>
              )}
              <p className="text-sm text-gray-500 mt-4 italic">
                Disclaimer: These are general home remedies and not a substitute
                for professional medical advice. Consult a healthcare
                professional for diagnosis and treatment.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && !hasPredictions && !error && (
        <div
          className="bg-white/80 rounded-xl shadow-md p-6 text-center flex flex-col items-center justify-center"
          style={{ minHeight: "200px" }}
        >
          <p className="text-gray-600">Upload an image to see predictions.</p>
        </div>
      )}
    </div>
  );
};

export default PredictionDisplay;
