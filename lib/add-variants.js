import axios from "axios";
export async function addVariants(ProductsArray, crud) {
  let Products = [];
  let fillingInfo = [];
  /* ProductsArray.forEach((item) => {
    Products = [...Products, item.id];
     if (item.name === "DFM") {
      fillingInfo = [...fillingInfo, item.attributes[1].options];
    }
  });

  Products.forEach(async (product) => {
    const repos = await axios.get(
      `https://designfires.pl/wp-json/wc/v3/products/${product}/variations`,
      crud
    );
    console.log("staring searching");
    ProductsArray.forEach((i) => {
      let variant = [];
      if (i.id === product) {
        repos.data.forEach((item) => {
          let file;
          // if (item.meta_data.length > 0) {
          file = {
            id: item.id,
            price: item.price,
            length: item.attributes[0].option,
            img: item.image.src,
            dimensions: {
              length: item.dimensions.length,
              width: item.dimensions.width,
              heigth: item.dimensions.height,
            },
            power: item.meta_data.find((item) => item.key === "power").value,
            liters: item.meta_data.find((item) => item.key === "liters").value,
            burningtime: item.meta_data.find((item) => item.key === "burning")
              .value,
            holesize: item.meta_data.find((item) => item.key === "holesize"),
            bottomsize: item.meta_data.find(
              (item) => item.key === "bottomsize"
            ),
            technical_image: item.woo_variation_gallery_images,
            DKK_price: item.meta_data.find(
              (item) =>
                item.key ===
                "_alg_currency_switcher_per_product_regular_price_DKK"
            ),
            SEK_price: item.meta_data.find(
              (item) =>
                item.key ===
                "_alg_currency_switcher_per_product_regular_price_SEK"
            ),
          };

          variant.push(file);
        });
        i["variant"] = variant;
      }
    });
    //console.log(ProductsArray[0].variant);
  });
  return ProductsArray;*/
  ProductsArray.forEach((item) => {
    Products = [...Products, item.id];
  });
}
