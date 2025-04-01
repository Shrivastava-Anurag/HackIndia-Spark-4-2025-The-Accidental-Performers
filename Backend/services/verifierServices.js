const verifierModel = require("../models/verifierModel")
const app_constant = require("../constants/app.json")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cloudinary = require("../helpers/cloudinary")
const leadModel = require("../models/leadModel")
const documentModel = require("../models/documentModel")

exports.addVerifier = async (data) => {
    const { email, password } = data

    const verifier_data = await verifierModel.findOne({ email })

    if (verifier_data) {
        return {
            success: 0,
            status: app_constant.BAD_REQUEST,
            message: "Email Already Exists",
            result: {},
        }
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const addVerifier = await verifierModel.create({...data, password : hashPassword})

    return {
        success: 1,
        status: app_constant.SUCCESS,
        message: "verifier added successfully",
        result: addVerifier,
    }
}

exports.loginVerifier = async (data) => {
    const {email, password} = data

    const userData = await verifierModel.findOne({email})

    if (!userData) {
        return {
            success: 0,
            status: app_constant.BAD_REQUEST,
            message: "Email does not exist!",
            result: {},
        };
    }

    const password_check = await bcrypt.compare(password, userData.password)

    if (!password_check) {
        return {
            success : 0,
            status : app_constant.BAD_REQUEST,
            message: "Enter valid Credentials",
            result : {}
        }
    }

    const token = jwt.sign({id : userData._id}, process.env.JWT_SECRET_KEY)

    const res = await verifierModel.updateOne({_id : userData._id}, {$set:  {token}})

    return {
        success: 1,
        status: app_constant.SUCCESS,
        message: "user loggedin successfully",
        result: userData,
        token : token
    }
}

exports.verifierDetail = async (user) => {
    const {_id} = user

    const data = await verifierModel.findOne({_id})

    return {
        success: 1,
        status: app_constant.SUCCESS,
        message: "verifier data fetch successfully",
        result: data,
    }
}

exports.documentUpload = async (data) => {
      const file_url = await cloudinary.uploader.upload(data.file.path)
      
      console.log(file_url)

      const lead_data = await documentModel.create({
        document_name : data.document_name,
        document_url : file_url.secure_url,
        public_add : data.public_add,
        verifier_id : data.verifier_id,
        lead_id : data.lead_id
      })

      if (lead_data) {
        return {
            success: 1,
            status: app_constant.SUCCESS,
            message: "Document uploaded successfully",
            result: lead_data,
            file_url,
        }
      }

      return {
        success: 0,
        status: app_constant.INTERNAL_SERVER_ERROR,
        message: 'Internal server error!', result: {}
    }
}

exports.addLead = async (data) => {
    const {email} = data

    var user_data = await leadModel.findOne({email})

    if (user_data) {
        return {
            success : 1,
            status : app_constant.SUCCESS,
            message : "Lead Exist",
            result : user_data
        }
    }

    user_data = await leadModel.create({
        email : email,
        phone_no : data.phone_no,
        public_add : data.public_add,
        lead_name : data.name,
        verifier_id : data.verifier_id
    })

    return {
        success : 1,
        status : app_constant.SUCCESS,
        message : "Lead Added",
        result : user_data
    }
}