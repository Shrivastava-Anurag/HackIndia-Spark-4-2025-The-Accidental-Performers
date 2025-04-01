"use client";

import { useState } from "react";
import { FiTrash2 } from "react-icons/fi"; // Import trash icon from react-icons

function DocumentUploader({setStep, step ,leadId}) {
  const [documents, setDocuments] = useState([{ id: 1, docType: "", file: null }]);
  console.log(leadId)
  const handleAddDocument = () => {
    setDocuments((prevDocs) => [...prevDocs, { id: prevDocs.length + 1, docType: "", file: null }]);
  };

  const handleInputChange = (id, field, value) => {
    setDocuments((prevDocs) =>
      prevDocs.map((doc) => (doc.id === id ? { ...doc, [field]: value } : doc))
    );
  };

  const handleDelete = (id) => {
    setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== id));
  };

  const handleUpload = (id) => {
    const doc = documents.find((doc) => doc.id === id);
    if (!doc.docType || !doc.file) {
      alert("Please select a document type and upload a file.");
      return;
    }
    console.log("Uploading document:", doc);
    // You can add API integration here to upload the document
  };

  const handlePreview = (file) => {
    if (file) {
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, "_blank");
    }
  };

  return (
    <div className="p-4 bg-white rounded-md">
      <h1 className="text-xl font-bold mb-4">Upload Documents</h1>
      {documents.map((doc) => (
        <div key={doc.id} className="flex items-center gap-4 mb-4 w-full">
          {/* Document Type Selector */}
          <select
            className="py-2 px-4 border rounded-md w-2/4"
            value={doc.docType}
            onChange={(e) => handleInputChange(doc.id, "docType", e.target.value)}
          >
            <option value="">Select Document Type</option>
            <option value="Passport">Passport</option>
            <option value="ID Card">ID Card</option>
            <option value="Driving License">Driving License</option>
          </select>

          {/* Document Upload Input */}
          <div className="flex items-center gap-4 w-full">
            <label
              htmlFor={`file-upload-${doc.id}`}
              className="bg-teal-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600"
            >
              Choose File
            </label>

            <input
              id={`file-upload-${doc.id}`}
              type="file"
              className="hidden"
              onChange={(e) => handleInputChange(doc.id, "file", e.target.files[0])}
            />

            {/* File Name Display */}
            <span className="text-gray-600">
              {doc.file ? doc.file.name : "No file chosen"}
            </span>
          </div>

          {/* Upload Button */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => handleUpload(doc.id)}
          >
            Upload
          </button>

          {/* Preview Button */}
          <button
            className={`px-4 py-2 rounded-md ${
              doc.file
                ? "bg-purple-500 text-white hover:bg-purple-600 cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={() => handlePreview(doc.file)}
            disabled={!doc.file}
          >
            Preview
          </button>

          {/* Delete Button */}
          <button
            className={`bg-red-500 text-white p-2 rounded-md hover:bg-red-600 flex items-center justify-center ${documents.length === 1 ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400" : ""}`}
            onClick={() => handleDelete(doc.id)}
            title="Delete Document"
          >
            <FiTrash2 className="text-lg" />
          </button>
        </div>
      ))}

      {/* Add Document Button */}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
        onClick={handleAddDocument}
      >
        Add Another Document
      </button>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-10">
        {/* Previous Step Button */}
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
          onClick={() => setStep((prevStep) => Math.max(prevStep - 1, 1))}
        >
          Previous Step
        </button>

        {/* Next Step Button */}
        <button
          className="bg-black text-white px-4 py-2 rounded-md"
          onClick={() => setStep((prevStep) => prevStep + 1)}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default DocumentUploader;
