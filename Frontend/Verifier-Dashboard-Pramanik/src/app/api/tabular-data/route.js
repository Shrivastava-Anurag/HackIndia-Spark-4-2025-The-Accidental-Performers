import { TextractClient, AnalyzeDocumentCommand } from "@aws-sdk/client-textract";

const textractClient = new TextractClient({
  region: "us-east-1", // Replace with your AWS region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const POST = async (req) => {
  try {
    const body = await req.json(); // Parse request body
    const { base64Image } = body;

    if (!base64Image) {
      return new Response(JSON.stringify({ error: "Image is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Decode the base64 image
    const buffer = Buffer.from(base64Image, "base64");

    // Analyze the document for tables
    const command = new AnalyzeDocumentCommand({
      Document: { Bytes: buffer },
      FeatureTypes: ["TABLES"], // Focus only on tables
    });

    // Send the command to AWS Textract
    const textractResponse = await textractClient.send(command);

    // Process and extract table data
    const tables = extractTablesFromBlocks(textractResponse.Blocks);

    return new Response(JSON.stringify({ tables }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing document:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

// Extract tables from the Textract response blocks
const extractTablesFromBlocks = (blocks) => {
  const blockMap = {};
  const tableBlocks = [];

  // Map blocks by ID and identify table blocks
  blocks.forEach((block) => {
    blockMap[block.Id] = block;
    if (block.BlockType === "TABLE") {
      tableBlocks.push(block);
    }
  });

  // Extract data from each table block
  return tableBlocks.map((tableBlock) => extractTableData(tableBlock, blockMap));
};

// Extract data from a single table block
const extractTableData = (tableBlock, blockMap) => {
  const table = [];
  const cellMap = {};

  // Group cells by row and column
  tableBlock.Relationships?.forEach((relationship) => {
    if (relationship.Type === "CHILD") {
      relationship.Ids.forEach((childId) => {
        const cellBlock = blockMap[childId];
        if (cellBlock.BlockType === "CELL") {
          const rowIndex = cellBlock.RowIndex;
          const colIndex = cellBlock.ColumnIndex;

          if (!cellMap[rowIndex]) {
            cellMap[rowIndex] = {};
          }

          // Extract text content for the cell
          cellMap[rowIndex][colIndex] = extractTextFromBlock(cellBlock, blockMap);
        }
      });
    }
  });

  // Convert cell map to a structured table
  const rowKeys = Object.keys(cellMap).sort((a, b) => a - b);
  rowKeys.forEach((rowKey) => {
    const row = [];
    const colKeys = Object.keys(cellMap[rowKey]).sort((a, b) => a - b);
    colKeys.forEach((colKey) => {
      row.push(cellMap[rowKey][colKey]);
    });
    table.push(row);
  });

  return table;
};

// Extract text from a block
const extractTextFromBlock = (block, blockMap) => {
  if (!block.Relationships) return "";

  let text = "";
  block.Relationships.forEach((relationship) => {
    if (relationship.Type === "CHILD") {
      relationship.Ids.forEach((childId) => {
        const childBlock = blockMap[childId];
        if (childBlock.BlockType === "WORD") {
          text += `${childBlock.Text} `;
        }
      });
    }
  });

  return text.trim();
};
