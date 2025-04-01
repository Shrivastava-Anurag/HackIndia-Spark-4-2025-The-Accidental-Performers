const {Schema, model, default: mongoose} = require("mongoose")

const LeadSchema = new Schema({
    lead_name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    phone_no : {
        type : Number,
    },
    public_add : {
        type : String,
    },
    document_count : {
        type : Number,
    },
    accepted: {
        type : Number,
    },
    rejected : {
        type : Number,
    },
    document_id : [{
        type : mongoose.Schema.ObjectId, 
        ref : "document"
    }],
    user_id : {
        type : mongoose.Schema.ObjectId,
        ref : "user"
    },
    verifier_id : {
        type : mongoose.Schema.ObjectId,
        ref : 'verifier'
    },
    note : {
        type : String
    }
}, {
    timestamps : true
})

const Lead = model('lead', LeadSchema)

module.exports = Lead