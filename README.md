📘 NoteWarts AI — Intelligent Study Assistant

NoteWarts AI is an AI-powered academic study assistant designed to help students transform static study materials into interactive learning resources. The platform enables automatic summary generation, quiz creation, and document-based question answering using modern Natural Language Processing techniques.

This system reduces manual revision effort and improves learning efficiency by converting uploaded notes into structured knowledge outputs.

🚀 Key Features
📄 Upload study documents (PDF, DOCX, TXT)
✍️ AI-generated concise summaries
❓ Automatic quiz generation from notes
💬 Ask questions directly from uploaded documents
📊 Dashboard with usage analytics
🕘 History tracking for previous outputs
🔐 Secure authentication with JWT
⚡ Fast full-stack web interface
🧠 How It Works
User uploads study material
System extracts textual content
AI processes document using structured prompts
Outputs generated:
summaries
quiz questions
contextual answers
Results stored for future revision
🏗️ System Architecture

Frontend → React.js
Backend → Node.js + Express.js
Database → MongoDB
AI Engine → OpenAI / LLM Integration

📂 Project Structure
NoteWarts-AI/
│
├── frontend/
│   ├── pages/
│   ├── components/
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
⚙️ Tech Stack
Frontend
React.js
Axios
Tailwind CSS
Vite
Backend
Node.js
Express.js
JWT Authentication
Multer (file upload handling)
Database
MongoDB
Mongoose ODM
AI Integration
OpenAI API / LLM Processing Engine
🔐 Authentication Flow
Secure login & registration
Password hashing using bcrypt
JWT-based session management
Protected API routes
📊 Modules Implemented
1️⃣ Authentication Module

Handles user login and registration securely.

2️⃣ Document Processing Module

Uploads and extracts content from study materials.

3️⃣ AI Summary Generator

Creates structured academic summaries.

4️⃣ Quiz Generator

Generates exam-style MCQs automatically.

5️⃣ Chat With Notes

Allows interactive questioning from uploaded documents.

6️⃣ History Tracking Module

Stores previously generated results for revision.

📸 Application Screenshots

Include screenshots here:

/screenshots/dashboard.png
/screenshots/upload.png
/screenshots/quiz.png
/screenshots/chat.png
/screenshots/history.png
🧪 Installation Guide

Clone the repository:

git clone <YOUR_GITHUB_LINK>
Backend Setup
cd backend
npm install
npm run dev
Frontend Setup
cd frontend
npm install
npm run dev
🔑 Environment Variables

Create .env file inside backend folder:

PORT=5000
MONGO_URI=your_database_url
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_api_key
📈 Future Improvements
Voice-based learning interaction
Mobile application deployment
Multilingual document support
Adaptive quiz difficulty engine
Cloud document synchronization
Offline learning mode
🎓 Academic Context

This project was developed as a Capstone Project under the Computer Science and Engineering curriculum at Chandigarh University.