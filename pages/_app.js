import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/index.css";
import Script from "next/script";
//import "../styles/index.scss";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="container">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-UA-238277916-1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'UA-238277916-1');
        `}
        </Script>
      </div>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
