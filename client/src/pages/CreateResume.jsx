import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import ResumeForm from '../components/ResumeForm';
import { useResumes } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const CreateResume = () => {
  const { createResume } = useResumes();
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleSubmit = async (data) => {
    try {
      const created = await createResume(data);
      toast.success('Resume saved successfully!');
      navigate(`/preview/${created._id}`);
    } catch (err) {
      toast.error('Failed to save resume. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Create New Resume</h1>
        <p className="text-gray-600">Fill in your details and build your professional resume</p>
      </div>
      <ResumeForm onSubmit={handleSubmit} submitLabel="Save & Preview" />
    </div>
  );
};

export default CreateResume;
