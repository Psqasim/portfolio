import { useState, useEffect, ReactNode } from "react";
import Loader from "./loader";


interface LoaderWrapperProps {
  children: ReactNode;
}

const LoaderWrapper = ({ children }: LoaderWrapperProps) => {
  const [showLoader, setShowLoader] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Check if user has already seen the loader
    const hasSeenLoader = sessionStorage.getItem("hasSeenLoader");
    
    if (hasSeenLoader) {
      setShowLoader(false);
      setHasLoaded(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem("hasSeenLoader", "true");
    setHasLoaded(true);
  };

  return (
    <>
      {showLoader && <Loader onLoadingComplete={handleLoadingComplete} />}
      {hasLoaded && children}
    </>
  );
};

export default LoaderWrapper;
