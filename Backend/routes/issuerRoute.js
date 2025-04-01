const express = require('express');
const {getAllIssues, saveDocument,getTasks,getAllRequests,updateRequest } = require('../controllers/Issuercontroller');

const issuerrouter = express.Router();

issuerrouter.post('/saveData', saveDocument); 
issuerrouter.get('/getalldocuments', getAllRequests);
issuerrouter.get('/getallissues', getAllIssues);
issuerrouter.get('/getTasks', getTasks);
issuerrouter.post('/updateRequest', updateRequest)


module.exports = issuerrouter;
