import { useState, createContext } from "react";

export const PageContext = createContext(null);


const PageProvider = ({ children }) => {
  const [pageName, setPageName] = useState("");
  return (
    <PageContext.Provider
      value={{
        pageName,
        setPageName
      }}>
      {children}
    </PageContext.Provider>
  );
};

export default PageProvider;
