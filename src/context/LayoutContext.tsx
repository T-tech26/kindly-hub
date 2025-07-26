"use client"; // required for useState and useRef in app dir

import React, { createContext, useContext, useState } from "react";

type LayoutContextType = {
  setToggleNav: React.Dispatch<React.SetStateAction<string>>;
  toggleNav: string;
  reports: string;
  setReports: React.Dispatch<React.SetStateAction<string>>;
};

const LayoutContext = createContext<LayoutContextType | null>(null);

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) throw new Error("LayoutContext is not available");
  return context;
};

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {

  const [toggleNav, setToggleNav] = useState('');
  const [reports, setReports] = useState('');

  return (
    <LayoutContext.Provider
      value={{
        toggleNav,
        setToggleNav,
        reports,
        setReports
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
