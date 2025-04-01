"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

function QuickLinkComponent() {
  const [selectedDocs, setSelectedDocs] = useState ([]);
  const [generatedLink, setGeneratedLink] = useState(null);

  // Static verifier ID
  const verifierId = "62eeb53916";

  // List of available documents
  const documents = [
    "Pan Card",
    "Aadhaar Card",
    "Passport",
    "Utility Bill",
    "Bank Statement",
    "Driving License",
    "Birth Certificate",
    "MSME Certificate",
    "XII Marksheet",
    "Migration",
  ];

  // Handle checkbox selection
  const handleCheckboxChange = (doc) => {
    setSelectedDocs((prev) =>
      prev.includes(doc)
        ? prev.filter((d) => d !== doc) // Remove if already selected
        : [...prev, doc] // Add if not selected
    );
  };

  const handleGenerateLink = () => {
    if (!verifierId || verifierId.trim() === "") {
      alert("Verifier ID is required to generate the link.");
      return;
    }
  
    if (selectedDocs.length === 0) {
      alert("Please select at least one document to generate a link.");
      return;
    }
  
    try {
      // Encode the documents array as a JSON string and URI encode it
      const encodedDocuments = encodeURIComponent(JSON.stringify(selectedDocs));
      const baseURL = `http://localhost:3000/portal/${verifierId}`;
  
      // Construct the full link
      const link = `${baseURL}?documents=${encodedDocuments}`;
      setGeneratedLink(link);
    } catch (error) {
      console.error("Error generating the link:", error);
      alert("An error occurred while generating the link.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-lg font-bold mb-4">
        Please select the documents you would like to be submitted
      </h2>
      <form>
        <div className="space-y-3">
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Checkbox
                id={`doc-${index}`}
                checked={selectedDocs.includes(doc)}
                onCheckedChange={() => handleCheckboxChange(doc)}
              />
              <label htmlFor={`doc-${index}`} className="text-sm">
                {doc}
              </label>
            </div>
          ))}
        </div>
        <Button
          type="button"
          className="mt-6 w-full"
          onClick={handleGenerateLink}
        >
          Generate Link
        </Button>
      </form>

      {generatedLink && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <p className="text-sm font-semibold">Generated Link:</p>
          <a
            href={generatedLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline break-all"
          >
            {generatedLink}
          </a>
        </div>
      )}
    </div>
  );
}

export default QuickLinkComponent;
