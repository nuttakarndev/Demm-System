import { createContext, useContext, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import { useDispatch, useSelector } from "react-redux";
import { getSetting } from "../redux/slice/setting.slice";
const AppContext = createContext({ settings: {}, loading: false });
export default function AppProvider({ children }) {
  const toast = useRef();
  const dispatch = useDispatch();
  const { settings, loading } = useSelector((state) => state.setting);
  useEffect(() => {
    document.documentElement.style.setProperty("--primary", settings.primary);
    document.documentElement.style.setProperty("--secondary", settings.secondary);
    document.documentElement.style.setProperty("--background", settings.background);
    document.documentElement.style.setProperty("--card", settings.card);
  }, [settings]);
  useEffect(() => {
    dispatch(getSetting());
  }, [dispatch]);
  return (
    <AppContext.Provider value={{ settings, loading }}>
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
