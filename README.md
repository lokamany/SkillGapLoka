ReadyAI is a full-stack application that leverages Hugging Face AI (Flan-T5) and Speech Recognition to provide users with a comprehensive career roadmap, 
ATS resume scoring, and an interactive 3-minute AI Mock Interview Coach.
**✨ Key Features**
AI Resume Intelligence: Parses PDFs and Images (OCR) to generate professional bios and ATS compatibility scores.
3-Minute AI Coach: An interactive communication trainer with a live camera feed, real-time speech-to-text, and a 180-second practice window.
Perfection Analytics: Automatically calculates a "Perfection Score" based on verbal fluency and technical depth during interviews.
Skill Roadmap: Identifies missing skills and provides direct learning links to YouTube and Coursera.
Market History: A persistent "Downside" data section that logs every practice session with progress bars to track improvement over time.
Quick Apply: Dynamic LinkedIn integration that generates live job search links based on AI matched roles.
🛠️ Tech Stack
Frontend: React.js, Tailwind CSS, Lucide Icons, Framer Motion.
Backend: Node.js, Express.js.
AI/ML: Hugging Face Inference API (google/flan-t5-base).
Libraries: react-speech-recognition (STT), tesseract.js (OCR), pdf-parse, jsPDF.

cd backend
npm install express multer cors dotenv axios pdf-parse tesseract.js
PORT=5001
HF_TOKEN=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
node server.js
npm install react-speech-recognition regenerator-runtime lucide-react jspdf axios
npm run dev
