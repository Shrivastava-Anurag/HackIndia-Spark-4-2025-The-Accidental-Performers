import React, { useState } from 'react';

const DocumentAccessPortal = ({ documents, onSubmit }) => {
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [isAcknowledged, setIsAcknowledged] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Toggle document selection
  const toggleDocumentSelection = (docId) => {
    setSelectedDocs((prev) =>
      prev.includes(docId)
        ? prev.filter((id) => id !== docId)
        : [...prev, docId]
    );
  };

  // Handle "Select All" checkbox toggle
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedDocs([]);
    } else {
      setSelectedDocs(documents.map((doc) => doc.id));
    }
    setSelectAll(!selectAll);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!isAcknowledged) {
      alert('Please acknowledge the terms to proceed.');
      return;
    }

    if (selectedDocs.length === 0) {
      alert('Please select at least one document to share.');
      return;
    }

    onSubmit(selectedDocs);
    setSubmitted(true); // Update submitted state after form submission
  };

  return (
    <div className="mx-auto max-w-xl p-6 bg-white border rounded-lg shadow-md mx-5 sm:mx-0">
      {submitted ? (
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-gray-800">
            Thank you for submitting
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Your documents have been successfully submitted for verification.
          </p>
        </div>
      ) : (
        <>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-gray-800">
            Authorize Document Access
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Select the documents you wish to share with the verifying authority. Ensure you acknowledge the terms before proceeding.
          </p>

          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">Available Documents</h3>
              <div className="mb-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                  />
                  <span className="font-medium text-gray-800">Select All</span>
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-start bg-white border border-gray-200 rounded-lg shadow-sm px-4 py-2 hover:shadow-md transition"
                >
                  <div className="flex-grow">
                    <h4 className="font-medium text-gray-800">{doc.name}</h4>
                    <p className="text-sm text-gray-500">Type: {doc.type}</p>
                  </div>
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 my-auto"
                    checked={selectedDocs.includes(doc.id)}
                    onChange={() => toggleDocumentSelection(doc.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Important Information</h3>
            <ul className="list-disc pl-5 text-blue-950 space-y-2 text-sm ml-4 sm:ml-8">
              <li>
                The verifying authority can access the selected documents only for a limited period of <strong>30 days</strong>.
              </li>
              <li>
                The documents will be used strictly for <strong>verification purposes</strong> and will not be shared with third parties.
              </li>
              <li>
                You retain full control and can revoke access at any time before the expiration period.
              </li>
              <li>
                All shared documents are encrypted and handled with the utmost confidentiality.
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                checked={isAcknowledged}
                onChange={(e) => setIsAcknowledged(e.target.checked)}
              />
              <span className="text-gray-700">
                I confirm that I am granting access to the selected documents to the verifying authority for verification purposes. I have read and understood the above conditions.
              </span>
            </label>
          </div>

          <button
            onClick={handleSubmit}
            className={`w-full py-3 rounded-lg text-white font-medium transition ${
              isAcknowledged
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!isAcknowledged}
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
};

// Sample usage
const documents = [
  { id: '1', name: 'Birth Certificate', type: 'Government ID' },
  { id: '2', name: 'XII Marksheet', type: 'Education Sector' },
];

const handleSubmission = (selectedDocs) => {
  console.log('Documents selected for verification:', selectedDocs);
  alert('Access granted to the selected documents!');
};

const App = () => (
  <div className="flex items-center justify-center">
    <DocumentAccessPortal documents={documents} onSubmit={handleSubmission} />
  </div>
);

export default App;
