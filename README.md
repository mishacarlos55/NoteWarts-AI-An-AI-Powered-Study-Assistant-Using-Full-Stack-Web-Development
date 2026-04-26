# 🪄 NoteWarts AI

### Intelligent AI Study Assistant for Smart Revision

NoteWarts AI is a full-stack AI-powered academic assistant that transforms static study materials into interactive learning resources.  
The platform enables automatic summary generation, quiz creation, and document-based question answering using modern Natural Language Processing techniques.

---

## 📘 Project Overview

Students upload study documents such as PDFs, DOCX files, or text notes.

The system automatically:

- extracts document text
- processes it using AI prompts
- generates summaries
- creates quizzes
- answers contextual questions
- stores results for revision

This reduces manual revision effort and improves learning efficiency.

---

## ✨ Key Features

- Upload study documents (PDF, DOCX, TXT)
- AI-generated structured summaries
- Automatic quiz generation from notes
- Ask questions directly from uploaded documents
- Dashboard with usage analytics
- History tracking for previous outputs
- Secure authentication using JWT
- Fast full-stack React + Node.js interface

---

## 🧠 How It Works


User uploads document
↓
System extracts text
↓
AI processes structured prompts
↓
Generates summaries + quizzes + answers
↓
Results stored for future revision


---

## 🏗 System Architecture

| Layer | Technology |
|------|------------|
| Frontend | React.js + Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | MongoDB |
| AI Engine | OpenAI API |

---

## 📂 Project Structure


NoteWarts-AI/
│
├── frontend/
│ ├── components/
│ ├── pages/
│ ├── context/
│ └── routes/
│
├── backend/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ └── services/
│
└── README.md


---

## ⚙ Tech Stack

### Frontend

- React.js
- Tailwind CSS
- Axios
- React Router
- Vite

### Backend

- Node.js
- Express.js
- JWT Authentication
- Multer (file upload handling)

### Database

- MongoDB
- Mongoose ODM

### AI Integration

- OpenAI API
- Prompt-based document processing

---

## 🔐 Authentication Flow

Secure login and registration implemented using:

- bcrypt password hashing
- JWT-based session management
- protected API routes

---

## 📦 Modules Implemented

| Module | Description |
|--------|-------------|
| Authentication Module | Handles secure login & registration |
| Document Processing Module | Extracts text from uploaded notes |
| AI Summary Engine | Generates structured summaries |
| Quiz Generator Module | Creates exam-style questions |
| Chat with Documents Module | Answers questions from uploaded files |
| Dashboard Module | Tracks user activity and analytics |

---

## 🚀 Getting Started

Clone repository:


git clone https://github.com/YOUR_USERNAME/NoteWarts-AI.git

cd NoteWarts-AI


Run backend:


cd backend
npm install
npm run dev


Run frontend:


cd frontend
npm install
npm run dev


---

## 📊 Future Improvements

- Flashcard generation
- Weak-topic detection
- Study planner assistant
- Semantic search using embeddings
- Voice interaction support
- Multi-document comparison

---

## 🎓 Academic Value

This project demonstrates:

- full-stack application architecture
- REST API development
- document parsing workflow
- AI integration pipeline
- JWT authentication system
- modular backend service design

