import { TextractClient, AnalyzeDocumentCommand } from "@aws-sdk/client-textract";

const textractClient = new TextractClient({
  region: "us-east-1", // Replace with your region
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

    // Prepare the AnalyzeDocument command
    const command = new AnalyzeDocumentCommand({
      Document: {
        Bytes: buffer, // Pass the image buffer
      },
      FeatureTypes: ["FORMS", "TABLES"], // Specify the feature types you need
    });

    // Send the command to Textract
    const response = await textractClient.send(command);

    return new Response(JSON.stringify(response), {
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













































































































































