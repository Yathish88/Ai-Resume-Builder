import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { calculateATSScore } from '../utils/atsUtils';
import { getSkillSuggestions } from '../utils/skillSuggestions';

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumes, setResumes] = useState([]);
  const [currentResume, setCurrentResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [atsResult, setAtsResult] = useState(null);
  const [suggestedSkills, setSuggestedSkills] = useState([]);

  const fetchResumes = async () => {
    setLoading(true);
    try {
      const res = await api.get('/resumes');
      setResumes(res.data);
    } catch (error) {
      console.error('Failed to fetch resumes', error);
    }
    setLoading(false);
  };

  const createResume = async (data) => {
    try {
      const res = await api.post('/resumes', data);
      setResumes([res.data, ...resumes]);
      return res.data;
    } catch (error) {
      console.error('Failed to create resume', error);
      throw error;
    }
  };

  const generateSummary = async (data) => {
    const res = await api.post('/resumes/generate-summary', data);
    return res.data.summary;
  };

  const updateResume = async (id, data) => {
    try {
      const res = await api.put(`/resumes/${id}`, data);
      setResumes(resumes.map((r) => (r._id === id ? res.data : r)));
      return res.data;
    } catch (error) {
      console.error('Failed to update resume', error);
      throw error;
    }
  };

  const deleteResume = async (id) => {
    try {
      await api.delete(`/resumes/${id}`);
      setResumes(resumes.filter((r) => r._id !== id));
    } catch (error) {
      console.error('Failed to delete resume', error);
      throw error;
    }
  };

  const fetchResumeById = async (id) => {
    setLoading(true);
    try {
      const res = await api.get(`/resumes/${id}`);
      setCurrentResume(res.data);
      return res.data;
    } catch (error) {
      console.error('Failed to fetch resume', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const computeATS = (resume) => {
    const result = calculateATSScore(resume);
    setAtsResult(result);
    return result;
  };

  const fetchSkillSuggestions = (role) => {
    const skills = getSkillSuggestions(role);
    setSuggestedSkills(skills);
    return skills;
  };

  return (
    <ResumeContext.Provider
      value={{
        resumes,
        currentResume,
        loading,
        atsResult,
        suggestedSkills,
        fetchResumes,
        createResume,
        generateSummary,
        updateResume,
        deleteResume,
        fetchResumeById,
        setCurrentResume,
        computeATS,
        fetchSkillSuggestions,
        setAtsResult,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumes = () => useContext(ResumeContext);
