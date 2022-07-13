import { BsPlus } from "react-icons/bs";
import Image from "next/image";
const Accesories = (props) => {
  const accessoriesImage =
    "https://designfires.pl/wp-content/uploads/2022/06/Rectangle12.png";
  //You can customize It with our many accessiories!
  return (
    <div>
      <div className="containers">
        <h1 className="text-center text-white p-2 mb-2">
          Warm Real Flames or Without heat only,coziness and the best illusion
          on the market.
        </h1>
        <h2 className="text-center text-white p-2 mb-0">
          We have both,just choose in between DFE or DFM
        </h2>
        <div className="cards">
          <div className="cards--image">
            <img src={accessoriesImage} alt="info image" layout="fill" />
          </div>
          <div className="cards--info info--1" href="#customize">
            <a href="#customize">
              <span className="info--text">
                {" "}
                <p className="my-0">CASINGS</p>{" "}
                <p className="my-0">Many Types</p>
              </span>
            </a>
            <div className="icon">
              <BsPlus color="white" />
            </div>
            <div className="info--image">
              <img src={accessoriesImage} alt="info image" layout="fill" />
            </div>
          </div>
          <div className="cards--info info--3" href="#customize">
            <a href="#customize">
              <span className="info--text">
                <p className="my-0">ACCESSORIES</p>
                <p className="my-0">Ceramic Wood</p>
                <p className="my-0">Larger Tank</p>
              </span>
            </a>

            <div className="icon">
              <BsPlus color="white" />
            </div>
            <div className="info--image">
              <img src={accessoriesImage} alt="info image" layout="fill" />
            </div>
          </div>
          <div className="cards--info info--4" href="#customize">
            <a href="#customize">
              <span className="info--text">
                <p className="my-0">GLASS</p>{" "}
                <p className="my-0">Clear or Bronze</p>
              </span>
            </a>
            <div className="icon">
              <BsPlus color="white" />
            </div>
            <div className="info--image">
              <img src={accessoriesImage} alt="info image" layout="fill" />
            </div>
          </div>
          <div className="cards--info info--5">
            <span className="info--text">
              <p className="my-0">FURNITURES</p>{" "}
              <p className="my-0">You can ask </p>
              <p className="my-0">about them</p>
            </span>
            <div className="icon">
              <BsPlus color="white" />
            </div>
            <div className="info--image">
              <img src={accessoriesImage} alt="info image" layout="fill" />
            </div>
          </div>
          <div className="cards--info info--2">
            <a href="#customize">
              {" "}
              <span className="info--text">
                <p className="my-0">TOP PLATE</p>{" "}
                <p className="my-0">Black or</p>
                <p className="my-0">Stainless</p>
              </span>
            </a>

            <div className="icon">
              <BsPlus color="white" />
            </div>
            <div className="info--image">
              <img src={accessoriesImage} alt="info image" layout="fill" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Accesories;
