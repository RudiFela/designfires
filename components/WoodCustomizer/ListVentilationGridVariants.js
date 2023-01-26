import { useEffect, useState, useMemo } from "react";
import { Col, Row } from "react-bootstrap";

import VentilationGridCard from "./VentilationGridCard";
const ListVentilationGridVariants = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [gridToList, setGridToList] = useState([]);
  const [splitedGrid, setSplitedGrid] = useState(false);
  useEffect(() => {
    let ventilationGrids = props.itemToList;
    let filtered;
    filtered = ventilationGrids.filter(
      (item) =>
        item.holesize >= Number(props.grid) &&
        item.holesize <= Number(props.grid) + 100
    );
    // console.log(filtered);
    // console.log(props.itemToList);
    // console.log(props.grid);

    if (filtered.length === 0) {
      // console.log("no found");
      filtered = ventilationGrids.filter(
        (item) =>
          item.holesize >= Number(props.grid) / 2 &&
          item.holesize <= (Number(props.grid) + 300) / 2
      );
      //   console.log(item.holesize / 2);
      setSplitedGrid(true);
      // console.log(filtered);
    }
    setGridToList(filtered);
    setIsLoading(false);
  }, [isLoading]);

  return (
    <Col className="mx-2">
      {!isLoading ? (
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
      ) : (
        <h1>Loading...</h1>
      )}
    </Col>
  );
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

*/
