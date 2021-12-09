import { Provider } from "react-redux";
import { store } from "../store";
import { Provider as AuthProvider } from "next-auth/client";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ToastContainer } from "react-toastify";

import "tailwindcss/tailwind.css";
import "./../styles/global.css";
import "react-toastify/dist/ReactToastify.css";

let persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
          <ToastContainer />
        </PersistGate>
      </Provider>
    </AuthProvider>
  );
}

export default MyApp;
