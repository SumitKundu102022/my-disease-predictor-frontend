import React, { useState, useCallback, useEffect } from "react";
import Button from "../../components/ui/Button";
import ImageUploader from "../../components/ImageUploader/ImageUploader";
import PredictionDisplay from "../../components/PredictionDisplay/PredictionDisplay";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/Alert";
import { AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLoading } from "@/contexts/LoadingContext";

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_URL; // Update this to your backend URL

const PredictionPage = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [predictions, setPredictions] = useState<
    { className: string; probability: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setIsLoadingRoute } = useLoading(); // Use the loading context

  // Define variants for scroll animations
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
    },
  };

  useEffect(() => {
    // When this component mounts, it means the page content is loaded
    setIsLoadingRoute(false);
  }, [setIsLoadingRoute]); // Dependency array includes setIsLoadingRoute

  // Define your backend URL
  // IMPORTANT: Change this if your Flask backend is running on a different host/port
  //const backendUrl = "http://localhost:5000/predict";
  const backendUrl = `${BACKEND_API_URL}/predict` // Use the environment variable for the backend URL

  // Function to handle image selection
  const handleImageSelect = useCallback((file: File) => {
    setSelectedImage(file);
    setError(null); // Clear any previous errors
    setPredictions([]);
  }, []);

  // Function to clear the selected image
  const handleClearImage = () => {
    setSelectedImage(null);
    setPredictions([]);
    setError(null);
  };

  // Simulate sending image to a backend for prediction
  const handlePredict = useCallback(async () => {
    if (!selectedImage) {
      setError("Please select an image to analyze.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setPredictions([]);

    // Simulate an API call with a delay
    try {
      // In a real application, you would send the image to your Flask backend here
      // using fetch or axios.  For this example, we'll just simulate a response.
      // await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate 2-second delay

      // // Simulate a successful response from the backend
      // const simulatedResponse = {
      //   predictions: [
      //     { className: "Disease A", probability: 0.85 },
      //     // { className: "Disease B", probability: 0.12 },
      //     // { className: "Disease C", probability: 0.03 },
      //   ],
      // };
      const formData = new FormData();
      formData.append("image", selectedImage); // 'image' must match the backend's expected field name

      const response = await fetch(backendUrl, {
        method: "POST",
        body: formData,
        // No 'Content-Type' header needed for FormData, fetch sets it automatically
      });

      if (!response.ok) {
        // Handle HTTP errors (e.g., 400, 500)
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();

      if (data.predictions && Array.isArray(data.predictions)) {
        // Sort predictions by probability in descending order
        const sortedPredictions = data.predictions.sort(
          (a: any, b: any) => b.probability - a.probability
        );
        setPredictions(sortedPredictions);
      } else if (data.error) {
        throw new Error(data.error);
      } else {
        throw new Error(
          'Unexpected response format from server. Missing "predictions" array.'
        );
      }

      // Simulate an error
      // throw new Error("Failed to analyze image. Please try again.");

      // setPredictions(simulatedResponse.predictions);
    } catch (err: any) {
      console.error("Prediction failed:", err);
      setError(err.message || "An unknown error occurred during prediction.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedImage, backendUrl]);

  useEffect(() => {
    // If you want to automatically trigger prediction after image selection
    // you can call handlePredict here
  }, [selectedImage]);

  return (
    <div className="space-y-8 py-8">
      <motion.h1 // HIGHLIGHTED CHANGE: Animated H1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl font-bold text-white text-center drop-shadow-lg"
      >
        {/* Image Analysis */}
        Predict Type of Skin Disease
      </motion.h1>

      <motion.div // HIGHLIGHTED CHANGE: Animated main content div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Trigger when 30% of the section is in view
        className="flex flex-col md:flex-row gap-8"
      >
        <div className="w-full md:w-1/2">
          <ImageUploader
            onImageSelect={handleImageSelect}
            onClear={handleClearImage}
            selectedImage={selectedImage}
            isUploading={isLoading}
            error={error ?? undefined}
          />
          <motion.div // HIGHLIGHTED CHANGE: Animated button container
            variants={buttonVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }} // Trigger when button is mostly in view
            className="mt-6"
          >
            <Button
              onClick={handlePredict}
              disabled={isLoading || !selectedImage}
              className={cn(
                "w-full py-3 rounded-full",
                "bg-blue-600 text-white hover:bg-blue-700",
                "w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-3",
                "hover:from-blue-700 hover:to-green-600 transition-colors duration-300",
                "cursor-pointer",
                "focus:outline-none focus:ring-0.5 focus:ring-orange-500 focus:ring-opacity-50",
                "transition-colors duration-300",
                (isLoading || !selectedImage) && "opacity-50 cursor-not-allowed"
              )}
            >
              Analyze Image
            </Button>
          </motion.div>
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4"
              >
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="w-full md:w-1/2">
          <PredictionDisplay
            predictions={predictions}
            // image={selectedImage}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default PredictionPage;
