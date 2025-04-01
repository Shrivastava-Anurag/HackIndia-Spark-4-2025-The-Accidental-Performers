import React, { useState } from "react";
import { Stage, Layer, Rect, Text } from "react-konva";
import { Box, Button, Typography, Slider, TextField } from "@mui/material";
import { SketchPicker } from "react-color";

const CanvaEditor = () => {
  const [shapes, setShapes] = useState([]);
  const [text, setText] = useState("");
  const [color, setColor] = useState("#000");
  const [fontSize, setFontSize] = useState(20);

  

  const addRectangle = () => {
    setShapes([
      ...shapes,
      {
        id: shapes.length + 1,
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        fill: "#00D2FF",
        type: "rectangle",
      },
    ]);
  };

  const addText = () => {
    if (!text) return;
    setShapes([
      ...shapes,
      {
        id: shapes.length + 1,
        x: 100,
        y: 100,
        text,
        fill: color,
        fontSize,
        type: "text",
      },
    ]);
    setText("");
  };

  const updateShapePosition = (id, newPosition) => {
    setShapes(
      shapes.map((shape) =>
        shape.id === id ? { ...shape, ...newPosition } : shape
      )
    );
  };

  const handleDragEnd = (e, id) => {
    const { x, y } = e.target.attrs;
    updateShapePosition(id, { x, y });
  };

  const handleColorChange = (color) => {
    setColor(color.hex);
  };

  const handleFontSizeChange = (_, value) => {
    setFontSize(value);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", flexDirection: "row" }}>
      {/* Sidebar for Tools */}
      <Box
        sx={{
          width: "250px",
          bgcolor: "#f5f5f5",
          p: 2,
          borderRight: "1px solid #ccc",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Tools
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={addRectangle}
          sx={{ mb: 2 }}
        >
          Add Rectangle
        </Button>
        <TextField
          label="Add Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={addText}
          sx={{ mb: 2 }}
        >
          Add Text
        </Button>
        <Typography sx={{ mb: 1 }}>Font Size</Typography>
        <Slider
          value={fontSize}
          onChange={handleFontSizeChange}
          min={10}
          max={50}
          sx={{ mb: 2 }}
        />
        <Typography sx={{ mb: 1 }}>Text Color</Typography>
        <SketchPicker color={color} onChange={handleColorChange} />
      </Box>

      {/* Main Canvas */}
      <Box sx={{ flex: 1, position: "relative" }}>
        <Stage
          width={window.innerWidth - 250}
          height={window.innerHeight}
          style={{ backgroundColor: "#ffffff" }}
        >
            <Layer>
      {shapes.map((shape) => {
        switch (shape.type) {
          case "rectangle":
            return (
              <Rect
                key={shape.id}
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                fill={shape.fill}
                draggable
                onDragEnd={(e) => onDragEnd(e, shape.id)}
              />
            );
          case "text":
            return (
              <Text
                key={shape.id}
                x={shape.x}
                y={shape.y}
                text={shape.text}
                fill={shape.fill}
                fontSize={shape.fontSize}
                draggable
                onDragEnd={(e) => onDragEnd(e, shape.id)}
              />
            );
          default:
            return null;
        }
      })}
    </Layer>
        </Stage>
      </Box>
    </Box>
  );
};

export default CanvaEditor;
