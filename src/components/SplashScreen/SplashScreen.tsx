import React from "react";
import { motion } from "framer-motion";
import { LeafyGreen } from "lucide-react"; // Example icon

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
      onAnimationComplete={() => {
        // This callback fires after the initial 'animate' completes
        // We'll use a setTimeout in App.tsx to control overall duration
      }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center text-white"
      >
        <LeafyGreen className="w-24 h-24 mb-4" /> {/* Example Icon */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-5xl font-bold drop-shadow-lg"
        >
          MediScan
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-xl mt-2 drop-shadow-md"
        >
          Your AI-Powered Disease Predictor
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
