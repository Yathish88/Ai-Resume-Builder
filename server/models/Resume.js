const mongoose = require('mongoose');

const resumeSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    companyName: {
      type: String,
      default: '',
    },
    jobTitle: {
      type: String,
      default: '',
    },
    companyRequirements: {
      type: String,
      default: '',
    },
    personalDetails: {
      fullName: String,
      email: String,
      phone: String,
      address: String,
      linkedin: String,
      github: String,
    },
    careerObjective: {
      type: String,
    },
    professionalSummary: {
      type: String,
    },
    education: [
      {
        qualification: String,
        institution: String,
        college: String,
        degree: String,
        branch: String,
        cgpa: String,
        percentage: String,
        year: String,
        status: String,
      },
    ],
    skills: [String],
    technicalSkills: {
      programmingLanguages: [String],
      webTechnologies: [String],
      databases: [String],
      aiMl: [String],
      toolsPlatforms: [String],
      coreCompetencies: [String],
    },
    projects: [
      {
        title: String,
        year: String,
        description: String,
        points: [String],
        technologies: [String],
      },
    ],
    internships: [
      {
        company: String,
        role: String,
        duration: String,
        description: String,
        points: [String],
      },
    ],
    experience: [
      {
        company: String,
        role: String,
        duration: String,
        description: String,
        points: [String],
      },
    ],
    certificates: [
      {
        name: String,
        issuer: String,
        date: String,
      },
    ],
    certifications: [
      {
        name: String,
        issuer: String,
        year: String,
      },
    ],
    achievements: [String],
    coreStrengths: [String],
    languages: [String],
    hobbies: [String],
    declaration: {
      enabled: { type: Boolean, default: true },
      text: String,
    },
    selectedTemplate: {
      type: String,
      default: 'professional-classic',
    },
    atsScore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model('Resume', resumeSchema);
module.exports = Resume;
