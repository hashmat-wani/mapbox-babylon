import React, { createContext, useState } from "react";

export const loadingContext = createContext();

const LoadingContext = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const toggleLoading = () => {
    setLoading((prev) => !prev);
  };

  return (
    <loadingContext.Provider value={{ loading, toggleLoading }}>
      {children}
    </loadingContext.Provider>
  );
};

export default LoadingContext;