import { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import ProductLayout from "../../components/WoodCustomizer/ProductLayout";
import axios from "axios";
import Navibar from "../../containers/navbar/Navbar";
import Footer from "../../containers/footer/Footer";
import { SSRProvider } from "react-bootstrap";
function ProductPage(props) {
  const [product, setProduct] = useState(props.fireplace);
  const [productId, setProductId] = useState(props.fireplace.id);
  const { emptyCart } = useCart();
  useEffect(() => {
    // refresh ? router.reload() : null;
    emptyCart();
  }, [productId]);
  const [productGallery, setProductGallery] = useState(
    props.fireplace.Image_Gallery.length > 0
      ? props.fireplace.Image_Gallery
      : props.fireplace.images
  );

  //console.log(props.fireplace);
  //console.log(router.pathname);
  //console.log(router.query);
  const { fireplace } = props;
  if (!fireplace) {
    return <p>Loading...</p>;
  }

  return (
    <SSRProvider>
      <div className="main">
        <Navibar />
        <div className="my-5">
          <ProductLayout
            item={product}
            ventilationGrids={props.ventilationGrids}
            gallery={
              props.fireplace.Image_Gallery.length > 0
                ? props.fireplace.Image_Gallery
                : props.fireplace.images
            }
          />
        </div>
        <Footer></Footer>
      </div>
    </SSRProvider>
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
  const ventilationURL =
    "https://designfires.pl/wp-json/wc/v3/products?category=51";
  const decorations = await axios.get(decoURL, crud);
  const ventilationFetch = await axios.get(ventilationURL, crud);
  const fireplaceFetch = await axios.get(fireplaceURL, crud);

  const [fire, deco, vent] = await Promise.all([
    fireplaceFetch.data,
    decorations.data,
    ventilationFetch.data,
  ]);

  return {
    props: {
      decorations: deco,
      fireplace: fire,
      ventilationGrids: vent,
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
