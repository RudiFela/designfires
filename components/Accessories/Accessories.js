import { BsPlus } from "react-icons/bs";
import Image from "next/image";
const Accesories = (props) => {
  const accessoriesImage =
    "http://designfires.pl/wp-content/uploads/2022/06/Rectangle12.png";

  return (
    <div>
      <div className="containers">
        <h1 className="text-center text-white p-5 mb-4">
          You can customize It with our many accessiories!
        </h1>
        <div className="cards">
          <div className="cards--image">
            <img src={accessoriesImage} alt="info image" layout="fill" />
          </div>
          <div className="cards--info info--1">
            <span className="info--text">EXTRA TANK</span>
            <div className="icon">
              <BsPlus color="white" />
            </div>
            <div className="info--image">
              <img src={accessoriesImage} alt="info image" layout="fill" />
            </div>
          </div>
          <div className="cards--info info--3">
            <span className="info--text">GLASS HOLDERS</span>
            <div className="icon">
              <BsPlus color="white" />
            </div>
            <div className="info--image">
              <img src={accessoriesImage} alt="info image" layout="fill" />
            </div>
          </div>
          <div className="cards--info info--4">
            <span className="info--text">GLASS</span>
            <div className="icon">
              <BsPlus color="white" />
            </div>
            <div className="info--image">
              <Image src={accessoriesImage} alt="info image" layout="fill" />
            </div>
          </div>
          <div className="cards--info info--5">
            <span className="info--text">FURNITURES</span>
            <div className="icon">
              <BsPlus color="white" />
            </div>
            <div className="info--image">
              <img src={accessoriesImage} alt="info image" layout="fill" />
            </div>
          </div>
          <div className="cards--info info--2">
            <span className="info--text">TOP PLATE</span>
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
