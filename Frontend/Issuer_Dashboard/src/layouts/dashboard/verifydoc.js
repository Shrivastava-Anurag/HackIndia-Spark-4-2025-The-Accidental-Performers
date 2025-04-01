import React, { useState, useRef } from 'react';
import { Box, Button, Typography, Card, CircularProgress } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Tesseract from 'tesseract.js'; // Correct import for Tesseract.js v2+

const DocumentVerificationComponent = () => {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [extractedText, setExtractedText] = useState(""); // Store full extracted text
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const extractTextUsingOCR = async (imageFile) => {
    setIsProcessing(true);

    try {
      // Applying some OCR configuration to improve results
      const result = await Tesseract.recognize(
        imageFile,
        'eng',
        {
          logger: (m) => console.log(m), // Optional: logs progress
          tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK,  // Change page segmentation mode
        }
      );
      
      // Extracted text
      setExtractedText(result.data.text); // Full extracted text
      setVerificationComplete(true);
    } catch (error) {
      console.error("Error during OCR:", error);
      setExtractedText("Failed to extract text");
      setVerificationComplete(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const startVerification = () => {
    if (file) {
      extractTextUsingOCR(file); // Start OCR on the selected file
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #ebf8ff, #edf2ff)",
        p: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          width: "100%",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          overflow: "hidden",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: "bold",
            background:
              "linear-gradient(to right, #3b82f6, #6366f1, #8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Document Verification
        </Typography>
        <Typography align="center" color="textSecondary" sx={{ mt: 1 }}>
          AI-powered document analysis and verification
        </Typography>

        {!isProcessing && !verificationComplete && (
          <Box mt={4} textAlign="center">
            <Box
              onClick={() => fileInputRef.current.click()}
              sx={{
                border: "2px dashed",
                borderColor: "gray.300",
                borderRadius: 2,
                py: imagePreview ? 2 : 8,
                px: 4,
                background: "linear-gradient(to bottom right, #fff, #f8f9fa)",
                cursor: "pointer",
                "&:hover": {
                  background: "linear-gradient(to bottom right, #e6f7ff, #e9edff)",
                },
              }}
            >
              {!imagePreview ? (
                <>
                  <UploadFileIcon
                    sx={{
                      fontSize: 48,
                      color: "primary.main",
                      mb: 2,
                    }}
                  />
                  <Typography variant="body1">Drop your document here</Typography>
                  <Typography variant="caption" color="textSecondary">
                    or click to browse
                  </Typography>
                </>
              ) : (
                <img
                  src={imagePreview}
                  alt="Document preview"
                  style={{
                    maxHeight: "200px",
                    width: "auto",
                    borderRadius: 8,
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  }}
                />
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
                accept="image/*"
              />
            </Box>
            {file && (
              <Button
                onClick={startVerification}
                variant="contained"
                sx={{
                  mt: 4,
                  width: "100%",
                  py: 2,
                  background:
                    "linear-gradient(to right, #3b82f6, #6366f1)",
                  "&:hover": {
                    background:
                      "linear-gradient(to right, #2563eb, #4f46e5)",
                  },
                }}
              >
                Begin Verification
              </Button>
            )}
          </Box>
        )}

        {isProcessing && imagePreview && (
          <Box mt={4} textAlign="center">
            <img
              src={imagePreview}
              alt="Processing document"
              style={{
                maxHeight: "200px",
                width: "auto",
                borderRadius: 8,
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
            />
            <CircularProgress sx={{ mt: 4, color: "primary.main" }} />
            <Typography sx={{ mt: 2, fontWeight: "bold" }}>
              Verifying document...
            </Typography>
          </Box>
        )}

        {verificationComplete && !isProcessing && (
          <Box mt={4} textAlign="center">
            <Typography variant="h6" color="textPrimary" sx={{ fontWeight: "bold" }}>
              OCR Result:
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, whiteSpace: "pre-wrap" }}>
              {extractedText || "No text extracted."}
            </Typography>
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default DocumentVerificationComponent;
