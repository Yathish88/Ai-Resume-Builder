# AI Resume Builder

A production-quality MERN Stack mini project for building professional resumes with AI-powered suggestions, live preview, multiple templates, ATS score analysis, and PDF download.

## Tech Stack

- **Frontend**: React.js (Vite), React Router DOM, Tailwind CSS, Axios, React Hook Form, Context API
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **PDF Generation**: html2canvas + jsPDF

## Features

- User Authentication (Register, Login, Logout)
- Multi-step Resume Builder
- 11 Professional Resume Templates
- Live Resume Preview
- AI-powered Skill Suggestions (rule-based)
- ATS Score Calculator with Suggestions
- Save, Edit, Delete, and Search Resumes
- Download Resume as PDF
- Fully Responsive Design

## Project Structure

```
AI-Resume-Builder/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar/
│   │   │   ├── Footer/
│   │   │   ├── Sidebar/
│   │   │   ├── ResumeForm/
│   │   │   ├── ResumePreview/
│   │   │   ├── ATSScore/
│   │   │   ├── TemplateSelector/
│   │   │   └── SkillSuggestions/
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ResumeContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── CreateResume.jsx
│   │   │   ├── EditResume.jsx
│   │   │   └── PreviewResume.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   ├── atsUtils.js
│   │   │   ├── skillSuggestions.js
│   │   │   ├── templates.js
│   │   │   └── pdfGenerator.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── resumeController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Resume.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── resumeRoutes.js
│   ├── services/
│   │   ├── atsScore.js
│   │   └── skillSuggestions.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── .gitignore
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### Installation

1. Clone or download the project

2. Install server dependencies:
```bash
cd server
npm install
```

3. Install client dependencies:
```bash
cd client
npm install
```

4. Configure environment variables:
   - Update `server/.env` with your MongoDB URI and JWT secret

5. Ensure MongoDB is running:
```bash
# If using local MongoDB
mongod
```

### Running the Application

1. Start the backend server:
```bash
cd server
npm run dev
```

2. Start the frontend development server (in a new terminal):
```bash
cd client
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

## API Routes

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Resume
- `GET /api/resumes` - Get all resumes (protected)
- `POST /api/resumes` - Create a new resume (protected)
- `GET /api/resumes/:id` - Get resume by ID (protected)
- `PUT /api/resumes/:id` - Update resume (protected)
- `DELETE /api/resumes/:id` - Delete resume (protected)

## MongoDB Schema

### User
- name: String
- email: String (unique)
- password: String (hashed)
- createdAt: Date

### Resume
- userId: ObjectId (ref: User)
- personalDetails: Object
- careerObjective: String
- education: Array
- skills: Array
- projects: Array
- internships: Array
- certificates: Array
- achievements: Array
- languages: Array
- selectedTemplate: String
- atsScore: Number
- createdAt: Date
- updatedAt: Date

## Resume Templates

1. Software Engineer
2. Frontend Developer
3. Backend Developer
4. Full Stack Developer
5. Data Analyst
6. Java Developer
7. Python Developer
8. UI/UX Designer
9. DevOps Engineer
10. Fresher Resume
11. Internship Resume

## AI Features

The AI skill suggestions are rule-based and do not use any paid APIs. They analyze the selected role and suggest relevant skills from a predefined knowledge base.

## ATS Score Calculation

The ATS score is calculated based on:
- Personal Details (20 points)
- Skills (20 points)
- Education (15 points)
- Projects (15 points)
- Internships (10 points)
- Certificates (5 points)
- Languages (5 points)
- Career Objective (10 points)

## License

This project is for educational purposes (MCA Mini Project).
