// "use client";

// import { CheckCircleIcon, LoaderIcon } from "lucide-react";
// import { useState } from "react";
// import { format } from "date-fns"
// import { ImCross } from "react-icons/im";

// export default function TextractForm() {
//   const [step, setStep] = useState(1); // Track the current step
//   const [file, setFile] = useState(null);
//   const [filteredData, setFilteredData] = useState(null);
//   const referenceData = {
//     "Name of Candidate": "ANURAG SHRIVASTAVA",
//     "Father's/Guardian's Name": "SACHENDRA SHRIVASTAVA",
//     "Mother's Name": "ANURADHA SHRIVASTAVA",
//     "Roll No.": "19655987",
//   };
//   const [verificationResults, setVerificationResults] = useState(null); // Store verification results
//   const [loading, setLoading] = useState(false);
//   const [preview, setPreview] = useState(""); // File preview
//   const currentTimestamp = format(new Date(), "PPpp"); // Format the current date and time
//   const [cid, setCid] = useState("")


//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     setFilteredData(null);
//     setPreview(URL.createObjectURL(selectedFile));
//   };

//   const handleSubmit = async () => {
//     if (!file) return alert("Please upload a document.");

//     setLoading(true);
//     setStep(2);

//     const reader = new FileReader();
//     reader.onload = async () => {
//       const base64Image = reader.result.split(",")[1];

//       try {
//         const response = await fetch("/api/textract", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ base64Image, cid }),
//         });

//         const data = await response.json();
//         const extractedPairs = processTextractResponse(data);
//         const requiredFields = filterRequiredFields(extractedPairs);
//         setFilteredData(requiredFields);

//         // Perform verification
//         const verificationResults = verifyData(requiredFields, referenceData);
//         setVerificationResults(verificationResults);

//         setStep(3); // Go to third step
//       } catch (error) {
//         console.error("Error processing document:", error);
//         alert("An error occurred while processing the document.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     reader.readAsDataURL(file);
//   };

//   const processTextractResponse = (data) => {
//     const keyMap = {};
//     const valueMap = {};
//     const blockMap = {};

//     data.Blocks.forEach((block) => {
//       blockMap[block.Id] = block;
//       if (block.BlockType === "KEY_VALUE_SET") {
//         if (block.EntityTypes.includes("KEY")) {
//           keyMap[block.Id] = block;
//         } else {
//           valueMap[block.Id] = block;
//         }
//       }
//     });

//     const keyValuePairs = {};
//     Object.values(keyMap).forEach((keyBlock) => {
//       const valueBlock = findValueBlock(keyBlock, valueMap);
//       const key = getText(keyBlock, blockMap);
//       const value = getText(valueBlock, blockMap);
//       if (key && value) {
//         keyValuePairs[key] = value;
//       }
//     });

//     return keyValuePairs;
//   };

//   const filterRequiredFields = (keyValuePairs) => {
//     const fields = ["Name of Candidate", "Father's/Guardian's Name", "Mother's Name", "Roll No."];
//     const filteredData = {};
//     fields.forEach((field) => {
//       const foundKey = Object.keys(keyValuePairs).find((key) =>
//         key.toLowerCase().includes(field.toLowerCase())
//       );
//       if (foundKey) {
//         filteredData[field] = keyValuePairs[foundKey];
//       }
//     });
//     return filteredData;
//   };

//   const findValueBlock = (keyBlock, valueMap) => {
//     if (!keyBlock.Relationships) return null;
//     for (const relationship of keyBlock.Relationships) {
//       if (relationship.Type === "VALUE") {
//         for (const valueId of relationship.Ids) {
//           return valueMap[valueId];
//         }
//       }
//     }
//     return null;
//   };

//   const getText = (block, blockMap) => {
//     if (!block || !block.Relationships) return "";
//     let text = "";
//     for (const relationship of block.Relationships) {
//       if (relationship.Type === "CHILD") {
//         for (const childId of relationship.Ids) {
//           const childBlock = blockMap[childId];
//           if (childBlock.BlockType === "WORD") {
//             text += `${childBlock.Text} `;
//           } else if (
//             childBlock.BlockType === "SELECTION_ELEMENT" &&
//             childBlock.SelectionStatus === "SELECTED"
//           ) {
//             text += "X ";
//           }
//         }
//       }
//     }
//     return text.trim();
//   };

