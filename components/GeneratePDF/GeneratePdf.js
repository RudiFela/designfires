import React from "react";
import { Button } from "react-bootstrap";
import { jsPDF, HTMLOptionImage } from "jspdf";
import { toPng, toCanvas } from "html-to-image";
import html2canvas from "html2canvas";
const GeneratePdf = ({ html }) => {
  //let imgData = "data:image/jpeg;base64," + Base64.encode("your-image.jpeg");
  // doc.addImage(imgData, "JPEG", 15, 40, 180, 160);
  /* let split = doc.splitTextToSize(
      document.getElementById("text").innerText,
      200
    );*/
  //let image = document.getElementById("image").getAttribute("src");
  // doc.text(document.querySelector(".content > h1").innerHTML, 75, 5);
  // doc.addImage(image, 70, 7, 60, 60);
  // doc.text(split, 5, 75);
  /* const imgData = canvas.toDataURL(
      "https://designfires.pl/wp-content/uploads/2022/07/CartBackground.png"
    );
    <img src="https://designfires.pl/wp-content/uploads/2022/07/CartBackground.png"/>
    doc.setFillColor(204, 204, 204, 0);*/

  const generatePdf = () => {
    const printArea = document.getElementById("print");

    html2canvas(printArea, { allowTaint: true, useCORS: true }).then(
      (canvas) => {
        const dataURL = canvas.toDataURL();
        const pdf = new jsPDF({
          orientation: "p",
          unit: "mm",
          format: "a4",
          putOnlyUsedFonts: true,
        });
        //background colour
        /* let width = pdf.internal.pageSize.getWidth();
        let height = pdf.internal.pageSize.getHeight();
        
         pdf.addImage(
          "https://designfires.pl/wp-content/uploads/2022/07/CartBackground.png",
          "JPG",
          0,
          0,
          width + 500,
          height
        );*/

        //pdf.text("OFFER", 50, 5);
        pdf.addImage(
          "https://designfires.pl/wp-content/uploads/2022/09/RB-com-1.jpg",
          "JPEG",
          10,
          10,
          70,
          30
        );
        pdf.addImage(dataURL, "JPEG", 10, 50, 180, 160);
        //pdf.output("dataurlnewwindow");
        pdf.save("saved.pdf");
      }
    );

    /*  const doc = new jsPDF();
    doc.setFont("Montserrat");
    let data =
      `
        <h1>Order</h1>` + html.current.outerHTML;
    //console.log(html.current.outerHTML);
    //console.log(data);

    doc.html(data, {
      callback: function (doc) {
        doc.setFillColor(204, 204, 204, 0);
        doc.save("sample.pdf");

        doc.output("dataurlnewwindow");
      },
      //html2canvas: { scale: 0.4 },
      width: 200, // <- here
      windowWidth: 1200, // <- here
    });*/
  };

  return (
    <div className="button-container">
      <Button variant="outline-danger" onClick={generatePdf}>
        Generate PDF
      </Button>
    </div>
  );
};

export default GeneratePdf;
