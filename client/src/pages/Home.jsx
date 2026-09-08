import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  const features = [
    { icon: '🎨', title: 'Multiple Templates', description: 'Choose from 11+ professional resume templates tailored for different roles.' },
    { icon: '🤖', title: 'AI Skill Suggestions', description: 'Get intelligent skill recommendations based on your target job role.' },
    { icon: '📊', title: 'ATS Score', description: 'Real-time ATS score calculation with suggestions to improve your resume.' },
    { icon: '👁️', title: 'Live Preview', description: 'See your resume update in real-time as you type.' },
    { icon: '📥', title: 'PDF Download', description: 'Download your resume as a professional A4 PDF instantly.' },
    { icon: '💾', title: 'Save & Manage', description: 'Save multiple resumes, edit, and manage them from your dashboard.' },
  ];

  const templates = [
    { name: 'Software Engineer', color: 'bg-blue-800' },
    { name: 'Frontend Developer', color: 'bg-pink-600' },
    { name: 'Backend Developer', color: 'bg-green-700' },
    { name: 'Full Stack Developer', color: 'bg-indigo-600' },
    { name: 'Data Analyst', color: 'bg-gray-800' },
    { name: 'Java Developer', color: 'bg-red-700' },
    { name: 'Python Developer', color: 'bg-blue-600' },
    { name: 'UI/UX Designer', color: 'bg-purple-700' },
    { name: 'DevOps Engineer', color: 'bg-teal-600' },
    { name: 'Fresher', color: 'bg-indigo-500' },
    { name: 'Internship', color: 'bg-orange-600' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Build Professional Resumes with AI
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
            Create stunning, ATS-friendly resumes in minutes with intelligent suggestions and live preview.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link to="/dashboard" className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/register" className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg">
                  Get Started
                </Link>
                <Link to="/login" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 card-shadow hover:shadow-lg transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Professional Templates</h2>
          <p className="text-center text-gray-600 mb-12">Choose from templates designed for every tech role</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {templates.map((template, index) => (
              <div key={index} className={`${template.color} text-white rounded-lg p-6 text-center card-shadow hover:shadow-xl transition cursor-pointer`}>
                <h3 className="font-semibold">{template.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">AI-Powered Resume Building</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Our intelligent system suggests relevant skills based on your target role, calculates ATS scores, and helps you create a resume that stands out.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Role-Based Skills</h3>
              <p className="text-gray-600">Select your target role and get instant skill suggestions tailored to that position.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-2">ATS Score Analysis</h3>
              <p className="text-gray-600">Get a real-time ATS score with actionable suggestions to improve your resume.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Instant PDF</h3>
              <p className="text-gray-600">Download your professionally formatted resume as a PDF in one click.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
