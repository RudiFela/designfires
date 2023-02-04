import { useEffect, useState, useMemo } from "react";
import { Col, Row } from "react-bootstrap";

import VentilationGridCard from "./VentilationGridCard";
const ListVentilationGridVariants = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [gridToList, setGridToList] = useState([]);
  const [splitedGrid, setSplitedGrid] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const standartFilter = (array) => {
    let filtereds;
    filtereds = array.filter(
      (item) =>
        item.holesize >= Number(props.grid) &&
        item.holesize <= Number(props.grid) + 100
    );
    setSplitedGrid(true);
    return filtereds;
  };
  const splitFilter = (array) => {
    const filtered = array.filter(
      (item) =>
        item.holesize >= Number(props.grid) / 2 &&
        item.holesize <= (Number(props.grid) + 300) / 2
    );
    //   console.log(item.holesize / 2);
    return filtered;
  };
  useEffect(() => {
    // console.log(props.itemToList);
    let ventilationGrids = props.itemToList;
    const filtered = standartFilter(props.itemToList);

    // console.log(filtered, "after first");
    // console.log(props.itemToList);
    // console.log(props.grid);

    /* if (filtered.length === 0 && !firstLoad) {
      filtered = splitFilter(props.itemToList);
      setSplitedGrid(true);
    }*/
    // console.log(filtered);
    setGridToList(filtered);
    setIsLoading(false);
    setFirstLoad(false);
  }, []);
  // console.log(gridToList);
  const grid =
    gridToList.length === 0
      ? splitFilter(props.itemToList).map((variant) => (
          <Row key={variant.id}>
            <VentilationGridCard
              variant={variant}
              name={props.name}
              onPick={props.onPick}
              splited={splitedGrid}
            />
          </Row>
        ))
      : gridToList.map((variant) => (
          <Row key={variant.id}>
            <VentilationGridCard
              variant={variant}
              name={props.name}
              onPick={props.onPick}
              splited={splitedGrid}
            />
          </Row>
        ));
  return <Col className="mx-2">{!isLoading ? grid : <h1>Loading...</h1>}</Col>;
};
export default ListVentilationGridVariants;
/*

  {props.itemToList.map(
        (variant) =>
          Number(props.grid) <= Number(variant.holesize) &&
          Number(props.grid) + 100 >= Number(variant.holesize) && (
            <Row key={variant.id}>
              <VentilationGridCard
                variant={variant}
                name={props.name}
                onPick={props.onPick}
              />
            </Row>
          )
      )}



 gridToList.map((variant) => (
          <Row key={variant.id}>
            <VentilationGridCard
              variant={variant}
              name={props.name}
              onPick={props.onPick}
              splited={splitedGrid}
            />
          </Row>
        ))

*/
