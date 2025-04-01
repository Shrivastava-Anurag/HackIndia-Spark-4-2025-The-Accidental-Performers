import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
  } from "@mui/material";
  import CloseIcon from "@mui/icons-material/Close";

const WorkflowDesigner = () => {
  const [steps, setSteps] = useState([]);
  const [showEndpoint, setShowEndpoint] = useState(false);
  const [endpoint, setEndpoint] = useState('');

  const verificationOptions = [
    { id: 'name', title: 'Name Verification', icon: '👤' },
    { id: 'aadhar', title: 'Aadhar Verification', icon: '🆔' },
    { id: 'pan', title: 'PAN Verification', icon: '📝' },
    { id: 'phone', title: 'Phone Verification', icon: '📱' },
    { id: 'email', title: 'Email Verification', icon: '📧' },
    { id: 'address', title: 'Address Verification', icon: '🏠' },
  ];

  const addStep = (option) => {
    setSteps([...steps, { id: `step-${steps.length + 1}`, ...option }]);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(steps);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setSteps(items);
  };

  const handleSubmit = () => {
    // Simulate endpoint generation
    const uniqueId = Math.random().toString(36).substring(7);
    setEndpoint(`https://api.docverify.ai/verify/${uniqueId}`);
    setShowEndpoint(true);
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(to bottom, #f9fafb, #ffffff)", pt: 8 }}>
      <Container maxWidth="lg" sx={{ mt: 12 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" fontWeight="bold">
            Design Your Verification Workflow
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" mt={1}>
            Drag and drop verification steps to create your custom workflow
          </Typography>
        </Box>

        <Box display="grid" gridTemplateColumns={{ xs: "1fr", lg: "1fr 2fr" }} gap={3}>
          {/* Options Panel */}
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Available Steps
              </Typography>
              {verificationOptions.map((option) => (
                <Button
                  key={option.id}
                  fullWidth
                  onClick={() => addStep(option)}
                  sx={{
                    p: 2,
                    mb: 1,
                    textAlign: "left",
                    backgroundColor: "rgba(25, 118, 210, 0.1)",
                    borderRadius: 1,
                    transition: "background-color 0.2s",
                    "&:hover": { backgroundColor: "rgba(25, 118, 210, 0.2)" },
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <Typography variant="h5" sx={{ mr: 2 }}>
                      {option.icon}
                    </Typography>
                    {option.title}
                  </Box>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Workflow Builder */}
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="workflow">
              {(provided) => (
                <Box
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  sx={{
                    p: 2,
                    minHeight: 400,
                    backgroundColor: "white",
                    borderRadius: 1,
                    boxShadow: 1,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" mb={2}>
                    Your Workflow
                  </Typography>
                  {steps.length === 0 ? (
                    <Typography textAlign="center" color="textSecondary" py={5}>
                      Add verification steps from the left panel
                    </Typography>
                  ) : (
                    steps.map((step, index) => (
                      <Draggable key={step.id} draggableId={step.id} index={index}>
                        {(provided) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              p: 2,
                              mb: 1,
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              backgroundColor: "rgba(25, 118, 210, 0.1)",
                              borderRadius: 1,
                            }}
                          >
                            <Box display="flex" alignItems="center">
                              <Typography variant="h5" sx={{ mr: 2 }}>
                                {step.icon}
                              </Typography>
                              Step {index + 1}: {step.title}
                            </Box>
                            <IconButton
                              color="error"
                              onClick={() => setSteps(steps.filter((_, i) => i !== index))}
                            >
                              <CloseIcon />
                            </IconButton>
                          </Box>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                  {steps.length > 0 && (
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{ mt: 3 }}
                      onClick={handleSubmit}
                    >
                      Generate Verification Link
                    </Button>
                  )}
                </Box>
              )}
            </Droppable>
          </DragDropContext>

          {/* Endpoint Display */}
          {showEndpoint && (
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Your Verification Endpoint
                </Typography>
                <Box display="flex" alignItems="center">
                  <TextField
                    value={endpoint}
                    fullWidth
                    InputProps={{ readOnly: true }}
                    sx={{ mr: 2 }}
                  />
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigator.clipboard.writeText(endpoint)}
                  >
                    Copy
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>
      </Container>
    </Box>
  );
};


export default WorkflowDesigner;