import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useResumes } from '../context/ResumeContext';
import { useToast } from '../context/ToastContext';
import { downloadPDF } from '../utils/pdfGenerator';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { resumes, loading, fetchResumes, deleteResume } = useResumes();
  const toast = useToast();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await deleteResume(id);
        toast.success('Resume deleted successfully');
      } catch (err) {
        toast.error('Failed to delete resume. Please try again.');
      }
    }
  };

  const handleDownload = (resume) => {
    navigate(`/preview/${resume._id}`);
    setTimeout(() => {
      downloadPDF('resume-preview', `${resume.personalDetails?.fullName || 'resume'}.pdf`);
    }, 500);
  };

  const filteredResumes = resumes.filter((resume) =>
    resume.personalDetails?.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}</h1>
          <p className="text-gray-600">Manage your resumes</p>
        </div>
        <div className="flex gap-3">
          <Link to="/create-resume" className="btn-primary">
            + Create Resume
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <input
          type="text"
          placeholder="Search resumes..."
          className="input-field"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Resumes Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="text-gray-600 mt-2">Loading resumes...</p>
        </div>
      ) : filteredResumes.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="text-6xl mb-4">📄</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No resumes yet</h3>
          <p className="text-gray-600 mb-4">Create your first resume to get started</p>
          <Link to="/create-resume" className="btn-primary">
            Create Resume
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResumes.map((resume) => (
            <div key={resume._id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition card-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {resume.personalDetails?.fullName || 'Untitled Resume'}
                  </h3>
                  <p className="text-sm text-gray-600">{resume.personalDetails?.email}</p>
                </div>
                <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full font-medium">
                  {resume.selectedTemplate?.replace('-', ' ') || 'Software Engineer'}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>ATS Score</span>
                  <span className="font-medium">{resume.atsScore || 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${resume.atsScore || 0}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {resume.skills?.slice(0, 4).map((skill, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
                {resume.skills?.length > 4 && (
                  <span className="text-gray-500 text-xs">+{resume.skills.length - 4} more</span>
                )}
              </div>

              <div className="flex gap-2">
                <Link to={`/edit/${resume._id}`} className="flex-1 text-center btn-secondary text-sm py-2">
                  Edit
                </Link>
                <Link to={`/preview/${resume._id}`} className="flex-1 text-center btn-primary text-sm py-2">
                  View
                </Link>
                <button onClick={() => handleDownload(resume)} className="px-3 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition">
                  PDF
                </button>
                <button onClick={() => handleDelete(resume._id)} className="px-3 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition">
                  Del
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
