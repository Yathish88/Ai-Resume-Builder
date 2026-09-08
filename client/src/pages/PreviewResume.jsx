import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useResumes } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import ResumePreview from '../components/ResumePreview';
import { downloadPDF } from '../utils/pdfGenerator';

const PreviewResume = () => {
  const { id } = useParams();
  const { currentResume, fetchResumeById, setCurrentResume } = useResumes();
  const { user } = useAuth();
  const toast = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        await fetchResumeById(id);
      } catch (e) {
        console.error(e);
        toast.error('Failed to load resume');
      }
      setLoading(false);
    };
    load();
  }, [id]);

  if (!user) {
    return <div className="text-center py-12">Please login to view resume</div>;
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!currentResume) {
    return <div className="text-center py-12">Resume not found</div>;
  }

  const handleDownload = () => {
    downloadPDF('resume-preview', `${currentResume.personalDetails?.fullName || 'resume'}.pdf`);
    toast.success('PDF downloaded successfully!');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Resume Preview</h1>
        <div className="flex gap-3">
          <Link to={`/edit/${currentResume._id}`} className="btn-secondary">
            Edit Resume
          </Link>
          <button onClick={handleDownload} className="btn-primary">
            Download PDF
          </button>
        </div>
      </div>
      <ResumePreview data={currentResume} selectedTemplate={currentResume.selectedTemplate} />
    </div>
  );
};

export default PreviewResume;
