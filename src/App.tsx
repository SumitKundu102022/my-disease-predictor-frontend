import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/Home";
import PredictionPage from "./pages/Prediction/PredictionPage";
import AboutPage from "./pages/About/About";
import ContactPage from "./pages/Contact/Contact";
import MainLayout from "./layouts/MainLayout";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import { AnimatePresence } from "framer-motion";
import { LoadingProvider } from "./contexts/LoadingContext"; // Import LoadingProvider




const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const SPLASH_DURATION = 3000; // 3 seconds for splash screen
  const LOADING_SPINNER_DURATION = 1500; // 1.5 seconds for spinner after splash (adjust as needed)

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
      setShowLoadingSpinner(true); // Show spinner after splash
    }, SPLASH_DURATION);

    // Timer for LoadingSpinner
    const spinnerTimer = setTimeout(() => {
      setShowLoadingSpinner(false); // Hide spinner, show main app
    }, SPLASH_DURATION + LOADING_SPINNER_DURATION); // Spinner starts after splash, so add durations

    return () => {
      clearTimeout(splashTimer);
      clearTimeout(spinnerTimer); // Cleanup both timers
    };
  }, []);

  let contentToDisplay;

  if (showSplash) {
    contentToDisplay = (
      <SplashScreen key="splash" onAnimationComplete={() => {}} />
    );
  } else if (showLoadingSpinner) {
    contentToDisplay = <LoadingSpinner key="loading-spinner" />;
  } else {
    contentToDisplay = (
      <Router key="main-app">
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <HomePage />
              </MainLayout>
            }
          />
          <Route
            path="/prediction"
            element={
              <MainLayout>
                <PredictionPage />
              </MainLayout>
            }
          />
          <Route
            path="/about"
            element={
              <MainLayout>
                <AboutPage />
              </MainLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <MainLayout>
                <ContactPage />
              </MainLayout>
            }
          />
          {/* Add other routes as needed */}
        </Routes>
      </Router>
    );
  }

  return (
    <LoadingProvider>
      {/* Wrap the entire application with the LoadingProvider */}
      <AnimatePresence mode="wait">
        {/* {showSplash ? (
          <SplashScreen key="splash" onAnimationComplete={() => {}} />
        ) : (
          <Router key="main-app">
            <Routes>
              <Route
                path="/"
                element={
                  <MainLayout>
                    <HomePage />
                  </MainLayout>
                }
              />
              <Route
                path="/prediction"
                element={
                  <MainLayout>
                    <PredictionPage />
                  </MainLayout>
                }
              />
              <Route
                path="/about"
                element={
                  <MainLayout>
                    <AboutPage />
                  </MainLayout>
                }
              />
              <Route
                path="/contact"
                element={
                  <MainLayout>
                    <ContactPage />
                  </MainLayout>
                }
              />
              {/* Add other routes as needed */}
        {/* </Routes>
          </Router>
        )} */}

        {contentToDisplay}
      </AnimatePresence>
    </LoadingProvider>
  );
};

export default App;
