

const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const Document = require('../models/documentModel')

const Request = require("../models/ApplicationModel");
const Issue = require("../models/IssueModel")

const signup = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) throw new Error('Email already exists');
  
  const user = new User(userData);
  await user.save();
  return generateToken(user._id);
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid email or password');
  
  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error('Invalid email or password');
  
  return generateToken(user._id);
};

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const createRequest = async (data) => { const request = new Request(data); return await request.save(); };

const createIssue = async (issueData) => {
  try {
    const issue = new Issue(issueData); 
    await issue.save();
    return issue;
  } catch (err) {
    console.error("Error creating issue:", err);
    throw new Error("Failed to create issue");
  }
};

const getIssuedDocuments = async (receiver) => {
  const result = await Document.find({ receiver })

  return result
}
const getuploadDocuments = async (receiver) => {
  const result = await Document.find({ receiver })

  return result
}

const savedata = async (data) => {
  try {
    
      const newData = new Document(data);


      return await newData.save();
  } catch (error) {
      console.error('Error in saveData service:', error);
      throw new Error('Database operation failed');
  }
};

// const generateToken = (userId) => {
//   return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
// };


module.exports = { signup, login, createRequest,createIssue,getIssuedDocuments,getuploadDocuments,savedata };
