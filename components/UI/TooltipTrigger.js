import React from "react";
import { OverlayTrigger, Popover, Tooltip, Button } from "react-bootstrap";
function TooltipTrigger(props) {
  return (
    <OverlayTrigger
      //ref={overlayRef}
      //trigger={["hover", "focus"]}

      placement="right"
      overlay={
        <Tooltip id={`tooltip-`}>
          <strong>{props.text}</strong>.
        </Tooltip>
      }
      //delay={{ show: 250, hide: 1600 }}
      // rootClose
    >
      <Button variant="primary" className={`p-0 m-0 ${props.className}`}>
        {props.children}
      </Button>
    </OverlayTrigger>
  );
}

export default TooltipTrigger;
