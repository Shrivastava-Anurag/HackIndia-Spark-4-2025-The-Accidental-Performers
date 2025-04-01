// 

const express = require('express');
const cloudinary = require("../helpers/cloudinary")
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const { signup, login,getIssuedDocuments,createRequest,postIssue,viewDocument, saveuploaded, getuploadDocuments, addRequest,getRequest } = require('../controllers/userControllers');

const router = express.Router();


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "UserDocument",
    },
  });

const uploadMulter = multer({
    storage,
    limits: {
      fileSize: 1024 * 1024 * 8,
    },
  });


router.post('/signup', signup);
router.post('/login', login);   
router.post('/getIssuedDocuments', getIssuedDocuments)
router.post('/requestDocument', createRequest)
router.post('/postIssue', postIssue)
router.post('/viewDocument', viewDocument)
router.post('/saveupload',saveuploaded)
router.get('/getupload',getuploadDocuments)
router.post('/addRequest', uploadMulter.array("listingPhotos"), addRequest)
router.post('/getRequest', getRequest)

module.exports = router;
