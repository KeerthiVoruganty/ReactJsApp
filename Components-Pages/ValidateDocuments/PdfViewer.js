import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useImperativeHandle,
} from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
require("./ValidateDocuments.css");

const PdfViewer = (props) => {
  const [ispdf, setIspdf] = useState(true);
  const id = window.location.search.substring(1).split("id=")[1];
  const [noPages, setNoPages] = useState();

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  });
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNoPages(numPages);
  };
  const err = () => {
    setIspdf(false);
  };

  return (
    <div>
      {ispdf ? (
        <Document
          id="doc"
          file={id}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={err}
        >
          {/* <Page pageNumber={1} /> */}
          {Array.from(
          new Array(noPages),
          (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
            />
          ),
        )}
          {/* {page(noPages)} */}
        </Document>
      ) : (
        <img src={id} width="500px" height="600px" class="center" alt="sd"></img>
      )}
    </div>
  );
};
export default PdfViewer;
