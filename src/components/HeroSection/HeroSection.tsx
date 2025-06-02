import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import robo from "@/assets/images/robo.png"; // Import your robot image
import { useLoading } from "@/contexts/LoadingContext";
import Button from "../ui/Button";
import { cn } from "@/lib/utils";

const textVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Stagger animation for each character
    },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const arrowVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      delay: 2.5, // Start after text animation
    },
  },
};

const robotImageVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      delay: 0.5, // Appear early
    },
  },
};

const HeroSection: React.FC = () => {

  const { setIsLoadingRoute } = useLoading(); // Use the loading context
  
    useEffect(() => {
      // When this component mounts, it means the page content is loaded
      setIsLoadingRoute(false);
    }, [setIsLoadingRoute]); // Dependency array includes setIsLoadingRoute

  const text = "Welcome to the Disease Prediction System";

    return (
      <>
        {/* Content */}
        <div className="flex flex-col items-center justify-center text-center space-y-6 z-10 relative text-white">
          {/* Robot Image on the left */}
          <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block mt-50" // Hide on small screens
            variants={robotImageVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Placeholder for a robot image */}
            <img
              src={robo} // Placeholder robot image
              alt="AI Robot"
              className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full shadow-lg object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/300x300/1a202c/ffffff?text=Robot"; // Fallback
              }}
            />
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-2xl md:text-3xl lg:text-5xl font-extrabold mb-4 drop-shadow-xl"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            {text.split("").map((char, index) => (
              <motion.span key={index} variants={charVariants}>
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text--600 max-w-2xl"
          >
            Upload an image, and our system will analyze it to predict potential
            diseases.
          </motion.p>
          {/* <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            variant="default"
            size="lg"
            className={cn(
              "px-8 py-3 rounded-full",
              "shadow-lg transition-all duration-300",
              "focus:outline-none focus:ring-0.1 focus:ring-orange-500 focus:ring-opacity-50",
              // "focus:ring-offset-orange-300",
              "gap-3 cursor-pointer",
              "w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-3",
              "hover:from-blue-700 hover:to-green-600 transition-colors duration-300",
              "disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-5 mt-6"
            )}
            onClick={() => {
              // Use window.location.href for simple navigation
              setIsLoadingRoute(true); // Set loading true on button click
              window.location.href = "/prediction";
            }}
          >
            Get Started
            {/* <ArrowRight className="w-6 h-6" /> */}
          {/* <ArrowRight className="w-8 h-8 sm:w-10 sm:h-10 text-green-400 animate-pulse" />
          </Button>
        </motion.div> */}

          <motion.div
            className="flex items-center space-x-4"
            variants={arrowVariants}
            initial="hidden"
            animate="visible"
          >
            <Button
              variant="default"
              size="lg"
              className={cn(
                "px-8 py-3 rounded-full",
                "shadow-lg transition-all duration-300",
                "focus:outline-none focus:ring-0.1 focus:ring-orange-500 focus:ring-opacity-50",
                // "focus:ring-offset-orange-300",
                "gap-3 cursor-pointer",
                "w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-3",
                "hover:from-blue-700 hover:to-green-600 transition-colors duration-300",
                "disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-5 mt-6"
              )}
              onClick={() => {
                // Use window.location.href for simple navigation
                setIsLoadingRoute(true); // Set loading true on button click
                window.location.href = "/prediction";
              }}
            >
              Get Started
              {/* <ArrowRight className="w-6 h-6" /> */}
              <ArrowRight className="w-6 h-6  text-green-400 animate-pulse" />
            </Button>
          </motion.div>

          {/* <h1 className="text-2xl font-black z-10 text-[#bcbeff] mt-5 ml-5">
          HTK.
        </h1>

        <div className="flex flex-col text-white  z-10 font-bold mt-auto ml-5 mb-20">
          <div className="text-5xl">
            Voices of <span className="text-[#bcbeff]">Success.</span>
          </div>
          <p className="text-sm font-light mt-4">
            Transformative Experiences from Global Innovators and Industry
            Leaders
          </p>
        </div> */}

          {/* <Marquee
          gradient={true}
          gradientColor="#0000773c"
          speed={30}
          pauseOnHover={true}
          autoFill={true}
          className="flex items-center z-10 h-fit mb-10"
        >
          {testimonials.map((testimonial, index) => (
            <Cards key={index} {...testimonial} />
          ))}
        </Marquee> */}
        </div>
      </>
    );
    // <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white flex items-center justify-center p-4 overflow-hidden">
    //   {/* Robot Image on the left */}
    //   <motion.div
    //     className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block" // Hide on small screens
    //     variants={robotImageVariants}
    //     initial="hidden"
    //     animate="visible"
    //   >
    //     {/* Placeholder for a robot image */}
    //     <img
    //       src={robo} // Placeholder robot image
    //       alt="AI Robot"
    //       className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full shadow-lg object-cover"
    //       onError={(e) => {
    //         e.currentTarget.src =
    //           "https://placehold.co/300x300/1a202c/ffffff?text=Robot"; // Fallback
    //       }}
    //     />
    //   </motion.div>

    //   {/* Content in the center */}
    //   <div className="flex flex-col items-center text-center z-10">
    //     <motion.h1
    //       className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 drop-shadow-xl"
    //       variants={textVariants}
    //       initial="hidden"
    //       animate="visible"
    //     >
    //       {text.split("").map((char, index) => (
    //         <motion.span key={index} variants={charVariants}>
    //           {char}
    //         </motion.span>
    //       ))}
    //     </motion.h1>

    //     <motion.p
    //       className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium mb-8 drop-shadow-md"
    //       initial={{ opacity: 0, y: 20 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ delay: 2, duration: 0.8 }} // Appears after the main title
    //     >
    //       Your AI-Powered Health Companion. Upload an image, and our system will
    //       analyze it to predict potential diseases.
    //     </motion.p>

    //     <motion.div
    //       className="flex items-center space-x-4"
    //       variants={arrowVariants}
    //       initial="hidden"
    //       animate="visible"
    //     >
    //       <Button
    //         variant="default"
    //         size="lg"
    //         className={cn(
    //           "px-8 py-3 rounded-full",
    //           "shadow-lg transition-all duration-300",
    //           "focus:outline-none focus:ring-0.1 focus:ring-orange-500 focus:ring-opacity-50",
    //           // "focus:ring-offset-orange-300",
    //           "gap-3 cursor-pointer",
    //           "w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-3",
    //           "hover:from-blue-700 hover:to-green-600 transition-colors duration-300",
    //           "disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-5 mt-6"
    //         )}
    //         onClick={() => {
    //           // Use window.location.href for simple navigation
    //           setIsLoadingRoute(true); // Set loading true on button click
    //           window.location.href = "/prediction";
    //         }}
    //       >
    //         Get Started
    //         {/* <ArrowRight className="w-6 h-6" /> */}
    //         <ArrowRight className="w-6 h-6  text-green-400 animate-pulse" />
    //       </Button>
    //     </motion.div>
    //   </div>
    // </div>
//   );
};

export default HeroSection;
