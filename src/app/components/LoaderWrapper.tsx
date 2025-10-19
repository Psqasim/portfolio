// import { useState, useEffect, ReactNode } from "react";
// import { Loader } from "./loader";



// interface LoaderWrapperProps {
//   children: ReactNode;
// }

// const LoaderWrapper = ({ children }: LoaderWrapperProps) => {
//   const [showLoader, setShowLoader] = useState(true);
//   const [hasLoaded, setHasLoaded] = useState(false);

//   useEffect(() => {
//     // Check if user has already seen the loader
//     const hasSeenLoader = sessionStorage.getItem("hasSeenLoader");
    
//     if (hasSeenLoader) {
//       setShowLoader(false);
//       setHasLoaded(true);
//     }
//   }, []);

//   const handleLoadingComplete = () => {
//     sessionStorage.setItem("hasSeenLoader", "true");
//     setHasLoaded(true);
//   };

//   return (
//     <>
//       {/* @ts-expect-error: allow passing onLoadingComplete even if Loader's props type doesn't include it yet */}
//       {showLoader && <Loader onLoadingComplete={handleLoadingComplete} />}
//       {hasLoaded && children}
//     </>
//   );
// };

// export default LoaderWrapper;
