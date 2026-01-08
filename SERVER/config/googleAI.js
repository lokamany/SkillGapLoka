const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Use 'gemini-1.5-flash' - it is the free-tier workhorse
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 

module.exports = model;