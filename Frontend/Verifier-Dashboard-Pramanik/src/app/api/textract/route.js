// import { TextractClient, AnalyzeDocumentCommand } from "@aws-sdk/client-textract";

// const textractClient = new TextractClient({
//   region: "us-east-1", // Replace with your region
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });

// export const POST = async (req) => {
//   try {
//     const body = await req.json(); // Parse request body
//     const { base64Image } = body;

//     if (!base64Image) {
//       return new Response(JSON.stringify({ error: "Image is required" }), {
//         status: 400,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     // Decode the base64 image
//     const buffer = Buffer.from(base64Image, "base64");

//     // Prepare the AnalyzeDocument command
//     const command = new AnalyzeDocumentCommand({
//       Document: {
//         Bytes: buffer, // Pass the image buffer
//       },
//       FeatureTypes: ["FORMS", "TABLES"], // Specify the feature types you need
//     });

//     // Send the command to Textract
//     const response = await textractClient.send(command);

//     return new Response(JSON.stringify(response), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Error processing image:", error);

//     return new Response(
//       JSON.stringify({ error: error.message }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   }
// };

import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: "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",
});

export const POST = async (req) => {
  try {
    const body = await req.json(); // Parse request body
    const { base64Image, cid } = body;

    if (!base64Image) {
      return new Response(JSON.stringify({ error: "Image is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create a data URL for the image
    const dataURI = `data:image/jpeg;base64,${base64Image}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extract all key-value pairs from this document. Focus on extracting fields like 'Name of Candidate', 'Father's/Guardian's Name', 'Mother's Name', 'Roll No.' and any other relevant information. Format the output as a JSON object with the field names as keys."
            },
            {
              type: "image_url",
              image_url: {
                url: dataURI
              }
            }
          ]
        }
      ],
      max_tokens: 1000
    });

    // Transform the OpenAI response to match the format expected by the frontend
    // This mimics the Textract response structure needed by the frontend
    const textractStyleResponse = transformToTextractFormat(response.choices[0].message.content);

    return new Response(JSON.stringify(textractStyleResponse), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing image:", error);

    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

// Function to transform OpenAI's response to match Textract's format
function transformToTextractFormat(openAiResponse) {
  try {
    // Parse the JSON response from OpenAI
    let extractedData;
    try {
      // Try to parse directly if OpenAI returned valid JSON
      extractedData = JSON.parse(openAiResponse);
    } catch (e) {
      // If not valid JSON, try to extract JSON from text (OpenAI sometimes wraps JSON in text)
      const jsonMatch = openAiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        extractedData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Could not parse JSON from OpenAI response");
      }
    }

    // Create blocks in Textract format
    const blocks = [];
    let blockId = 1;

    // Create a block map to store relations
    const keyBlocks = {};
    const valueBlocks = {};

    // For each key-value pair, create KEY and VALUE blocks
    Object.entries(extractedData).forEach(([key, value]) => {
      const keyId = `key-${blockId}`;
      const valueId = `value-${blockId}`;
      
      // Create key block
      const keyBlock = {
        Id: keyId,
        BlockType: "KEY_VALUE_SET",
        EntityTypes: ["KEY"],
        Relationships: [
          {
            Type: "VALUE",
            Ids: [valueId]
          },
          {
            Type: "CHILD",
            Ids: [`word-${blockId}-key`]
          }
        ]
      };
      
      // Create word block for key
      const keyWordBlock = {
        Id: `word-${blockId}-key`,
        BlockType: "WORD",
        Text: key
      };
      
      // Create value block
      const valueBlock = {
        Id: valueId,
        BlockType: "KEY_VALUE_SET",
        EntityTypes: ["VALUE"],
        Relationships: [
          {
            Type: "CHILD",
            Ids: [`word-${blockId}-value`]
          }
        ]
      };
      
      // Create word block for value
      const valueWordBlock = {
        Id: `word-${blockId}-value`,
        BlockType: "WORD",
        Text: value
      };
      
      // Add all blocks to the array
      blocks.push(keyBlock, keyWordBlock, valueBlock, valueWordBlock);
      
      // Store references
      keyBlocks[keyId] = keyBlock;
      valueBlocks[valueId] = valueBlock;
      
      blockId++;
    });

    return {
      Blocks: blocks
    };
  } catch (error) {
    console.error("Error transforming OpenAI response:", error);
    // Return minimal valid format if transformation fails
    return { 
      Blocks: [] 
    };
  }
}