import { useContext, useRef } from "react";
import Image from "next/image";
import CustomizerCard from "./CustomizerCard";
import { Button, Stack, Popover, OverlayTrigger } from "react-bootstrap";
import { LanguageContext } from "../context/language-context";
const CustomizerWrapper = (props) => {
  //const overlayRef = useRef();
  const lang = useContext(LanguageContext);

  const { itemDropDown, lengthDropDown, selectedPrice, selectedItem } = props;

  return (
    <>
      <div
        className="casings-customizer "
        style={{ position: "relative", zindex: 50 }}
      >
        <CustomizerCard
          image={
            <Image
              className="card-image-bottom"
              style={{
                //maxheigth: "50vh",
                borderRadius: 25,
                backgroundColor: "black",
              }}
              alt="photocard-picture"
              src={selectedItem.photo}
              //height={400}

              layout="fill" //width={480}
            />
          }
          title="Select Casing"
        >
          <Stack className="flex-wrap my-2" direction="horizontal" gap={3}>
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
              overlay={props.popover}
              //delay={{ show: 250, hide: 1600 }}
              rootClose
            >
              <Button>Technical Info</Button>
            </OverlayTrigger>
          </Stack>

          {props.children}
        </CustomizerCard>
      </div>
    </>
  );
};
export default CustomizerWrapper;
/*<Card.Img
        style={{ maxheigth: "50vh", borderRadius: 35 }}
        variant="bottom"
        alt="fireplace casing photo"
        src={selectedItem.photo}
      />*/
