import { useContext, useRef } from "react";
import Image from "next/image";

import {
  Card,
  Button,
  Stack,
  Popover,
  OverlayTrigger,
  Badge,
} from "react-bootstrap";
import { LanguageContext } from "../context/language-context";
const CustomizerWrapper = (props) => {
  //const overlayRef = useRef();
  const lang = useContext(LanguageContext);

  const {
    itemDropDown,
    lengthDropDown,
    selectedPrice,
    popoverInfo,
    selectedItem,
  } = props;
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>{popoverInfo}</Popover.Body>
    </Popover>
  );

  return (
    <Card className={props.cssClass}>
      {" "}
      <Image
        className="card-image-bottom"
        style={{ maxheigth: "50vh", borderRadius: 35 }}
        alt="photocard-picture"
        src={selectedItem.photo}
        height={props.pictureheigth}
        width={480}
      />
      <Card.Body className="pb-0">
        <Stack className="flex-wrap mb-2" direction="horizontal" gap={3}>
          {itemDropDown}

          {lengthDropDown}

          <Button as="Badge" className="bolder" variant="primary" disabled>
            {" "}
            {Number(selectedPrice).toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}{" "}
            {lang.currencySymbol()}
            {selectedItem.stock_status === "instock" ? null : (
              <p className="m-0 p-0 text-info">
                +
                {Number(
                  lang.currencyPrice(
                    selectedItem.variant_details.manufacture_cost_EUR,
                    selectedItem.variant_details.manufacture_cost_SEK,
                    selectedItem.variant_details.manufacture_cost_DKK
                  )
                ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                {lang.currencySymbol()}
              </p>
            )}
          </Button>
          <OverlayTrigger
            //ref={overlayRef}
            //trigger={["hover", "focus"]}
            trigger="click"
            placement="bottom"
            overlay={popover}
            //delay={{ show: 250, hide: 1600 }}
            rootClose
          >
            <Button size="sm">Technical Info</Button>
          </OverlayTrigger>
        </Stack>

        {props.children}
      </Card.Body>{" "}
    </Card>
  );
};
export default CustomizerWrapper;
/*<Card.Img
        style={{ maxheigth: "50vh", borderRadius: 35 }}
        variant="bottom"
        alt="fireplace casing photo"
        src={selectedItem.photo}
      />*/
