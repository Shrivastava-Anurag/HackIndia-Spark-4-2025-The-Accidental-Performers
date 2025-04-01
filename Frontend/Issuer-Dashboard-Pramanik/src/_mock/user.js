import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

const users = [
  { name: "Amit Sharma", company: "Infosys" },
  { name: "Priya Mehta", company: "Tata Consultancy Services" },
  { name: "Rohan Gupta", company: "Wipro" },
  { name: "Sneha Patel", company: "HCL Technologies" },
  { name: "Vikas Reddy", company: "Mahindra Tech" },
  { name: "Anjali Desai", company: "Reliance Industries" },
  { name: "Manoj Kumar", company: "Larsen & Toubro" },
  { name: "Nidhi Agarwal", company: "Adani Enterprises" },
  { name: "Rahul Choudhary", company: "Tech Mahindra" },
  { name: "Pooja Verma", company: "Infosys" },
  { name: "Arjun Singh", company: "TCS" },
  { name: "Divya Nair", company: "Capgemini" },
  { name: "Rajesh Iyer", company: "Hindustan Unilever" },
  { name: "Kavita Mishra", company: "ITC Limited" },
  { name: "Vivek Saxena", company: "HDFC Bank" },
  { name: "Snehal Joshi", company: "ICICI Bank" },
  { name: "Akash Yadav", company: "Axis Bank" },
  { name: "Meera Pillai", company: "Bajaj Finserv" },
  { name: "Sanjay Gupta", company: "Paytm" },
  { name: "Neha Tiwari", company: "Zomato" },
  { name: "Anand Kulkarni", company: "Swiggy" },
  { name: "Lakshmi Ramesh", company: "BYJU'S" },
  { name: "Harish Menon", company: "Flipkart" },
  { name: "Ritika Singh", company: "Amazon India" },
].map((user, index) => ({
  id: `user-${index + 1}`, // Hardcoded IDs
  avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
  name: user.name,
  company: user.company,
  isVerified: index % 2 === 0, // Alternate verification
  status: sample(['Approved', 'banned']),
  role: sample([
    "Aadhaar Card",
    "PAN Card",
    "Passport",
    "Voter ID (EPIC)",
    "Driving License",
    "Ration Card",
    "Birth Certificate",
    "Marriage Certificate",
    "Educational Certificates",
    "Health Cards",
  ]),
}));

export default users;
