// add bootstrap css
import { persistor, store } from "@/helper/redux/configureStore";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./_app.css";
import "primeflex/primeflex.css";
import { Provider } from "react-redux";
import AppProvider from "@/helper/context/AppProvider";
import { PersistGate } from "redux-persist/integration/react";
export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </PersistGate>
    </Provider>
  );
}