//   const verifyData = (extractedData, referenceData) => {
//     const results = {};
//     Object.keys(referenceData).forEach((key) => {
//       if (extractedData[key]) {
//         results[key] = extractedData[key] === referenceData[key] ? "Verified" : "Rejected";
//       } else {
//         results[key] = "Rejected"; // If the key is missing, reject it
//       }
//     });
//     return results;
//   };

//   const handleNextStep = () => {
//     if (step === 1 && file) {
//       setStep(2);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-full bg-white rounded-xl p-4">
//       <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
//         {step === 1 && (
//           <>
//             <h2 className="text-2xl font-semibold text-left mb-4">Upload Document</h2>
//             <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-100 mb-6">
//               <input
//                 type="file"
//                 accept="image/*"
//                 id="file-upload"
//                 className="hidden"
//                 onChange={handleFileChange}
//               />
//               <label
//                 htmlFor="file-upload"
//                 className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
//               >
//                 {file ? "Change File" : "Choose File"}
//               </label>
//               {file && (
//                 <p className="text-gray-500 mt-2 text-sm">
//                   Selected File: <span className="font-semibold">{file.name}</span>
//                 </p>
//               )}
//             </div>
//             <button
//               onClick={handleSubmit}
//               disabled={!file}
//               className={`w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition ${
//                 !file && "opacity-50 cursor-not-allowed"
//               }`}
//             >
//               Next
//             </button>
//           </>
//         )}

//         {step === 2 && (
//           <div className="flex flex-col items-center justify-center">
//             <h2 className="text-xl text-left font-semibold mb-6">Uploaded Document Preview</h2>
//             {preview && <div className="relative brightness-75 p-2 bg-gray-100 border mb-6">
//               <img src={preview} alt="Document Preview" className="mb-4 rounded-lg h-96" />
//               <div className="h-12 blinking w-12 border-4 border-red-500 absolute top-1 right-6"></div>
//               <div className="h-12 blinking w-72 border-4 border-red-500 absolute bottom-7 left-4"></div>
//               <div className="h-32 blinking w-72 border-4 border-red-500 absolute bottom-32 left-4"></div>
//               <div className="h-12 blinking w-20 border-4 border-red-500 absolute bottom-20 right-16"></div>
//               <div className="h-24 blinking w-60 border-4 border-red-500 absolute top-16 left-4"></div>
//               <LoaderIcon className="absolute top-1/2 left-32 h-16 w-16 animate-spin text-red-500" />
//             </div>}

//             <h1 className="my-6">Analysing data...</h1>
//             <button
//               onClick={handleNextStep}
//               className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
//             >
//               {loading ? "Processing..." : "Extract Data"}
//             </button>
//           </div>
//         )}

// {step === 3 && filteredData && (
//   <div className={`verification-report p-6  shadow-md rounded-lg relative ${isFullyVerified(verificationResults) ? "bg-green-100" : "bg-red-100"}`}>
//       <h2 className="text-2xl font-semibold text-center mb-4">Verification Report</h2>
//         <div className="flex flex-row items-center justify-center mb-10">
//           {
//             isFullyVerified(verificationResults) ? <CheckCircleIcon className={`h-12 w-12 text-green-600 `} /> : <ImCross className={`h-12 w-12 text-red-500 `} />
//           }
//         </div>
//       <div className="verification-summary mb-6">
//         <h3 className="text-xl font-semibold">Verification Summary</h3>
//         <p className="mb-2 text-gray-700">
//           <strong>Verified at:</strong> {currentTimestamp}
//         </p>

//         {isFullyVerified(verificationResults) ? (
//           <p className="text-green-600 font-semibold">The document appears to be authentic. Verification is complete.</p>
//         ) : (
//           <p>
//             <strong>Overall Match Percentage:</strong> {calculateMatchPercentage(verificationResults)}%
//           </p>
//         )}
//       </div>

//       <div className="mismatched-data">
//         <h3 className="text-xl font-semibold mb-4">Mismatched Data:</h3>
//         <div className="mismatch-list space-y-4">
//           {Object.entries(verificationResults).map(([key, status]) => {
//             if (status !== "Verified") {
//               return (
//                 <div key={key} className="mismatch-item p-4 bg-gray-50 border-l-4 border-red-500 rounded-lg">
//                   <p className="font-semibold text-lg">
//                     <span>{key}</span>: <span className="text-red-600">❌ Mismatched</span>
//                   </p>
//                 </div>
//               );
//             }
//             return null;
//           })}
//         </div>

//         {!isFullyVerified(verificationResults) && (
//           <p className="text-red-600 mt-4 font-semibold">The document is not authentic due to the mismatches.</p>
//         )}
//       </div>

