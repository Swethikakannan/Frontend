import React, { createContext, useState, useContext } from "react";

// Create context
const SidebarContext = createContext();

// Provider component
export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Custom hook for easy access
export const useSidebar = () => useContext(SidebarContext);