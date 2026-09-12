**CommsUp
**
Practice. Communicate. Improve.

Live Demo: https://commsup.onrender.com

CommsUp is an AI-powered communication improvement platform that helps
users practice speaking, record responses, and receive actionable
feedback on their communication skills.

✨ Features

🎙️ Speaking practice with communication-focused prompts

🎥 Browser-based video/voice recording

🤖 AI-powered communication analysis

📊 Insights on clarity, fluency, confidence, pace, vocabulary, and
filler words

📈 Practice history and progress tracking

🔐 JWT authentication with secure cookies

🔑 Google OAuth authentication

📝 Session transcripts, scores, feedback, and improvement tips

🌙 Responsive interface with light/dark theme support

🧠 How It Works

Practice Prompt
      ↓
Record Response
      ↓
Video / Audio Blob
      ↓
Transcript + Session Data
      ↓
Backend API
      ↓
Gemini AI Analysis
      ↓
Communication Insights
      ↓
Review + Improvement

🛠️ Tech Stack

Frontend

React.js

Vite

React Router

Tailwind CSS

Axios

IndexedDB (idb)

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT

Cookie Parser

CORS

Multer

ImageKit

AI & Authentication

Google Gemini API

JWT authentication

Google OAuth

Deployment

Docker

Render

MongoDB Atlas

📁 Project Structure

CommsUp/
├── 01_FRONTEND/
│   ├── src/
│   ├── public/
│   └── package.json
├── 02_BACKEND/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   └── ...
│   ├── server.js
│   └── package.json
├── Dockerfile
├── .dockerignore
├── .gitignore
└── README.md

🏗️ Architecture

The project uses a single Dockerized application. The React frontend is
built first, and its production files are served by the Express backend.

                 Browser
                    │
                    ▼
            ┌───────────────┐
            │    Express    │
            │ React + APIs  │
            └───────┬───────┘
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
   MongoDB Atlas          Gemini API

💻 Local Development

1. Clone the repository

git clone <your-repository-url>
cd CommsUp

2. Install dependencies

cd 01_FRONTEND
npm install

cd ../02_BACKEND
npm install

3. Configure environment variables

Backend .env:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLIENT_URL=http://localhost:5000

Frontend .env:

VITE_CLIENT_ID=your_google_client_id

Never commit .env files or secret API keys to GitHub.

🐳 Docker

Build the image:

docker build . -t commsup

Run locally:

docker run --env-file 02_BACKEND/.env -p 5000:5000 commsup

Open:

http://localhost:5000

For production, Render provides the PORT environment variable
automatically.

🔐 Environment Variables

Backend

Variable                 Purpose

MONGO_URI              MongoDB connection string
JWT_SECRET             JWT signing secret
GEMINI_API_KEY         Gemini API key
GOOGLE_CLIENT_SECRET   Google OAuth secret
CLIENT_URL             Application origin
PORT                   Local development port; Render provides the production port

Frontend

Variable           Purpose

VITE_CLIENT_ID   Google OAuth client ID

VITE_CLIENT_ID is a public client identifier used during the frontend
build. Backend secrets must never be exposed to the frontend.

🚀 Deployment

The application is deployed on Render using Docker.

GitHub
   ↓
Render
   ↓
Docker Build
   ↓
Docker Container
   ↓
Live Application

After the initial deployment, updates can be deployed by pushing to the
connected GitHub branch:

git add .
git commit -m "Add new feature"
git push origin main

With automatic deployment enabled, Render rebuilds and redeploys the
application while keeping the same live URL.

🎯 Project Focus

CommsUp focuses on continuous communication improvement through
deliberate practice and AI feedback.

It helps users improve:

Clarity

Confidence

Fluency

Conciseness

Vocabulary

Pace

Articulation

Filler-word usage

Response structure

Overall speaking effectiveness

🔮 Future Enhancements

Personalized communication improvement plans

More practice categories

Advanced communication analytics

AI conversation practice

Real-time speaking feedback

Personalized practice recommendations

AI-generated prompts based on user goals

👨‍💻 Author

Built as a full-stack AI project combining modern web technologies,
cloud services, and generative AI.

📄 License

This project is intended for educational and portfolio purposes.
