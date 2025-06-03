import React from "react";
import { cn } from "../lib/utils";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { HeartPlus } from "lucide-react"; // Example icon
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import bgImg from "@/assets/images/img5.jpg"; // Import your background image
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { useLoading } from '@/contexts/LoadingContext'; // Import useLoading hook
import FollowPointer from "@/components/ui/FollowPointer";


// Placeholder background image URL - REPLACE THIS WITH YOUR ACTUAL OPTIMIZED IMAGE URL
const BACKGROUND_IMAGE_URL = bgImg; // Use the imported image directly

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}



const MainLayout: React.FC<MainLayoutProps> = ({ children, className }) => {
  const { isLoadingRoute, setIsLoadingRoute } = useLoading(); // Use the loading context

  // Function to handle link clicks and set loading state
  const handleNavLinkClick = () => {
    setIsLoadingRoute(true);
  };

  return (
    <div className={cn("relative min-h-screen flex flex-col", className)}>
      {/* Background Image as CSS Background */}
      <div
        className="absolute inset-0 w-full h-full z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${BACKGROUND_IMAGE_URL})` }}
      ></div>

      {/* Image Overlay for Readability */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      {/*
      <ShaderGradientCanvas
        style={{
          position: "absolute",
          inset: "0",
          zIndex: "5",
        }}
        pointerEvents="none"
      >
        <ShaderGradient
          control="query"
          // urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=off&brightness=1&cAzimuthAngle=180&cDistance=2.8&cPolarAngle=80&cameraZoom=9.1&color1=%23606080&color2=%238d7dca&color3=%23212121&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=1&positionX=0&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=50&rotationY=0&rotationZ=-60&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=1.5&uFrequency=0&uSpeed=0.3&uStrength=1.5&uTime=8&wireframe=false"
          urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=off&brightness=1.2&cAzimuthAngle=180&cDistance=3.6&cPolarAngle=90&cameraZoom=1&color1=%23ff5005&color2=%23dbba95&color3=%23d0bce1&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=1&positionX=-1.4&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=10&rotationZ=50&shader=defaults&type=waterPlane&uDensity=1.3&uFrequency=5.5&uSpeed=0.4&uStrength=4&uTime=0&wireframe=false"
        />
      </ShaderGradientCanvas> */}
      <header className="relative z-20 w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-4 shadow-md sticky top-0 z-50">
        {/* <FollowPointer/> */}
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo with LeafyGreen Icon */}
          <Link
            to="/"
            className="text-2xl font-bold text-white z-10 flex items-center gap-2"
            onClick={handleNavLinkClick}
          >
            {" "}
            {/* Added flex and gap */}
            <HeartPlus className="w-8 h-8" /> {/* LeafyGreen Icon added here */}
            MediScan
          </Link>

          {/* Nav + Search */}
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto z-10">
            {/* Navigation */}
            <nav className="flex flex-wrap gap-2">
              {[
                { name: "Home", path: "/" },
                { name: "Predict", path: "/prediction" },
                { name: "About", path: "/about" },
                { name: "Contact us", path: "/contact" },
              ].map((item, index) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link to={item.path} onClick={handleNavLinkClick}>
                    {" "}
                    {/* Add onClick to set loading */}
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-white/20 px-4 py-2 outline-none focus:outline-none focus:ring-0.1 focus:ring-white focus:ring-offset-2 cursor-pointer"
                    >
                      {item.name}
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Search bar */}
            {/* <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search..."
                className="pl-10 bg-white/90 text-black placeholder:text-gray-600 focus:ring-white"
              />
            </div> */}
          </div>
        </div>
      </header>
      <main className="relative z-20 flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="relative z-20 bg-gray-200 py-4 mt-8 z-10 relative bg-gradient-to-r from-blue-600 to-green-500 text-white ">
        <div className="container mx-auto px-4 text-center text-white-600">
          &copy; {new Date().getFullYear()} Disease Prediction System. All
          rights reserved.
        </div>
      </footer>

      {/* Conditionally render LoadingSpinner */}
      {isLoadingRoute && <LoadingSpinner />}
    </div>
  );
};

export default MainLayout;
