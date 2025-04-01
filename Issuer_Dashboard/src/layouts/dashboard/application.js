import React, { useState } from 'react';
import { Check, FileText, CreditCard, GraduationCap, Building, FileSpreadsheet, ExternalLink } from 'lucide-react';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Box,
    Button,
    TextField,
    Card,
    CardContent,
    IconButton,
    Paper,
    ArrowBack,
    Grid,
    Tooltip,
  } from "@mui/material";

const TerminalCard = ({ children }) => {
  return (
    <aside className="bg-black text-white p-6 rounded-lg w-full max-w-lg font-mono transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2 text-red-500">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse delay-75" />
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse delay-150" />
        </div>
        <p className="text-sm opacity-60">bash</p>
      </div>
      <div className="mt-4">
        {children}
      </div>
    </aside>
  );
};

const DocumentVerification = () => {
  const [selectedDoc, setSelectedDoc] = useState(null);
  
  const documents = [
    { id: 'aadhar', title: 'Aadhar Card', icon: <CreditCard className="w-6 h-6" />, color: 'bg-blue-500', gradient: 'from-blue-500 to-blue-600' },
    { id: 'pan', title: 'PAN Card', icon: <CreditCard className="w-6 h-6" />, color: 'bg-green-500', gradient: 'from-green-500 to-green-600' },
    { id: 'license', title: 'Driving License', icon: <FileText className="w-6 h-6" />, color: 'bg-yellow-500', gradient: 'from-yellow-500 to-yellow-600' },
    { id: 'marksheet', title: 'Marksheet', icon: <GraduationCap className="w-6 h-6" />, color: 'bg-purple-500', gradient: 'from-purple-500 to-purple-600' },
    { id: 'ct', title: 'CT Score', icon: <FileSpreadsheet className="w-6 h-6" />, color: 'bg-red-500', gradient: 'from-red-500 to-red-600' },
    { id: 'company', title: 'Company Registration', icon: <Building className="w-6 h-6" />, color: 'bg-indigo-500', gradient: 'from-indigo-500 to-indigo-600' }
  ];

  // Function to copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // Optional: Show a success message
    }).catch((err) => {
      console.error('Failed to copy: ', err); // Handle the error
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f7faff, #ffffff)",
        py: 4,
        px: 2,
      }}
    >
      <Box maxWidth="lg" mx="auto">
        {!selectedDoc ? (
          <Box textAlign="center" mb={6}>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                background: "linear-gradient(to right, #4e54c8, #8f94fb)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
               List of the Applications...
            </Typography>
            <Typography variant="body1" color="textSecondary" mt={2}>
              Select the document type you want to check. Our AI-powered system
              will handle the rest.
            </Typography>
          </Box>
        ) : (
          <Button
            // startIcon={<ArrowBack />}
            // onClick={() => setSelectedDoc(null)}
            // sx={{ color: "#4e54c8", mb: 4 }}
          >
            Back to Documents
          </Button>
        )}

        {!selectedDoc ? (
          <Grid container spacing={3}>
            {documents.map((doc, index) => (
              <Grid item xs={12} sm={6} md={4} key={doc.id}>
                <Paper
                  elevation={3}
                  onClick={() => setSelectedDoc(doc)}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      background: doc.gradient,
                      color: "#fff",
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                      mx: "auto",
                    }}
                  >
                    {doc.icon}
                  </Box>
                  <Typography variant="h6">{doc.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Check {doc.title.toLowerCase()} Status
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 3,
                borderBottom: "1px solid #e0e0e0",
                pb: 2,
              }}
            >
              <Box
                sx={{
                  background: selectedDoc.gradient,
                  color: "#fff",
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 2,
                }}
              >
                {selectedDoc.icon}
              </Box>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {selectedDoc.title} Verification
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Integration details and verification link
                </Typography>
              </Box>
            </Box>

            <Box mb={4}>
              <Typography variant="h6" fontWeight="bold" mb={1}>
                Integration Code
              </Typography>
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  backgroundColor: "#f7f7f7",
                  overflowX: "auto",
                  fontFamily: "monospace",
                }}
              >
                <Typography sx={{ color: "#43a047" }}>
                  {"// Install the package"}
                </Typography>
                <Typography>$ npm install @docverify/sdk</Typography>
                <Typography sx={{ color: "#43a047", mt: 1 }}>
                  {"// Initialize verification"}
                </Typography>
                <Typography>const docVerify = require("@docverify/sdk");</Typography>
                <Typography>
                  docVerify.init('{selectedDoc?.id || "document"}_verification',{" "}
                  {`{`}
                </Typography>
                <Typography sx={{ pl: 2 }}>apiKey: "YOUR_API_KEY",</Typography>
                <Typography sx={{ pl: 2 }}>
                  document: "{selectedDoc?.id || "document_type"}"
                </Typography>
                <Typography>{`});`}</Typography>
              </Paper>
            </Box>

            <Box>
              <Typography variant="h6" fontWeight="bold" mb={1}>
                Verification Link
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <TextField
                  value={`https://api.docverify.ai/verify/${selectedDoc.id}/${Math.random()
                    .toString(36)
                    .substring(7)}`}
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
                {/* <Tooltip title="Copy to clipboard">
                  <IconButton
                    color="primary"
                    onClick={() =>
                      copyToClipboard(
                        `https://api.docverify.ai/verify/${selectedDoc.id}`
                      )
                    }
                  >
                    <CopyAll />
                  </IconButton>
                </Tooltip> */}
              </Box>
            </Box>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default DocumentVerification;
