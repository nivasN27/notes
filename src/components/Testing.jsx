// PDFViewer.js
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './less/testing.css';
import url from '../assets/data/Testing.pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0); // Default scale

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => {
    setPageNumber(prevPageNumber => Math.max(prevPageNumber - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prevPageNumber => Math.min(prevPageNumber + 1, numPages));
  };

  return (
    <div className="pdf-container">
      <Document
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={console.error}
      >
        <Page pageNumber={pageNumber} scale={scale} />
      </Document>
      <div className="pagination">
        <button onClick={goToPrevPage} disabled={pageNumber <= 1}>Previous</button>
        <span>
          Page {pageNumber} of {numPages}
        </span>
        <button onClick={goToNextPage} disabled={pageNumber >= numPages}>Next</button>
      </div>
      <div className="scale-controls">
        <button onClick={() => setScale(scale => Math.max(scale - 0.1, 0.5))}>-</button>
        <span>Scale: {scale.toFixed(1)}</span>
        <button onClick={() => setScale(scale => Math.min(scale + 0.1, 2.0))}>+</button>
      </div>
    </div>
  );
};

export default PDFViewer;