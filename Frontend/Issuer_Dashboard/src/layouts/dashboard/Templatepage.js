import React, { useState } from 'react';
import { Button, Typography, Box, Modal } from '@mui/material';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import axios from 'axios';

function GeneratePdfPage() {
  const [excelData, setExcelData] = useState([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [previewPdfUrl, setPreviewPdfUrl] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Get the first sheet and convert it to JSON
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        let jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Clean the keys in the JSON data
        jsonData = jsonData.map((row) =>
          Object.keys(row).reduce((acc, key) => {
            const cleanedKey = key.trim().replace(/\s+/g, ' '); // Remove extra spaces
            acc[cleanedKey] = row[key];
            return acc;
          }, {})
        );

        setExcelData(jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // Generate PDF and preview it
  const handleReviewPdf = () => {
    if (excelData.length === 0) {
      alert('No data to review!');
      return;
    }

    const doc = new jsPDF();
    excelData.forEach((item, index) => {
      // Add content for each item
      doc.setFontSize(20);
      doc.text('TCS Application Details', 10, 10);

      doc.setFontSize(10);
      const content = `
        Timestamp: ${item.Timestamp || ''}
        ERP ID: ${item['ERP ID'] || ''}
        Email ID: ${item['Email ID'] || ''}
        Name: ${item['Name'] || ''}
        Application Status: ${item['Application Status'] || ''}
        Institute Name: ${item['Institute Name'] || ''}
        Highest Qualification: ${item['Highest Qualification'] || ''}
        Specialisation: ${item.Specialisation || ''}
        Skills: ${item.Skills || ''}
        Eligible as per TCS Criteria: ${item['Eligible as per the TCS Eligibility Criteria'] || ''}
        Test State Preference 1: ${item['Test State Preference 1'] || ''}
        Test City Preference 1: ${item['Test City Preference 1'] || ''}
      `;

      doc.text(content, 10, 20);

      // Add a new page if not the last item
      if (index < excelData.length - 1) {
        doc.addPage();
      }
    });

    // Convert the PDF to a Blob and create a preview URL
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setPreviewPdfUrl(pdfUrl);
    setIsReviewModalOpen(true);
  };

  // Generate and upload PDF
  const generateAndUploadPdf = async () => {
    if (excelData.length === 0) {
      alert('No data to publish!');
      return;
    }

    setIsPublishing(true);

    const doc = new jsPDF();

    excelData.forEach((item, index) => {
      // Add content for each item
      doc.setFontSize(20);
      doc.text('TCS Application Details', 10, 10);

      doc.setFontSize(10);
      const content = `
        Timestamp: ${item.Timestamp || ''}
        ERP ID: ${item['ERP ID'] || ''}
        Email ID: ${item['Email ID'] || ''}
        Name: ${item['Name'] || ''}
        Application Status: ${item['Application Status'] || ''}
        Institute Name: ${item['Institute Name'] || ''}
        Highest Qualification: ${item['Highest Qualification'] || ''}
        Specialisation: ${item.Specialisation || ''}
        Skills: ${item.Skills || ''}
        Eligible as per TCS Criteria: ${item['Eligible as per the TCS Eligibility Criteria'] || ''}
        Test State Preference 1: ${item['Test State Preference 1'] || ''}
        Test City Preference 1: ${item['Test City Preference 1'] || ''}
      `;

      doc.text(content, 10, 20);

      // Add a new page if not the last item
      if (index < excelData.length - 1) {
        doc.addPage();
      }
    });

    // Convert the PDF to a Blob
    const pdfBlob = doc.output('blob');

    // Upload to Pinata
    try {
      const formData = new FormData();
      formData.append('file', pdfBlob, 'applications.pdf');

      const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          pinata_api_key: 'cc2e560077cf5de826f0',
          pinata_secret_api_key: '8d8c5864dea3229f5687b88407027a9a2a115073688a630e9be92ed8f7b70946',
        },
      });

      alert(`PDF successfully published to IPFS! CID: ${response.data.IpfsHash}`);
    } catch (error) {
      console.error('Error uploading to Pinata:', error);
      alert('Failed to publish PDF to IPFS.');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Generate Document and Publish
      </Typography>

      <Box>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          style={{ marginBottom: '20px' }}
        />
      </Box>

      {excelData.length > 0 && (
        <div>
          <Typography variant="h6" gutterBottom>
            Uploaded Data:
          </Typography>
          <table border="1" cellPadding="5" style={{ width: '100%', marginBottom: '20px' }}>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Email</th>
                <th>Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {excelData.map((item, index) => (
                <tr key={index}>
                  <td>{item.Timestamp}</td>
                  <td>{item['Email ID']}</td>
                  <td>{item['Name']}</td>
                  <td>{item['Application Status']}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleReviewPdf}
            style={{ marginRight: '10px' }}
          >
            Review Document
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={generateAndUploadPdf}
            disabled={isPublishing}
          >
            {isPublishing ? 'Publishing...' : 'Publish to IPFS'}
          </Button>
        </div>
      )}

      {/* Review Modal */}
      <Modal
        open={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          style={{
            backgroundColor: 'white',
            padding: '20px',
            maxWidth: '80%',
            maxHeight: '80%',
            overflow: 'auto',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Document Preview
          </Typography>
          {previewPdfUrl && (
            <iframe
              src={previewPdfUrl}
              title="PDF Preview"
              width="100%"
              height="400px"
              style={{ border: 'none' }}
            />
          )}
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setIsReviewModalOpen(false)}
            style={{ marginTop: '10px' }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default GeneratePdfPage;
