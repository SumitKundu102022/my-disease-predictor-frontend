import React from "react";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react"; // Import the Rocket icon
import { HeartPlus } from "lucide-react"; // Example icon

interface SplashScreenProps {
  onAnimationComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onAnimationComplete }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-blue-600 to-green-500 flex flex-col items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      onAnimationComplete={onAnimationComplete} // This callback will signal App.tsx after the main splash screen fade-in
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center text-white"
      >
        {/* Rocket Animation */}
        <motion.div
          initial={{ y: "100vh", opacity: 0, rotate: -45 }} // Start from bottom, rotated off-screen
          animate={{ y: 0, opacity: 1, rotate: 0 }} // Move to center of screen, straighten
          transition={{
            delay: 0.2, // Start rocket animation slightly after the splash screen appears
            duration: 1.5, // Longer duration for a smooth "launch" effect
            ease: "easeOut",
          }}
          className="mb-4" // Margin below the rocket icon
        >
          <HeartPlus className="w-24 h-24" /> {/* Rocket Icon */}
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 1.2, // Title appears after the rocket has mostly settled
            duration: 0.6,
          }}
          className="text-5xl font-bold drop-shadow-lg"
        >
          MediScan
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 1.5, // Subtitle appears after the title
            duration: 0.6,
          }}
          className="text-xl mt-2 drop-shadow-md"
        >
          Your AI-Powered Disease Predictor
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
