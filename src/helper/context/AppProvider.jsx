import { createContext, useContext, useRef } from "react";
import { Toast } from "primereact/toast";
const AppContext = createContext({});
export default function AppProvider({ children }) {
  const toast = useRef();
  return (
    <AppContext.Provider value={{}}>
      <Toast ref={toast} />
      {children}
    </AppContext.Provider>
  );
}

export function useFunction() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useLoading must be used within AppProvider");
  }
  return context;
}
