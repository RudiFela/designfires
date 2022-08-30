import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/index.css";
import Script from "next/script";
//import "../styles/index.scss";
function MyApp({ Component, pageProps }) {
  return (
    <>
      {" "}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-UA-238277916-1"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-UA-238277916-1');
  `}
      </Script>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
