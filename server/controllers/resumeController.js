const Resume = require('../models/Resume');

const getResumes = async (req, res) => {
  const resumes = await Resume.find({ userId: req.user._id }).sort({ updatedAt: -1 });
  res.json(resumes);
};

const getResumeById = async (req, res) => {
  const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });

  if (resume) {
    res.json(resume);
  } else {
    res.status(404).json({ message: 'Resume not found' });
  }
};

const createResume = async (req, res) => {
  const resumeData = { ...req.body, userId: req.user._id };
  const resume = await Resume.create(resumeData);

  if (resume) {
    res.status(201).json(resume);
  } else {
    res.status(400).json({ message: 'Invalid resume data' });
  }
};

const updateResume = async (req, res) => {
  const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });

  if (resume) {
    Object.assign(resume, req.body);
    const updatedResume = await resume.save();
    res.json(updatedResume);
  } else {
    res.status(404).json({ message: 'Resume not found' });
  }
};

const deleteResume = async (req, res) => {
  const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });

  if (resume) {
    await resume.deleteOne();
    res.json({ message: 'Resume removed' });
  } else {
    res.status(404).json({ message: 'Resume not found' });
  }
};

module.exports = { getResumes, getResumeById, createResume, updateResume, deleteResume };
