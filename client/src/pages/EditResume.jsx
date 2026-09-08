import React, { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useResumes } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';
import ResumeForm from '../components/ResumeForm';
import { useToast } from '../context/ToastContext';

const EditResume = () => {
  const { id } = useParams();
  const { currentResume, fetchResumeById, updateResume } = useResumes();
  const { user } = useAuth();
  const toast = useToast();

  useEffect(() => {
    fetchResumeById(id).catch(() => {
      toast.error('Failed to load resume');
    });
  }, [id]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!currentResume) {
    return <div className="text-center py-12">Loading...</div>;
  }

  const handleSubmit = async (data) => {
    try {
      await updateResume(id, data);
      toast.success('Resume updated successfully!');
      window.location.href = '/dashboard';
    } catch (err) {
      toast.error('Failed to update resume. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Edit Resume</h1>
        <p className="text-gray-600">Update your resume details</p>
      </div>
      <ResumeForm initialData={currentResume} onSubmit={handleSubmit} submitLabel="Update Resume" />
    </div>
  );
};

export default EditResume;
