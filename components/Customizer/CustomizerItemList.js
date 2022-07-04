import { useState } from "react";
import { Button, ListGroup, Figure, Stack } from "react-bootstrap";
const CustomizerItemList = (props) => {
  const list = props.ItemToList;
  const { FireplaceLength } = props;

  return (
    <div>
      {list.map((item) => (
        <ListGroup.Item key={item.id}>
          <Button
            className="w-100 btn-custom"
            onClick={() => {
              props.onAdd(item.price, item.name, item.id);
            }}
            variant="outline-danger"
          >
            <Stack direction="horizontal" gap={4}>
              <Figure>
                <Figure.Image
                  className="figure-round mt-3"
                  min-width={50}
                  min-height={50}
                  width={100}
                  height={100}
                  alt="Fireplace decoration/accesories"
                  src={item.images[0].woocommerce_gallery_thumbnail}
                />
              </Figure>

              <div className="item-name">
                <p>{item.name}</p>
              </div>
              <div className="ms-auto">{item.price}€</div>
            </Stack>
          </Button>
        </ListGroup.Item>
      ))}
    </div>
  );
};
export default CustomizerItemList;
