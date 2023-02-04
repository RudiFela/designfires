export const GRAPHQL = "https://designfires.pl/graphql";
export const GET_WOOD_FIREPLACES = `query woodFireplaces {
    products(where: {categoryId: 31, stockStatus: IN_STOCK}, first: 75) {
      nodes {
        id: databaseId
        img: image {
          sourceUrl(size: SHOP_CATALOG)
        }
        ... on VariableProduct {
          id: databaseId
          name
          img: image {
            sourceUrl(size: SHOP_CATALOG)
          }
          price(format: FORMATTED)
          width
          length
          height
          casingOptions {
            longOpeningSides
            shortOpeningSides
          }
          variations {
            nodes {
              SEK_price: metaData(key: "_alg_currency_switcher_per_product_regular_price_SEK") {
                key
                value
              }
            }
          }
          regularPrice(format: RAW)
        }
        SEK_price: metaData(key: "_alg_currency_switcher_per_product_regular_price_SEK") {
          value
        }
        DKK_price: metaData(key: "_alg_currency_switcher_per_product_regular_price_DKK") {
          value
        }
        woodFireplaces {
          kw
          type
          danishApproved
          producent
        }
        ... on SimpleProduct {
          name
          price
          width
          length
          height
          casingOptions {
            longOpeningSides
            shortOpeningSides
          }
          regularPrice(format: RAW)
        }
      }
    }
  }
`;