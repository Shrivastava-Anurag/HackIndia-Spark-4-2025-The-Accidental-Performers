
const documentSchema = require('../models/documentModel');
const DocumentRequest = require("../models/documentrequestModel");
const issueSchema = require("../models/IssueModel")
const Task = require('../models/taskModel');
const Request = require('../models/ApplicationModel')


const saveData = async (data) => {
    try {
      
        const newData = new documentSchema(data);


        return await newData.save();
    } catch (error) {
        console.error('Error in saveData service:', error);
        throw new Error('Database operation failed');
    }
};

const fetchAllDocumentRequests = async () => {
  try {
    const documentRequests = await DocumentRequest.find();
    return documentRequests;
  } catch (err) {
    console.error("Error fetching document requests:", err);
    throw new Error("Failed to fetch document requests");
  }
};

const fetchAllIssues = async () => {
    try {
      const issues = await issueSchema.find(); 
      return issues;
    } catch (err) {
      console.error("Error fetching issues:", err);
      throw new Error("Failed to fetch issues");
    }
  };

const fetchAllTasks = async () => {
    try {
        return await Task.find();
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw new Error('Failed to fetch tasks');
    }
};

const fetchAllRequests = async () => { 
  return await Request.find(); 
};


  module.exports = {
    saveData,fetchAllDocumentRequests,fetchAllIssues,fetchAllTasks,fetchAllRequests
    
};