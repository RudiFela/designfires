import { useState, useEffect } from "react";

import ProductLayout from "../../components/WoodCustomizer/ProductLayout";
import axios from "axios";
import Navibar from "../../containers/navbar/Navbar";
import Footer from "../../containers/footer/Footer";
function ProductPage(props) {
  const [product, setProduct] = useState(props.fireplace);
  const [productId, setProductId] = useState(props.fireplace.id);
  useEffect(() => {
    // refresh ? router.reload() : null;
  }, [productId]);
  const [productGallery, setProductGallery] = useState(
    props.fireplace.Image_Gallery.length > 0
      ? props.fireplace.Image_Gallery
      : props.fireplace.images
  );

  console.log(props.fireplace);
  //console.log(router.pathname);
  //console.log(router.query);
  const { fireplace } = props;
  if (!fireplace) {
    return <p>Loading...</p>;
  }

  return (
    <div className="main">
      <Navibar />
      <div className="my-5">
        <ProductLayout
          item={product}
          gallery={
            props.fireplace.Image_Gallery.length > 0
              ? props.fireplace.Image_Gallery
              : props.fireplace.images
          }
        />
      </div>
      <Footer></Footer>
    </div>
  );
}
export default ProductPage;

export async function getStaticProps(context) {
  const crud = {
    auth: {
      username: "ck_b143b31c7842e4a628279fe7b097980c311f08d5",
      password: "cs_b2d20befae8f292ec5e96fd4052f85c40ee7480e",
    },
  };
  const { params } = context;
  const productId = params.productId;
  const decoURL =
    "https://designfires.pl/wp-json/wc/v3/products?category=20&per_page=20&orderby=price&order=desc";
  const fireplaceURL = `https://designfires.pl/wp-json/wc/v3/products/${productId}`;

  const decorations = await axios.get(decoURL, crud);

  const fireplaceFetch = await axios.get(fireplaceURL, crud);

  const [fire, deco] = await Promise.all([
    fireplaceFetch.data,
    decorations.data,
  ]);

  return {
    props: {
      decorations: deco,
      fireplace: fire,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: { productId: "1584" },
      },
    ],
    fallback: "blocking",
  };
}
