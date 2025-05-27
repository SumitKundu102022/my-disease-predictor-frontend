import React, { createContext, useContext, useState, ReactNode } from "react";

interface LoadingContextType {
  isLoadingRoute: boolean;
  setIsLoadingRoute: (isLoading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoadingRoute, setIsLoadingRoute }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
