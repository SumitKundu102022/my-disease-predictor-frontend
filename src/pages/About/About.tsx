import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Brain, Heart, ShieldCheck, Microscope } from "lucide-react";
import { useLoading } from "@/contexts/LoadingContext";



const AboutPage = () => {
  const { setIsLoadingRoute } = useLoading(); // Use the loading context

  useEffect(() => {
    // When this component mounts, it means the page content is loaded
    setIsLoadingRoute(false);
  }, [setIsLoadingRoute]); // Dependency array includes setIsLoadingRoute

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // List of diseases your model detects
  const detectableDiseases = [
    "Eczema",
    "Melanoma",
    "Atopic Dermatitis",
    "Basal Cell Carcinoma (BCC)",
  ];

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-12 px-4 sm:px-6 lg:px-8 py-8">
      {" "}
      {/* Added py-8 for some vertical padding */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg"
      >
        About Our Disease Prediction System
      </motion.h1>
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible" // Changed from animate to whileInView
        viewport={{ once: true, amount: 0.4 }} // Trigger when 40% of the section is in view, only once
        className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-8 max-w-4xl text-gray-800 space-y-6"
      >
        <h2 className="text-3xl font-semibold text-gray-900">Our Mission</h2>
        <p className="text-lg leading-relaxed">
          At MediScan, our mission is to empower individuals with preliminary
          insights into potential skin conditions through cutting-edge
          artificial intelligence. By leveraging advanced machine learning
          models, we aim to provide a convenient and accessible tool for early
          detection, promoting proactive health management.
        </p>
        <p className="text-lg leading-relaxed text-yellow-500 italic">
          Disclaimer: This system is for informational and educational purposes
          only and should not be used as a substitute for professional medical
          advice, diagnosis, or treatment. Always consult with a qualified
          healthcare professional for any health concerns.
        </p>
      </motion.section>
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible" // Changed from animate to whileInView
        viewport={{ once: true, amount: 0.4 }} // Trigger when 40% of the section is in view, only once
        className="w-full max-w-6xl"
      >
        <h2 className="text-3xl font-semibold text-white mb-8 drop-shadow-lg">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 flex flex-col items-center text-center space-y-4"
          >
            <Brain className="w-16 h-16 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900">
              AI-Powered Analysis
            </h3>
            <p className="text-gray-700">
              Utilizes a deep learning model (MobileNetV2) trained on extensive
              datasets for accurate image analysis.
            </p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 flex flex-col items-center text-center space-y-4"
          >
            <ShieldCheck className="w-16 h-16 text-green-600" />
            <h3 className="text-xl font-semibold text-gray-900">
              User-Friendly Interface
            </h3>
            <p className="text-gray-700">
              Simple image upload and clear prediction results for an intuitive
              user experience.
            </p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 flex flex-col items-center text-center space-y-4"
          >
            <Heart className="w-16 h-16 text-red-600" />
            <h3 className="text-xl font-semibold text-gray-900">
              Promoting Awareness
            </h3>
            <p className="text-gray-700">
              Aims to increase awareness about common skin conditions and
              encourage timely medical consultation.
            </p>
          </motion.div>
        </div>
      </motion.section>
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible" // Changed from animate to whileInView
        viewport={{ once: true, amount: 0.4 }} // Trigger when 40% of the section is in view, only once
        className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-8 max-w-4xl text-gray-800 space-y-6"
      >
        <h2 className="text-3xl font-semibold text-gray-900 flex items-center justify-center gap-3">
          <Microscope className="w-8 h-8 text-purple-600" />
          Diseases Our Model Can Detect
        </h2>
        <p className="text-lg leading-relaxed">
          Our AI model is trained to identify the following types of skin
          conditions from images:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed text-left mx-auto max-w-md space-y-2">
          {detectableDiseases.map((disease, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }} // Changed from animate to whileInView
              viewport={{ once: true, amount: 0.8 }} // Trigger when 80% of the item is in view
              transition={{ delay: index * 0.05, duration: 0.5 }} // Reduced individual delay for smoother stagger
              className="flex items-center gap-2"
            >
              <span className="text-green-500">✔</span> {disease}
            </motion.li>
          ))}
        </ul>
        <p className="text-sm text-gray-600 italic">
          (Note: The accuracy of detection depends on image quality and model
          training data.)
        </p>
      </motion.section>
    </div>
  );
};

export default AboutPage;
