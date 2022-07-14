import { useContext } from "react";
import Image from "next/image";
import { Card, Button, Stack, Popover, OverlayTrigger } from "react-bootstrap";
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
/*<Card.Img
        style={{ maxheigth: "50vh", borderRadius: 35 }}
        variant="bottom"
        alt="fireplace casing photo"
        src={selectedItem.photo}
      />*/
