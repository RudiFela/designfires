import { useContext } from "react";
import {
  DropdownButton,
  Card,
  Button,
  Stack,
  Popover,
  OverlayTrigger,
  Form,
} from "react-bootstrap";
import { LanguageContext } from "../context/language-context";
const CustomizerWrapper = (props) => {
  const lang = useContext(LanguageContext);
  const currencySymbol = () => {
    switch (lang.language) {
      case "swedish":
        return "SEK";
      case "english":
        return "€";

      case "danish":
        return "kr";
    }
  };
  const currencyPriceT = () => {
    switch (lang.language) {
      case "swedish":
        return "995";
      case "english":
        return "100";

      case "danish":
        return "755";
    }
  };
  const currencyPricePW = () => {
    switch (lang.language) {
      case "swedish":
        return "9995";
      case "english":
        return "995";

      case "danish":
        return "7555";
    }
  };
  const {
    itemPhoto,
    itemName,
    itemLength,
    itemDropDown,
    lengthDropDown,
    selectedPrice,
    popoverInfo,
    selected,
  } = props;
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>{popoverInfo}</Popover.Body>
    </Popover>
  );

  return (
    <Card
      className="card-deco mt-3"
      style={{ maxwidth: "25rem", height: "30rem" }}
    >
      <Card.Img
        style={{ maxheigth: "50vh", borderRadius: 35 }}
        variant="bottom"
        alt="fireplace casing photo"
        src={itemPhoto}
      />
      <Card.Body>
        <Stack className="flex-wrap mb-2" direction="horizontal" gap={3}>
          {itemDropDown}

          {lengthDropDown}

          <Button className="bolder" variant="primary" disabled>
            {selectedPrice} {currencySymbol()}
          </Button>
          <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <Button size="sm">Technical Info</Button>
          </OverlayTrigger>
        </Stack>

        {props.children}
      </Card.Body>{" "}
    </Card>
  );
};
export default CustomizerWrapper;
