"use client";

import React, { useState } from "react";
import axios from "axios";

const DocumentUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [account, setAccount] = useState<string>("");
  const [receiver, setReceiver] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !receiver || !message) {
      setError("Please fill all fields and select a file.");
      return;
    }

    try {
      setUploading(true);
      setError(null);

      // Step 1: Upload the file to Pinata
      const formData = new FormData();
      formData.append("file", file);

      const pinataResponse = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: "cc2e560077cf5de826f0",
            pinata_secret_api_key: "8d8c5864dea3229f5687b88407027a9a2a115073688a630e9be92ed8f7b70946",
          },
        }
      );

      console.log(pinataResponse)

      if (!pinataResponse.data.IpfsHash) {
        throw new Error("Failed to upload file to Pinata");
      }

      const cid = pinataResponse.data.IpfsHash; // Extract CID from response

      // Step 2: Save document metadata to the database
      const saveResponse = await axios.post(
        "https://backendpramanik.onrender.com/user/saveupload",
        {
          receiver,
          cid,
          message,
          stat: "Non-Verified",
        },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      if (saveResponse.status !== 201) {
        throw new Error("Failed to save document data to the database");
      }

      setSuccess("File uploaded and metadata saved successfully!");
      setUploading(false);

      // Clear the form fields
      setFile(null);
      setReceiver("");
      setMessage("");
    } catch (err: any) {
      setUploading(false);
      setError(err.message || "An error occurred during the process.");
    }
  };
  
  

  // Inline CSS styles
  const containerStyle: React.CSSProperties = {
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    maxWidth: "600px",
    margin: "0 auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const inputStyle: React.CSSProperties = {
    padding: "10px",
    margin: "10px 0",
    width: "100%",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "20px",
  };

  const buttonHoverStyle: React.CSSProperties = {
    backgroundColor: "#0056b3",
  };

  const messageStyle: React.CSSProperties = {
    marginTop: "10px",
    color: error ? "red" : success ? "green" : "black",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyle}>
    <h2>Upload Document</h2>

    <div>
      <label>Receiver:</label>
      <input
        type="text"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
        placeholder="Enter receiver ID"
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />

      <label>Message:</label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter a message"
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      ></textarea>

      <label>Upload Document:</label>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        style={{ display: "block", marginBottom: "10px" }}
      />



  <button onClick={handleUpload} disabled={uploading}>
    {uploading ? "Uploading..." : "Upload"}
  </button>

  <div style={{ marginTop: "10px", color: error ? "red" : "green" }}>
    {error && <p>{error}</p>}
    {success && <p>{success}</p>}
  </div>
</div>


      <div>
        <button
          style={buttonStyle}
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Document"}
        </button>
      </div>

      <div style={messageStyle}>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
      </div>
    </div>
  );
};

export default DocumentUpload;
