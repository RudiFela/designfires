import { useState } from "react";

import Header from "../containers/header/Header";
import Footer from "../containers/footer/Footer";
import Body from "../containers/body/Body";
import Navibar from "../containers/navbar/Navbar";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [cart, setCart] = useState();
  const cartHandler = (cart) => {
    setCart(cart);
  };
  return (
    <div className="main">
      <Navibar />
      <Header />
      <Body cartHandler={cartHandler} />
      <Footer cartHandler={cart} />
    </div>
  );
}
