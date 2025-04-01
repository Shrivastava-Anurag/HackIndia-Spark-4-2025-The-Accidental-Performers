// const mongoose = require('mongoose');

// const applicationSchema = new mongoose.Schema({
//     // applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
//     // verifyingAuthorityId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
//     // issuingAuthorityId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     // status: { 
//     //   type: String, 
//     //   enum: ['pending', 'verified', 'issued', 'rejected'], 
//     //   default: 'pending' 
//     // },
//     // details: { type: Map, of: String, required: true },
//     // createdAt: { type: Date, default: Date.now },
//     // updatedAt: { type: Date, default: Date.now }
//     user : {
//       type : mongoose.Schema.Types.ObjectId, ref: 'User'
//     },
//     status: { 
//       type: String, 
//       enum: ['pending', 'verified', 'issued', 'rejected'], 
//       default: 'pending' 
//     },
//     documents : [
//       {
//         doc_name : {type : String},
//         url : {type : String}
//       }
//     ],
//     issuer : {
//       type : mongoose.Schema.Types.ObjectId, ref : "issue"
//     },
//     issuer_add : {
//       type : String
//     },
//     name : {
//       type : String
//     },
//     user_add : {
//       type : String
//     }
//   });
  
//   module.exports = mongoose.model('Application', applicationSchema)



const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
  doctype: { type: String},
  issuingAuthority: { type: String},
  message: { type: String},
  cid: { type: String },
  receiver: { type: String},
  status: { type: String, default: 'Pending' },
}, {
  timestamps: true
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
