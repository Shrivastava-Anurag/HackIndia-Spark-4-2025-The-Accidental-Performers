
const authService = require('../services/userServices');
const DocumentRequest = require("../models/documentrequestModel");
const createIssue = require("../models/IssueModel")
const requestModel = require("../models/ApplicationModel")
const Request = require('../models/ApplicationModel')

const signup = async (req, res) => {
  try {
    const token = await authService.signup(req.body);
    res.status(201).json({ message: 'Signup successful', token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getIssuedDocuments = async (req, res) => {
  try {
  
    const receiver = req.body.receiver

    if (!receiver) {
      return res.status(400).json({error : "User not authenticated"})
    }

    const documents = await authService.getIssuedDocuments(receiver)

    res.status(200).json(documents);
  } catch (error) {
    console.error("Error fetching issued documents:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getuploadDocuments = async (req, res) => {
  try {
  
    const receiver = req.body.receiver

    if (!receiver) {
      return res.status(400).json({error : "User not authenticated"})
    }

    const documents = await authService.getuploadDocuments(receiver)

    res.status(200).json(documents);
  } catch (error) {
    console.error("Error fetching issued documents:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const viewDocument = async (req, res) => {
     try {
        const cid = req.body.cid 

        if (!cid) {
          return res.status(400).json({error : "User not authenticated"})
        }

        const gateway = "https://silver-patient-scallop-975.mypinata.cloud/ipfs/";

        const url = `${gateway}${cid}`

        res.status(200).json(url)
        // res.status(302).redirect(url)
     }
     catch (error) {
      console.error("Error fetching issued documents:", error);
      res.status(500).json({ error: "Internal Server Error" });
     }
}


const createRequest = async (req, res) => { 
  try { const { doctype, issuingAuthority, message, cid, receiver } = req.body; 
  const requestData = { doctype, issuingAuthority, message, cid, receiver, status: "Pending", }; 
  const request = await authService.createRequest(requestData); res.status(201).json({ 
    message: "Request submitted successfully", request }); } catch (error) { 
      console.error("Error submitting request:", error); res.status(500).json({ error: "Failed to submit request" }); } };

const postIssue = async (req, res) => {
  try {
    const { userId, title, description } = req.body;

    const issueData = {
      userId,
      title,
      description,
      status: "pending",
    };

    const issue = await createIssue(issueData);
    res.status(201).json({ message: "Issue submitted successfully", issue });
  } catch (err) {
    console.error("Error in postIssue controller:", err.message);
    res.status(500).json({ error: "Failed to submit issue" });
  }
};


const saveuploaded = async (req, res) => {
  try {
      const {receiver, cid, message,stat } = req.body;

      if (!receiver || !cid || !message|| !stat) {
          return res.status(400).json({ error: 'All fields are required' });
      }

      const savedData = await authService.savedata({receiver, cid,message,stat });

      res.status(201).json({ message: 'Data successfully saved', data: savedData });
  } catch (error) {
      console.error('Error in saveData controller:', error.stack);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addRequest = async (req, res) => {
  try {
    const { name } = req.body

    const listingPhotos = req.files;

    if (!listingPhotos || listingPhotos.length === 0) {
      return res.status(400).send("No file uploaded.");
    }
    console.log(listingPhotos)
    const documents = listingPhotos.map((file) => ({
      doc_name: file.originalname.split('.')[0],
      url: file.path,
    }));

    console.log(documents);

    const newListing = await requestModel.create({
      name,
      documents
    });

    res.status(200).json(newListing);

  }
  catch (error) {
    console.error("Error fetching issued documents:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const getRequest = async (req, res) => {
  try {
    const {receiver} = req.body

    const result = await Request.find({receiver: receiver})

    if (!result) {
      return res.status(400).send("server error.");
    }

    res.status(200).json(result);
  }
  catch (error) {
    console.error("Error fetching issued documents:", error);
    res.status(500).json({ error: "Internal Server Error" });

  }
}

module.exports = { signup, login, getIssuedDocuments, createRequest,postIssue,viewDocument ,saveuploaded,getuploadDocuments, addRequest,getRequest};


