// PdfViewer.jsx
import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import * as pdfjs from 'pdfjs-dist';

// Configure PDF.js worker (must be in the same file where Document/Page is used)
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url).toString();

export default function PdfViewer({ fileUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // When PDF loads successfully
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  // Change page
  function changePage(offset) {
    setPageNumber((prev) => prev + offset);
  }

  return (
    <div style={{ textAlign: "center" }}>
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<p>Loading PDF...</p>}
        error={<p>Failed to load PDF.</p>}
      >
        <Page pageNumber={pageNumber} />
      </Document>

      {numPages && (
        <div style={{ marginTop: "10px" }}>
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <button
            onClick={() => changePage(-1)}
            disabled={pageNumber <= 1}
          >
            Previous
          </button>
          <button
            onClick={() => changePage(1)}
            disabled={pageNumber >= numPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
