import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ExportPDFButton = () => {
  const [canvasUrl, setCanvasUrl] = useState('');
  const [showCanvas, setShowCanvas] = useState(false);

const printDocument = () => {
    const input = document.getElementById('divToPrint');
   
    html2canvas(input, { scale: window.devicePixelRatio,
     })
        .then((canvas) => {
            // Optionally display the canvas to debug
            const imgData = canvas.toDataURL('image/png');
            setCanvasUrl(imgData);
            setShowCanvas(true);
        });
};

  const convertToPDF = () => {
    const imgData = canvasUrl;
    const pdf = new jsPDF({
      orientation: 'landscape',
    });
    const imgProps= pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('download.pdf');
  };

  return (
    <div>
      <button onClick={printDocument}>Generate Preview</button>
      {showCanvas && (
        <>
          <div>
            <img src={canvasUrl} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
          <button onClick={convertToPDF}>Export to PDF</button>
        </>
      )}
    </div>
  );
};

export default ExportPDFButton;
