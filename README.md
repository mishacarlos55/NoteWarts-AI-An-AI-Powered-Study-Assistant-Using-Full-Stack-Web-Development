🪄 NoteWarts AI
Intelligent AI Study Assistant for Smart Revision










📘 Overview

NoteWarts AI is an AI-powered academic assistant that converts static study materials into interactive learning resources.

Students can upload notes and automatically generate:

summaries
quizzes
document-based answers
contextual explanations

This platform reduces manual revision effort and improves learning efficiency using modern Natural Language Processing techniques.

✨ Key Features

📄 Upload study documents (PDF, DOCX, TXT)
🧠 AI-generated structured summaries
❓ Ask questions directly from uploaded notes
📝 Automatic quiz generation from documents
📊 Dashboard with usage analytics
🕘 History tracking for previous outputs
🔐 Secure authentication with JWT
⚡ Fast full-stack React + Node interface

🧠 How It Works
User uploads document
        ↓
Text extracted from file
        ↓
AI processes structured prompts
        ↓
Generates summaries + quizzes + answers
        ↓
Results saved for future revision
🏗 System Architecture
Layer	Technology
Frontend	React.js + Tailwind CSS
Backend	Node.js + Express.js
Database	MongoDB
AI Engine	OpenAI API
📂 Project Structure
NoteWarts-AI/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── context/
│   └── routes/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── services/
│
└── README.md
⚙ Tech Stack
Frontend
React.js
Tailwind CSS
Axios
React Router
Vite
Backend
Node.js
Express.js
JWT Authentication
Multer File Upload Handling
Database
MongoDB
Mongoose ODM
AI Integration
OpenAI API
Prompt-based document processing
🔐 Authentication Flow

Secure login & registration implemented using:

bcrypt password hashing
JWT session management
protected API routes
📦 Modules Implemented
Module	Description
Authentication	Secure login & registration
Document Processing	Extracts text from uploaded notes
AI Summary Engine	Generates structured summaries
Quiz Generator	Creates exam-style questions
Chat with Documents	Answers questions from files
Dashboard Analytics	Tracks activity and usage
