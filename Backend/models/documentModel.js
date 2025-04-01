const { Schema, model, default: mongoose } = require("mongoose")

// const DocumentSchema = new Schema({
//     document_name: {
//         type: String,
//         required: true
//     },
//     public_add: {
//         type: String,
//     },
//     type: {
//         type: String
//     },
//     document_url : {
//         type : String,
//         required : true
//     },
//     status: {
//         type: String,
//         enum: ['Pending', 'Verified', 'Rejected'],
//         default: 'Pending'
//     },
//     lead_id: {
//         type: mongoose.Schema.ObjectId,
//         ref: 'lead',
//         required: true
//     },
//     user_id : {
//         type : mongoose.Schema.ObjectId,
//         ref : 'user'
//     },
//     verifier_id : {
//         type : mongoose.Schema.ObjectId,
//         ref : 'verifier'
//     }
// }, {
//     timestamps: true
// })

// const Document = model('document', DocumentSchema)

// module.exports = Document


// const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String },
  image: { type: String },
  address: { type: String},
  issuingAuthority: { type: String },
  issuingDate: { type: Date},
  account: { type: String},
  receiver: { type: String},
  cid: { type: String},
  signature: { type: String },
  message: { type: String},
  stat:{ type: String},
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Document', documentSchema);
