const mongoose = require("mongoose");

const documentRequestSchema = new mongoose.Schema({
  userId: {
    type: String, // Change ObjectId to String to accommodate wallet addresses
    required: true
  },
  documentName: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  // Any other fields
});

const DocumentRequest = mongoose.model("DocumentRequest", documentRequestSchema);

module.exports = DocumentRequest;
