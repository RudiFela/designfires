import ProductCard from "./ProductCard";
const ProductCardList = (props) => {
  return (
    <>
      {props.items.length > 0 ? (
        props.items.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            showModal={props.showModal}
            name={props.name}
          />
        ))
      ) : (
        <div className="text-white text-center p-4 bg-primary borderr mt-3">
          <h2>No Fireplaces found :( Change Filter settings! </h2>
        </div>
      )}
    </>
  );
};

export default ProductCardList;
