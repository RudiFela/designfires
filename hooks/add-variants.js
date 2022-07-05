import { useState } from "react";
import axios from "axios";
const crud = {
  auth: {
    username: "ck_b143b31c7842e4a628279fe7b097980c311f08d5",
    password: "cs_b2d20befae8f292ec5e96fd4052f85c40ee7480e",
  },
};
export const useGetProducts = () => {
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
                if (item.meta_data.length > 0) {
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
                    power: item.meta_data[0].value,
                    liters: item.meta_data[1].value,
                    burningtime: item.meta_data[2].value,
                    DKK_price: item.meta_data[3],
                    SEK_price: item.meta_data[5],
                  };
                  if (product === 192) {
                    file = { ...file, filling: fillingInfo };
                  }
                } else {
                  file = {
                    id: item.id,
                    price: item.price,
                    length: item.attributes[0].option,
                    img: item.image.src,
                  };
                }

                variant.push(file);
              });
              i["variant"] = variant;
            }
          });
        });
    });
    return ProductsArray;
  };

  return { addVariants };
};
