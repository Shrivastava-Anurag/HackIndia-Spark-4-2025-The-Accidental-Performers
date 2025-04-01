const app_constant = require("../constants/app.json")
const verifierServices = require("../services/verifierServices")
const validationHelper = require("../helpers/validation")
const fs = require("fs")


exports.addVerifier = async (req, res) => {
       try {
        const required_fields = ["verifier_name", "email", "password"];
        const validation = validationHelper.validation(
            required_fields,
            req.body
        );
        if (Object.keys(validation).length) {
            return res.json({
                success: 0,
                status_code: app_constant.BAD_REQUEST,
                message: validation,
                result: {},
            });
        }
        const validEmail = validationHelper.validEmail(req.body.email)

        if (!validEmail) {
            return res.json({
                success: 0,
                status: app_constant.BAD_REQUEST,
                message: "Enter a valid Email",
                result: {},
            })
        }

        const data = await verifierServices.addVerifier(req.body)

        return res.json(data)
       }
       catch(error) {
          return res.json({
            success: 0,
            status_code: app_constant.INTERNAL_SERVER_ERROR,
            message: error.message,
            result: {},
          })
       }
}

exports.loginVerifier = async (req, res) => {
    try {
        const required_fields = ["email", "password"];
        const validation = validationHelper.validation(
            required_fields,
            req.body
        );
        if (Object.keys(validation).length) {
            return res.json({
                success: 0,
                status_code: app_constant.BAD_REQUEST,
                message: validation,
                result: {},
            });
        }

        const validEmail = validationHelper.validEmail(req.body.email)

        if (!validEmail) {
            return res.json({
                success: 0,
                status: app_constant.BAD_REQUEST,
                message: "Enter a valid Email",
                result: {},
            })
        }

        const data = await verifierServices.loginVerifier(req.body)

        return res.json(data)
    }
    catch (error) {
        return res.json({
            success: 0,
            status_code: app_constant.INTERNAL_SERVER_ERROR,
            message: error.message,
            result: {},
          })
    }
}

exports.verifierDetail = async (req, res) => {
    try {
         const verifier = await verifierServices.verifierDetail(req.user)

         return res.json(verifier)
    }
    catch(error) {
        return res.json({
            success: 0,
            status_code: app_constant.INTERNAL_SERVER_ERROR,
            message: error.message,
            result: {},
          })
    }
}

exports.documentUpload = async (req, res) => {
    try {
        if (!req.file) {
            res.json({
                success: 0,
                status_code: app_constant.INTERNAL_SERVER_ERROR,
                message: "Please upload the file",
                result: {},
              });
        }
        req.body.file = req.file

        const data = await verifierServices.documentUpload(req.body)

        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error('Error deleting the file:', err);
            }
            console.log('File deleted successfully!');
        })

        console.log(data)

        return res.json(data)
    }
    catch (error) {
        return res.json({
            success: 0,
            status_code: app_constant.INTERNAL_SERVER_ERROR,
            message: error.message,
            result: {},
          })
    }
}

exports.addLead = async (req, res) => {
    try {
        const required_fields = ["email", ];
        const validation = validationHelper.validation(
            required_fields,
            req.body
        );
        if (Object.keys(validation).length) {
            return res.json({
                success: 0,
                status_code: app_constant.BAD_REQUEST,
                message: validation,
                result: {},
            });
        }

        const validEmail = validationHelper.validEmail(req.body.email)

        if (!validEmail) {
            return res.json({
                success: 0,
                status: app_constant.BAD_REQUEST,
                message: "Enter a valid Email",
                result: {},
            })
        }

        const data = await verifierServices.addLead(req.body)

        return res.json(data)
    }
    catch (error) {
        return res.json({
            success: 0,
            status_code: app_constant.INTERNAL_SERVER_ERROR,
            message: error.message,
            result: {},
          })
    }
}