//       <div className="verified-data mt-6">
//       </div>
//     </div>
// )}




//       </div>
//     </div>
//   );
// }


  

//   const isFullyVerified = (verificationResults) => {
//     return Object.values(verificationResults).every(status => status === "Verified");
//   };

//   const calculateMatchPercentage = (verificationResults) => {
//     const verifiedCount = Object.values(verificationResults).filter(status => status === "Verified").length;
//     const totalCount = Object.values(verificationResults).length;
//     return ((verifiedCount / totalCount) * 100).toFixed(2);
//   };



"use client";

import { CheckCircleIcon, LoaderIcon } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { ImCross } from "react-icons/im";

export default function DocumentVerificationForm() {
  const [step, setStep] = useState(1); // Track the current step
  const [file, setFile] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const referenceData = {
    "Name of Candidate": "ANURAG SHRIVASTAVA",
    "Father's/Guardian's Name": "SACHENDRA SHRIVASTAVA",
    "Mother's Name": "ANURADHA SHRIVASTAVA",
    "Roll No.": "19655987",
  };
  const [verificationResults, setVerificationResults] = useState(null); // Store verification results
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(""); // File preview
  const currentTimestamp = format(new Date(), "PPpp"); // Format the current date and time
  const [cid, setCid] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFilteredData(null);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async () => {
    if (!file) return alert("Please upload a document.");

    setLoading(true);
    setStep(2);

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Image = reader.result.split(",")[1];

      try {
        // Call our OpenAI-powered API endpoint instead of Textract
        const response = await fetch("/api/openai-extract", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ base64Image, cid }),
        });

        const data = await response.json();
        
        // Use the same processing functions as before
        const extractedPairs = processTextractResponse(data);
        const requiredFields = filterRequiredFields(extractedPairs);
        setFilteredData(requiredFields);

        // Perform verification
        const verificationResults = verifyData(requiredFields, referenceData);
        setVerificationResults(verificationResults);

        setStep(3); // Go to third step
      } catch (error) {
        console.error("Error processing document:", error);
        alert("An error occurred while processing the document.");
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  // Same processing functions as in original code
  const processTextractResponse = (data) => {
    const keyMap = {};
    const valueMap = {};
    const blockMap = {};

    data.Blocks.forEach((block) => {
      blockMap[block.Id] = block;
      if (block.BlockType === "KEY_VALUE_SET") {
        if (block.EntityTypes.includes("KEY")) {
          keyMap[block.Id] = block;
        } else {
          valueMap[block.Id] = block;
        }
      }
    });

    const keyValuePairs = {};
    Object.values(keyMap).forEach((keyBlock) => {
      const valueBlock = findValueBlock(keyBlock, valueMap);
      const key = getText(keyBlock, blockMap);
      const value = getText(valueBlock, blockMap);
      if (key && value) {
        keyValuePairs[key] = value;
      }
    });

    return keyValuePairs;
  };

  const filterRequiredFields = (keyValuePairs) => {
    const fields = ["Name of Candidate", "Father's/Guardian's Name", "Mother's Name", "Roll No."];
    const filteredData = {};
    fields.forEach((field) => {
      const foundKey = Object.keys(keyValuePairs).find((key) =>
        key.toLowerCase().includes(field.toLowerCase())
      );
      if (foundKey) {
        filteredData[field] = keyValuePairs[foundKey];
      }
    });
    return filteredData;
  };

  const findValueBlock = (keyBlock, valueMap) => {
    if (!keyBlock.Relationships) return null;
    for (const relationship of keyBlock.Relationships) {
      if (relationship.Type === "VALUE") {
        for (const valueId of relationship.Ids) {
          return valueMap[valueId];
        }
      }
    }
    return null;
  };

  const getText = (block, blockMap) => {
    if (!block || !block.Relationships) return "";
    let text = "";
    for (const relationship of block.Relationships) {
      if (relationship.Type === "CHILD") {
        for (const childId of relationship.Ids) {
          const childBlock = blockMap[childId];
          if (childBlock.BlockType === "WORD") {
            text += `${childBlock.Text} `;
          } else if (
            childBlock.BlockType === "SELECTION_ELEMENT" &&
            childBlock.SelectionStatus === "SELECTED"
          ) {
            text += "X ";
          }
        }
      }
    }
    return text.trim();
  };

  const verifyData = (extractedData, referenceData) => {
    const results = {};
    Object.keys(referenceData).forEach((key) => {
      if (extractedData[key]) {
        results[key] = extractedData[key] === referenceData[key] ? "Verified" : "Rejected";
      } else {
        results[key] = "Rejected"; // If the key is missing, reject it
      }
    });
    return results;
  };

  const isFullyVerified = (verificationResults) => {
    return Object.values(verificationResults).every(status => status === "Verified");
  };

  const calculateMatchPercentage = (verificationResults) => {
    const verifiedCount = Object.values(verificationResults).filter(status => status === "Verified").length;
    const totalCount = Object.values(verificationResults).length;
    return ((verifiedCount / totalCount) * 100).toFixed(2);
  };

  const handleNextStep = () => {
    if (step === 1 && file) {
      setStep(2);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-white rounded-xl p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        {step === 1 && (
          <>
            <h2 className="text-2xl font-semibold text-left mb-4">Upload Document</h2>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-100 mb-6">
              <input
                type="file"
                accept="image/*"
                id="file-upload"
                className="hidden"
                onChange={handleFileChange}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                {file ? "Change File" : "Choose File"}
              </label>
              {file && (
                <p className="text-gray-500 mt-2 text-sm">
                  Selected File: <span className="font-semibold">{file.name}</span>
                </p>
              )}
            </div>
            <button
              onClick={handleSubmit}
              disabled={!file}
              className={`w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition ${
                !file && "opacity-50 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl text-left font-semibold mb-6">Uploaded Document Preview</h2>
            {preview && <div className="relative brightness-75 p-2 bg-gray-100 border mb-6">
              <img src={preview} alt="Document Preview" className="mb-4 rounded-lg h-96" />
              <div className="h-12 blinking w-12 border-4 border-red-500 absolute top-1 right-6"></div>
              <div className="h-12 blinking w-72 border-4 border-red-500 absolute bottom-7 left-4"></div>
              <div className="h-32 blinking w-72 border-4 border-red-500 absolute bottom-32 left-4"></div>
              <div className="h-12 blinking w-20 border-4 border-red-500 absolute bottom-20 right-16"></div>
              <div className="h-24 blinking w-60 border-4 border-red-500 absolute top-16 left-4"></div>
              <LoaderIcon className="absolute top-1/2 left-32 h-16 w-16 animate-spin text-red-500" />
            </div>}

            <h1 className="my-6">Analyzing data with AI...</h1>
            <button
              onClick={handleNextStep}
              className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              {loading ? "Processing..." : "Extract Data"}
            </button>
          </div>
        )}

        {step === 3 && filteredData && (
          <div className={`verification-report p-6 shadow-md rounded-lg relative ${isFullyVerified(verificationResults) ? "bg-green-100" : "bg-red-100"}`}>
            <h2 className="text-2xl font-semibold text-center mb-4">Verification Report</h2>
            <div className="flex flex-row items-center justify-center mb-10">
              {
                isFullyVerified(verificationResults) ? 
                <CheckCircleIcon className="h-12 w-12 text-green-600" /> : 
                <ImCross className="h-12 w-12 text-red-500" />
              }
            </div>
            <div className="verification-summary mb-6">
              <h3 className="text-xl font-semibold">Verification Summary</h3>
              <p className="mb-2 text-gray-700">
                <strong>Verified at:</strong> {currentTimestamp}
              </p>

              {isFullyVerified(verificationResults) ? (
                <p className="text-green-600 font-semibold">The document appears to be authentic. Verification is complete.</p>
              ) : (
                <p>
                  <strong>Overall Match Percentage:</strong> {calculateMatchPercentage(verificationResults)}%
                </p>
              )}
            </div>

            <div className="mismatched-data">
              <h3 className="text-xl font-semibold mb-4">Mismatched Data:</h3>
              <div className="mismatch-list space-y-4">
                {Object.entries(verificationResults).map(([key, status]) => {
                  if (status !== "Verified") {
                    return (
                      <div key={key} className="mismatch-item p-4 bg-gray-50 border-l-4 border-red-500 rounded-lg">
                        <p className="font-semibold text-lg">
                          <span>{key}</span>: <span className="text-red-600">❌ Mismatched</span>
                        </p>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>

              {!isFullyVerified(verificationResults) && (
                <p className="text-red-600 mt-4 font-semibold">The document is not authentic due to the mismatches.</p>
              )}
            </div>

            <div className="verified-data mt-6">
            </div>
          </div>
        )}
      </div>
    </div>
  );
}