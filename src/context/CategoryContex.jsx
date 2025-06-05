import React, { createContext, useState } from "react";

export const AppCategoryContext = createContext(undefined);

export const AppCategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  return (
    <AppCategoryContext.Provider value={{ categories, setCategories, hasMore, setHasMore }}>
      {children}
    </AppCategoryContext.Provider>
  );
};
