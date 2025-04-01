"use client";

import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';

type Document = {
  _id: number;
  message: string;
  receiver: string;
  signature: string;
  cid: string;
  createdAt: string;
};

const DocumentShare: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [qrExpiration, setQrExpiration] = useState<Date | null>(null);

  useEffect(() => {
    // Fetch documents for the receiver (replace receiver with the actual receiver info)
    const fetchDocuments = async () => {
      const receiver = '0x21fF6FcC89e8ed65318059527d390FaF6aC5830a'; // Replace with actual receiver

      const response = await fetch('https://backendpramanik.onrender.com/user/getIssuedDocuments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ receiver }),
      });

      if (!response.ok) {
        console.error('Failed to fetch documents');
        return;
      }

      const data = await response.json();
      setDocuments(data); // Set the list of documents
    };

    fetchDocuments();
  }, []);

  const handleSelectDocument = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCid = event.target.value;
    const document = documents.find(doc => doc.cid === selectedCid) || null;
    setSelectedDocument(document);

    if (document) {
      // Construct the URL for the document using the Pinata gateway and the CID
      const gatewayUrl = 'https://gateway.pinata.cloud/ipfs/';
      const documentUrl = `${gatewayUrl}${document.cid}`;

      // Set the URL for QR generation
      setQrCodeUrl(documentUrl);

      // Set expiration time for 30 minutes
      const expirationTime = new Date();
      expirationTime.setMinutes(expirationTime.getMinutes() + 10); // QR code expires in 30 mins
      setQrExpiration(expirationTime);
    }
  };

  const handleShare = async () => {
    if (qrCodeUrl && navigator.share) {
      try {
        await navigator.share({
          title: 'Document Share',
          text: 'Check out this document!',
          url: qrCodeUrl,
        });
      } catch (error) {
        console.error('Error sharing document:', error);
      }
    }
  };

  const isQrExpired = qrExpiration && new Date() > qrExpiration;

  const containerStyle: React.CSSProperties = {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: '0 auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const dropdownStyle: React.CSSProperties = {
    padding: '10px',
    fontSize: '16px',
    marginBottom: '20px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
    backgroundColor: '#fff',
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    margin: '10px 0',
    transition: 'background-color 0.3s',
  };

  const buttonHoverStyle: React.CSSProperties = {
    backgroundColor: '#0056b3',
  };

  const qrCodeContainerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginTop: '20px',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  };

  const qrExpirationStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#666',
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Select a Document to Share</h2>
      
      <div>
        <select
          style={dropdownStyle}
          onChange={handleSelectDocument}
          value={selectedDocument?.cid || ''}
        >
          <option value="">-- Select a Document --</option>
          {documents.map((document) => (
            <option key={document.cid} value={document.cid}>
              {document.message}
            </option>
          ))}
        </select>
      </div>

      {selectedDocument && !isQrExpired && (
        <div style={qrCodeContainerStyle}>
          <h3>QR Code for Document: {selectedDocument.cid}</h3>
          <QRCode value={qrCodeUrl || ''} size={256} />
          <p style={qrExpirationStyle}>QR code is active until: {qrExpiration?.toLocaleTimeString()}</p>
          <button onClick={handleShare} style={buttonStyle}>Share via Platforms</button>
        </div>
      )}

      {isQrExpired && <p style={{ color: 'red', fontWeight: 'bold' }}>The QR code has expired.</p>}
    </div>
  );
};

export default DocumentShare;
