import axios from "axios";
const crud = {
  auth: {
    username: "ck_b143b31c7842e4a628279fe7b097980c311f08d5",
    password: "cs_b2d20befae8f292ec5e96fd4052f85c40ee7480e",
  },
  //headers: { "Accept-Encoding": "br" },
};
export const useGetProducts = () => {
  const minimalFireplacePrice = (item) => {
    item.variant ? console.log(item.variant) : null;
    console.log(item.variant);
    const x = item.variant.find((element) => element.length === "500");
    return console.log(x);
  };
  const addVariants = (ProductsArray) => {
    let Products = [];
    let fillingInfo = [];
    ProductsArray.forEach((item) => {
      Products = [...Products, item.id];
      if (item.name === "DFM") {
        fillingInfo = [...fillingInfo, item.attributes[1].options];
      }
    });

    Products.forEach((product) => {
      axios
        .get(
          `https://designfires.pl/wp-json/wc/v3/products/${product}/variations?per_page=20`,
          crud
        )
        .then((repos) => {
          ProductsArray.forEach((i) => {
            let variant = [];
            if (i.id === product) {
              repos.data.forEach((item) => {
                let file;
                // if (item.meta_data.length > 0) {
                file = {
                  id: item.id, //
                  price: item.price, //
                  length: item.attributes[0].option,
                  stock_status: item.stock_status, //
                  img: item.image.src,
                  dimensions: {
                    //
                    length: item.dimensions.length, //
                    width: item.dimensions.width, //
                    heigth: item.dimensions.height, //
                  },
                  power: item.meta_data.find((item) => item.key === "power") //
                    .value,
                  liters: item.meta_data.find((item) => item.key === "liters") //
                    .value,
                  burningtime: item.meta_data.find(
                    (item) => item.key === "burning" //
                  ).value,
                  holesize: item.meta_data.find(
                    (item) => item.key === "holesize" //
                  ),
                  bottomsize: item.meta_data.find(
                    (item) => item.key === "bottomsize" //
                  ),
                  drawing3d: item.meta_data.find((item) => item.key === "3d"), //
                  technical_image: item.woo_variation_gallery_images, //
                  DKK_price: item.meta_data.find(
                    (item) =>
                      item.key ===
                      "_alg_currency_switcher_per_product_regular_price_DKK" //
                  ),
                  SEK_price: item.meta_data.find(
                    (item) =>
                      item.key ===
                      "_alg_currency_switcher_per_product_regular_price_SEK" //
                  ),
                };
                /*  if (product === 192) {
                    file = { ...file, filling: fillingInfo };
                  }*/
                //  }
                /*else {
                  file = {
                    id: item.id,
                    price: item.price,
                    length: item.attributes[0].option,
                    img: item.image.src,
                  };
                }*/

                variant.push(file);
              });
              i["variant"] = variant;
            }
          });
        });
    });
    //console.log("done");
    return ProductsArray;
  };

  return { addVariants, minimalFireplacePrice };
};
