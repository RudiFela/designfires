import WoodCard from "./WoodCard";
const WoodCardList = (props) => {
  return (
    <>
      {props.items.length > 0 ? (
        props.items.map((item) =>
          item.stock_status == "instock" ? (
            <WoodCard key={item.id} item={item} showModal={props.showModal} />
          ) : null
        )
      ) : (
        <div className="text-white text-center p-4 bg-primary borderr mt-3">
          <h2>No Fireplaces found :( Change Filter settings! </h2>
        </div>
      )}
    </>
  );
};

export default WoodCardList;
