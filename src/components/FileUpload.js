import React, { useState } from 'react';
import { pdfjs } from 'pdfjs-dist';

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const FileUpload = ({ onTextExtracted }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const extractTextFromPDF = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      let text = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map(item => item.str).join(' ') + '\n';
      }
      
      return text;
    } catch (err) {
      throw new Error('Failed to extract text from PDF');
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      let text;
      if (file.type === 'application/pdf') {
        text = await extractTextFromPDF(file);
      } else if (file.type === 'text/plain') {
        text = await file.text();
      } else {
        throw new Error('Unsupported file type. Please upload a PDF or text file.');
      }
      
      onTextExtracted(text);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <label className="block mb-4">
        <span className="text-gray-700">Upload PDF or Text File</span>
        <input
          type="file"
          accept=".pdf,.txt"
          onChange={handleFileChange}
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </label>
      
      {loading && (
        <div className="text-blue-600">Processing file...</div>
      )}
      
      {error && (
        <div className="text-red-600">{error}</div>
      )}
    </div>
  );
};

export default FileUpload; 