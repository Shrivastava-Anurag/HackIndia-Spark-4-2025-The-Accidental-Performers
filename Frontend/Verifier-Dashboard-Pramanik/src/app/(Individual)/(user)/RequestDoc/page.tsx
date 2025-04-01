"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import { ethers } from "ethers";

const DocumentRequestForm = () => {
  const [formData, setFormData] = useState({
    documentType: "",
    receiverId: "",
    additionalInfo: "",
  });
  const [walletId, setWalletId] = useState(""); // Wallet Address
  const [selectedDocument, setSelectedDocument] = useState<string>("");
  const [documents, setDocuments] = useState<any[]>([]); // Fetched documents array
  const [requiredCIDs, setRequiredCIDs] = useState<{
    [key: string]: string | null;
  }>({});
  const [files, setFiles] = useState<{ [key: string]: File | null }>({});

  const receiver = "0x21fF6FcC89e8ed65318059527d390FaF6aC5830a";

  const documentTypes = {
    "Migration Certificate": {
      requiredFields: ["Birth Certificate", "XII Marksheet"],
      issuingAuthority: "School/College Administration",
    },
    "School Leaving Certificate": {
      requiredFields: ["XII Marksheet"],
      issuingAuthority: "School Principal/Headmaster",
    },
    "Passport": {
      requiredFields: ["Birth Certificate"],
      issuingAuthority: "Ministry of External Affairs, Government of India",
    },
    "Disability Certificate": {
      requiredFields: ["Birth Certificate", "Medical Report"],
      issuingAuthority: "Chief Medical Officer (CMO), Government Hospital",
    },
    "Income Certificate": {
      requiredFields: ["Salary Slip"],
      issuingAuthority: "Revenue Department, State Government",
    },
    "Death Certificate": {
      requiredFields: ["Birth Certificate", "Death Report"],
      issuingAuthority: "Registrar of Births and Deaths, Municipal Corporation",
    },
    "XII Marksheet": {
      requiredFields: ["Admit Card"],
      issuingAuthority: "Ministry of Education/State Education Board",
    },
    "Domicile Certificate": {
      requiredFields: ["Birth Certificate", "Proof of Residence"],
      issuingAuthority: "District Magistrate/Tehsildar, State Government",
    },
  };

  // Automatically connect wallet on load
  useEffect(() => {
    const connectWallet = async () => {
      if (typeof window === "undefined" || !window.ethereum) {
        toast.error("MetaMask is not installed.");
        return;
      }

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWalletId(address);
        console.log("Connected wallet address:", address);
      } catch (err) {
        console.error("Error connecting wallet:", err);
        toast.error("Failed to connect wallet.");
      }
    };

    connectWallet();
  }, []);

  // Fetch documents from server
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/user/getIssuedDocuments",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ receiver }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch documents");
        }

        const data = await response.json();
        setDocuments(data); // Assuming the response contains an array of documents
      } catch (err) {
        console.error("Error fetching documents:", err);
      }
    };

    fetchDocuments();
  }, [receiver]);

  const handleDocumentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedType = event.target.value;
    setSelectedDocument(selectedType);

    if (selectedType) {
      const requiredFields = documentTypes[selectedType].requiredFields;
      const matchedCIDs: { [key: string]: string | null } = {};

      requiredFields.forEach((field) => {
        const matchedDoc = documents.find((doc) => doc.message === field);
        matchedCIDs[field] = matchedDoc ? matchedDoc.cid : null;
      });

      setRequiredCIDs(matchedCIDs);
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    setFiles((prevFiles) => ({ ...prevFiles, [field]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!walletId) {
      toast.error("Please connect your wallet before submitting the request.", {
        autoClose: 3000,
      });
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append("documentType", selectedDocument);
    formDataObj.append("receiverId", walletId);
    formDataObj.append("additionalInfo", formData.additionalInfo);

    Object.keys(requiredCIDs).forEach((field) => {
      if (requiredCIDs[field]) {
        formDataObj.append(field, requiredCIDs[field] as string); // Auto-filled CID
      } else if (files[field]) {
        formDataObj.append(field, files[field] as File); // File upload
      }
    });

    try {
      const response = await fetch(
        "http://localhost:5000/user/requestDocument",
        {
          method: "POST",
          body: formDataObj,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send request");
      }

      toast.success("Request submitted successfully!", { autoClose: 3000 });
      setSelectedDocument("");
      setFiles({});
      setRequiredCIDs({});
    } catch (err) {
      console.error("Error submitting request:", err);
      toast.error("Failed to submit request. Please try again.", {
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-white to-indigo-100 shadow-md rounded-md max-w-3xl  mx-auto mt-5 px-8">
      <h2 className="text-2xl font-bold mb-4">Request a Document</h2>
      
      <div className="mb-4">
        <Button className="w-full bg-green-600 text-white">
          {walletId
            ? `Wallet Connected: ${walletId.slice(0, 6)}...${walletId.slice(
                -4
              )}`
            : "Connecting..."}
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="document-type"
            className="block font-medium text-gray-700"
          >
            Document Type
          </label>
          <select
            id="document-type"
            value={selectedDocument}
            onChange={handleDocumentChange}
            className="border rounded-md p-2 w-full"
          >
            <option value="">--Select Document--</option>
            {Object.keys(documentTypes).map((doc) => (
              <option key={doc} value={doc}>
                {doc}
              </option>
            ))}
          </select>
        </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
{selectedDocument && (
  <div className="mb-4">
    <label className="block font-medium text-gray-700">Issuing Authority</label>
    <input
      type="text"
      value={documentTypes[selectedDocument].issuingAuthority}
      readOnly
      disabled
      className="border rounded-md p-2 w-full bg-gray-100 text-gray-500"
    />
  </div>
)}

{selectedDocument === "Migration Certificate" && (
  <div className="mb-4">
    <label htmlFor="board" className="block font-medium text-gray-700">
      Select Board
    </label>
    <select
      id="board"
      className="border rounded-md p-2 w-full"
      onChange={(e) => console.log("Selected board:", e.target.value)} // Replace with your state update logic
    >
      <option value="">--Select Board--</option>
      <option value="CBSE">CBSE</option>
      <option value="MP">MP</option>
      <option value="Chhattisgarh">Chhattisgarh</option>
      <option value="Other">Other</option>
    </select>
  </div>
)}

</div>
<hr className="bg-indigo-200 h-1"></hr>
        {selectedDocument && (
          <div>
            <h3 className="text-lg font-semibold mb-4 mt-6">
              {selectedDocument} -{" "}
              {documentTypes[selectedDocument].issuingAuthority}
            </h3>
            {documentTypes[selectedDocument].requiredFields.map((field) => (
              <div key={field} className="mb-4">
                <label className="block font-medium text-gray-700">
                  {field}{" "}
                  {requiredCIDs[field] ? "(Auto-filled)" : "(Upload Required)"}
                </label>
                {requiredCIDs[field] ? (
                  <input
                    type="text"
                    value={requiredCIDs[field] || ""}
                    readOnly
                    disabled
                    className="border rounded-md p-2 w-full bg-gray-100 text-gray-500"
                  />
                ) : (
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, field)}
                    className="border rounded-md p-2 w-full"
                    accept=".pdf,.jpg,.png,.jpeg"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mb-4">
          <label className="block font-medium text-gray-700">
            Additional Information
          </label>
          <Textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                additionalInfo: e.target.value,
              }))
            }
            placeholder="Enter any additional details"
          />
        </div>

        <Button type="submit" className="w-full bg-blue-600 text-white">
          Submit Request
        </Button>
      </form>
    </div>
  );
};

export default DocumentRequestForm;
