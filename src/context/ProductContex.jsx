import React, { createContext, useState } from "react";

export const AppProductContext = createContext(undefined);

export const AppProductProvider = ({ children }) => {
  const [Product, setProduct] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  return (
    <AppProductContext.Provider value={{ Product, setProduct, hasMore, setHasMore }}>
      {children}
    </AppProductContext.Provider>
  );
};
