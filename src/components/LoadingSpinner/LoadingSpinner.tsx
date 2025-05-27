import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react"; // Spinner icon

const LoadingSpinner: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-40" // z-40 to be below splash, above content
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="animate-spin w-16 h-16 text-blue-600" />
        <p className="text-gray-700 text-lg">Loading application...</p>
      </div>
    </motion.div>
  );
};

export default LoadingSpinner;
