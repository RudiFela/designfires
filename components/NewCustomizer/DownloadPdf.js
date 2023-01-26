import { PDFDownloadLink, Document, Page } from "@react-pdf/renderer";
import { Button } from "react-bootstrap";
import PdfTemplate from "./PdfTemplate/PdfTemplate";
const DownloadPdf = (props) => {
  return (
    <Button variant="info">
      <PDFDownloadLink
        style={{ textDecoration: "none", color: "white" }}
        document={
          <PdfTemplate
            products={props.products}
            currency={props.currency}
            totalPrice={props.totalPrice}
          />
        }
        fileName="DesignFiresOffer.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? "Generating PDF..." : "Download PDF"
        }
      </PDFDownloadLink>
    </Button>
  );
};
export default DownloadPdf;
