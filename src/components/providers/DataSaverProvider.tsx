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

  useEffect(() => {
    const stored = localStorage.getItem("naija2050-data-saver");
    if (stored === "true") setEnabled(true);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.saver = enabled ? "true" : "false";
    localStorage.setItem("naija2050-data-saver", String(enabled));
  }, [enabled]);

  return (
    <DataSaverContext.Provider
      value={{
        enabled,
        toggle: () => setEnabled((v) => !v),
      }}
    >
      {children}
    </DataSaverContext.Provider>
  );
}

export function useDataSaver() {
  return useContext(DataSaverContext);
}
