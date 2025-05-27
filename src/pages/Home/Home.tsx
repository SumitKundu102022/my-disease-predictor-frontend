import React, { useEffect } from "react";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import { cn } from "@/lib/utils";
import Cards from "@/components/ui/Cards";
import Marquee from "react-fast-marquee";
import { useLoading } from '@/contexts/LoadingContext'; // Import useLoading




const testimonials = [
  {
    image:
      "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "Dr. Maya Patel",
    role: "General Physician",
    text: "The Disease Prediction System has revolutionized the way I approach diagnostics. Its accurate predictions and user-friendly interface help me provide faster and more reliable care to my patients.",
  },
  {
    image:
      "https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "Rahul Mehra",
    role: "Healthcare Data Analyst",
    text: "I’ve worked with many tools, but this system stands out for its AI-driven precision. It transforms raw data into actionable insights, making disease trends easier to understand and act upon.",
  },
  {
    image:
      "https://images.pexels.com/photos/2773977/pexels-photo-2773977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Samantha Lee",
    role: "Public Health Researcher",
    text: "This system has been invaluable in predicting potential outbreaks and supporting timely interventions. It’s a game-changer in proactive healthcare planning.",
  },
  {
    image:
      "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Nina Verma",
    role: "AI & Healthcare Consultant",
    text: "The Disease Prediction System brilliantly bridges AI and medicine. Its smart algorithms and real-time analysis make it a vital tool for modern, data-driven healthcare solutions.",
  },
  {
    image:
      "https://images.pexels.com/photos/810775/pexels-photo-810775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Carlos Martinez",
    role: "Remote Patient Care Specialist",
    text: "In remote care, early detection is key. This system empowers me to assess patient risks in real-time, enhancing the quality of care even from a distance.",
  },
  {
    image:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Emily Tran",
    role: "Biotech Engineer",
    text: "The seamless integration with our biotech platform and the advanced AI algorithms behind this system make it an essential part of our research and development workflow.",
  },
  {
    image:
      "https://images.pexels.com/photos/5327919/pexels-photo-5327919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Jonathan Reyes",
    role: "Hospital Administrator",
    text: "Managing hospital resources has never been easier. The Disease Prediction System helps us anticipate patient inflow and allocate staff efficiently—saving both time and lives.",
  },
  {
    image:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Dr. Aisha Khan",
    role: "Epidemiologist",
    text: "This system provides critical foresight into potential health risks. Its predictive accuracy enables better decision-making and early preventive measures across communities.",
  },
];

const HomePage = () => {
  const { setIsLoadingRoute } = useLoading(); // Use the loading context

  useEffect(() => {
    // When this component mounts, it means the page content is loaded
    setIsLoadingRoute(false);
  }, [setIsLoadingRoute]); // Dependency array includes setIsLoadingRoute

  return (
    <>
      {/* Content */}
      <div className="flex flex-col items-center justify-center text-center space-y-6 z-10 relative text-white">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text--800 bg"
        >
          Welcome to the Disease Prediction System
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
        <motion.div
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
            <ArrowRight className="w-6 h-6" />
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

        <Marquee
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
        </Marquee>
      </div>
    </>
  );

};

export default HomePage;
