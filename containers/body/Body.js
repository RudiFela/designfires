import React, { useEffect, useState, lazy, Suspense } from "react";
import Accessories from "../../components/Accessories/Accessories";
import Decorations from "../../components/Decorations/Decorations";
import Inspired from "../../components/Inspired/Inspired";
import axios from "axios";
//import Customizer from "../../components/Customizer/Customizer";
import Ethanol from "../../components/Ethanol/Ethanol";
import Mystic from "../../components/Mystic/Mystic";
import { useGetProducts } from "../../hooks/add-variants";
const Customizer = lazy(() => import("../../components/Customizer/Customizer"));
const Body = (props) => {
  const [decorationsProducts, setDecorationsProducts] = useState([]);
  const [accessoriesProducts, setAccessoriesProducts] = useState([]);
  const [casingsProducts, setCasingsProducts] = useState([]);
  const [fireplaceProducts, setFireplaceProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const { addVariants } = useGetProducts();
  useEffect(() => {
    getData();
  }, []);
  const crud = {
    auth: {
      username: "ck_b143b31c7842e4a628279fe7b097980c311f08d5",
      password: "cs_b2d20befae8f292ec5e96fd4052f85c40ee7480e",
    },
  };
  const deco =
    "https://designfires.pl/wp-json/wc/v3/products?category=20&per_page=20";
  const casing =
    "https://designfires.pl/wp-json/wc/v3/products?category=23?per_page=20";
  const accessories =
    "https://designfires.pl/wp-json/wc/v3/products?category=21?per_page=20";
  const fireplaces =
    "https://designfires.pl/wp-json/wc/v3/products?category=26?per_page=20";

  const getData = () => {
    // ck ck_b143b31c7842e4a628279fe7b097980c311f08d5
    // cs cs_b2d20befae8f292ec5e96fd4052f85c40ee7480e
    axios
      .all([
        axios.get(deco, crud),
        axios.get(casing, crud),
        axios.get(accessories, crud),
        axios.get(fireplaces, crud),
      ])
      .then(
        axios.spread((...responses) => {
          setDecorationsProducts(responses[0].data);
          setAccessoriesProducts(addVariants(responses[2].data));
          setFireplaceProducts(addVariants(responses[3].data));
          setCasingsProducts(addVariants(responses[1].data));

          setIsLoading(false);
        })
      )
      .catch((error) => {
        console.log("An error!!!!", error);
        setIsLoading(false);
      });
  }; //SetEnv HTTPS on

  return (
    <div>
      <Ethanol />
      <Mystic />
      <Accessories />
      <Decorations decorations={decorationsProducts} />
      <Inspired />

      <Suspense fallback={<h1>Still Loading</h1>}>
        <div>
          <Customizer
            decorations={decorationsProducts}
            accessories={accessoriesProducts}
            casings={casingsProducts}
            fireplace={fireplaceProducts}
            cartHandler={props.cartHandler}
          />
        </div>
      </Suspense>
    </div>
  );
};
export default Body;
