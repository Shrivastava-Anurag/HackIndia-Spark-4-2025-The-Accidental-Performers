const {Schema, model, default: mongoose} = require("mongoose")

const VerifierModel = new Schema({
     verifier_name : {
        type: String,
        required : true
     },
     email : {
        type : String,
        required : true,
        unique : true
     },
     public_add : {
        type : String
     },
     phone_no : {
        type : Number,
        unique : true
     },
     password : {
        type : String,
        required : true
     },
     token : {
        type : String
     }, 
     lead_id : [{
        type : mongoose.Schema.ObjectId, 
        ref : "lead"
     }],
     document_id : [{
        type : mongoose.Schema.ObjectId,
        ref : 'document'
     }],
     accepted : [{
        type : mongoose.Schema.ObjectId,
        ref : 'document'
     }],
     rejected : [{
        type : mongoose.Schema.ObjectId,
        ref : 'document'
     }]
}, {
    timestamps : true
})


const Verifier = model('verifier', VerifierModel)

module.exports = Verifier