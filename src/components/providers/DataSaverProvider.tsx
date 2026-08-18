"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface DataSaverContextValue {
  enabled: boolean;
  toggle: () => void;
}

const DataSaverContext = createContext<DataSaverContextValue>({
  enabled: false,
  toggle: () => {},
});

export function DataSaverProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("naija2050-data-saver") === "true";
    setEnabled(stored);
    document.documentElement.dataset.saver = stored ? "true" : "false";
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.dataset.saver = enabled ? "true" : "false";
    localStorage.setItem("naija2050-data-saver", String(enabled));
  }, [enabled, hydrated]);

  return (
    <DataSaverContext.Provider
      value={{
        enabled,
        toggle: () => setEnabled((value) => !value),
      }}
    >
      {children}
    </DataSaverContext.Provider>
  );
}

export function useDataSaver() {
  return useContext(DataSaverContext);
}
