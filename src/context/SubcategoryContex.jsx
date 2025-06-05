import React, { createContext, useState } from "react";

export const AppSubcategoryContext = createContext(undefined);

export const AppSubcategoryProvider = ({ children }) => {
  const [subcategories, setSubcategories] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  return (
    <AppSubcategoryContext.Provider value={{ subcategories, setSubcategories, hasMore, setHasMore }}>
      {children}
    </AppSubcategoryContext.Provider>
  );
};
