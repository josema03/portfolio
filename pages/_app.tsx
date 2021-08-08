import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Theme from "../components/Theme";

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <Theme>
      <Component {...pageProps} />
    </Theme>
  );
}
export default MyApp;
