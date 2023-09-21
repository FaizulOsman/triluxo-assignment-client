import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Toaster } from "react-hot-toast";
// Imported Styles
import "@/styles/globals.css";
import "@/styles/components/navbar.css";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <Provider store={store}>
      <SessionProvider session={pageProps?.session}>
        <Toaster />
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}
