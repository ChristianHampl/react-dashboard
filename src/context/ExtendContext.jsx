import { createContext, useState, useContext } from "react";

// 1. Context erstellen
const ExtendContext = createContext();

// 2. Provider-Komponente exportieren
export function ExtendProvider({ children }) {
  const [isExtended, setIsExtended] = useState(false);

  // alles, was du global teilen willst, geht hier rein
  return (
    <ExtendContext.Provider value={{ isExtended, setIsExtended }}>
      {children}
    </ExtendContext.Provider>
  );
}

// 3. Custom Hook zum einfachen Zugriff
export function useExtended() {
  return useContext(ExtendContext);
}
