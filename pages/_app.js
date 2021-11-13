import "tailwindcss/tailwind.css";
import "./../styles/global.css";
import { Provider } from "react-redux";
import { store } from "../store";
import { Provider as AuthProvider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </AuthProvider>
  );
}

export default MyApp;
