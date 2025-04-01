export const referenceData = {
    "Name": "Anurag Shrivastava",
    "Father's name": "Sachendra Shrivastava",
    "Mother's name": "Anuradha Shrivastava",
    "Roll No.": "19655987",
  };
  export const compareData = (extractedData) => {
    const results = {};
    Object.keys(referenceData).forEach((key) => {
      const extractedValue = extractedData[key] || "Not Found";
      const referenceValue = referenceData[key];
  
      results[key] = {
        extracted: extractedValue,
        reference: referenceValue,
        status: extractedValue === referenceValue ? "Verified" : "Rejected",
      };
    });
    return results;
  };
  