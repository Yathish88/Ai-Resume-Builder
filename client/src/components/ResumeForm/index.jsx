import React, { useState, useEffect } from 'react';
import TemplateSelector from '../TemplateSelector';
import SkillSuggestions from '../SkillSuggestions';
import ATSScore from '../ATSScore';
import { useResumes } from '../../context/ResumeContext';
import { generateProfessionalSummary } from '../../utils/professionalSummary';

const ResumeForm = ({ initialData, onSubmit, submitLabel = 'Save Resume' }) => {
  const { computeATS, atsResult, setAtsResult, generateSummary } = useResumes();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    companyRequirements: '',
    personalDetails: { fullName: '', email: '', phone: '', address: '', linkedin: '', github: '' },
    careerObjective: '',
    professionalSummary: '',
    education: [{ qualification: '', institution: '', college: '', degree: '', branch: '', cgpa: '', percentage: '', year: '', status: '' }],
    skills: [],
    technicalSkills: {
      programmingLanguages: [],
      webTechnologies: [],
      databases: [],
      aiMl: [],
      toolsPlatforms: [],
      coreCompetencies: [],
    },
    projects: [{ title: '', year: '', description: '', points: [], technologies: [] }],
    internships: [{ company: '', role: '', duration: '', description: '', points: [] }],
    experience: [{ company: '', role: '', duration: '', description: '', points: [] }],
    certificates: [{ name: '', issuer: '', date: '' }],
    certifications: [{ name: '', issuer: '', year: '' }],
    achievements: [],
    coreStrengths: [],
    languages: [],
    hobbies: [],
    declaration: { enabled: true, text: 'I hereby declare that the above furnished details are correct to the best of my knowledge, and I bear the responsibility for the correctness of the above-mentioned particulars.' },
    selectedTemplate: 'professional-classic',
  });

  const [newSkill, setNewSkill] = useState('');
  const [newAchievement, setNewAchievement] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newCoreStrength, setNewCoreStrength] = useState('');
  const [newHobby, setNewHobby] = useState('');
  const [newProjPoint, setNewProjPoint] = useState({});
  const [newTechSkill, setNewTechSkill] = useState({});
  const [generatingSummary, setGeneratingSummary] = useState(false);

  const defaultFormData = {
    companyName: '',
    jobTitle: '',
    companyRequirements: '',
    personalDetails: { fullName: '', email: '', phone: '', address: '', linkedin: '', github: '' },
    careerObjective: '',
    professionalSummary: '',
    education: [{ qualification: '', institution: '', college: '', degree: '', branch: '', cgpa: '', percentage: '', year: '', status: '' }],
    skills: [],
    technicalSkills: {
      programmingLanguages: [],
      webTechnologies: [],
      databases: [],
      aiMl: [],
      toolsPlatforms: [],
      coreCompetencies: [],
    },
    projects: [{ title: '', year: '', description: '', points: [], technologies: [] }],
    internships: [{ company: '', role: '', duration: '', description: '', points: [] }],
    experience: [{ company: '', role: '', duration: '', description: '', points: [] }],
    certificates: [{ name: '', issuer: '', date: '' }],
    certifications: [{ name: '', issuer: '', year: '' }],
    achievements: [],
    coreStrengths: [],
    languages: [],
    hobbies: [],
    declaration: { enabled: true, text: 'I hereby declare that the above furnished details are correct to the best of my knowledge, and I bear the responsibility for the correctness of the above-mentioned particulars.' },
    selectedTemplate: 'professional-classic',
  };

  useEffect(() => {
    if (initialData) {
      setFormData({ ...defaultFormData, ...initialData });
    }
  }, [initialData]);

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleArrayChange = (section, index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev[section]];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, [section]: updated };
    });
  };

  const addArrayItem = (section, template = {}) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], template],
    }));
  };

  const removeArrayItem = (section, index) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const addSkill = (skill) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
    }
  };

  const removeSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const addAchievement = (text) => {
    if (text && text.trim() && !formData.achievements.includes(text.trim())) {
      setFormData((prev) => ({
        ...prev,
        achievements: [...prev.achievements, text.trim()],
      }));
    }
  };

  const removeAchievement = (index) => {
    setFormData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }));
  };

  const addLanguage = (text) => {
    if (text && text.trim() && !formData.languages.includes(text.trim())) {
      setFormData((prev) => ({
        ...prev,
        languages: [...prev.languages, text.trim()],
      }));
    }
  };

  const removeLanguage = (index) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index),
    }));
  };

  const addCoreStrength = (text) => {
    if (text && text.trim() && !formData.coreStrengths.includes(text.trim())) {
      setFormData((prev) => ({
        ...prev,
        coreStrengths: [...prev.coreStrengths, text.trim()],
      }));
    }
  };

  const removeCoreStrength = (index) => {
    setFormData((prev) => ({
      ...prev,
      coreStrengths: prev.coreStrengths.filter((_, i) => i !== index),
    }));
  };

  const addHobby = (text) => {
    if (text && text.trim() && !formData.hobbies.includes(text.trim())) {
      setFormData((prev) => ({
        ...prev,
        hobbies: [...prev.hobbies, text.trim()],
      }));
    }
  };

  const removeHobby = (index) => {
    setFormData((prev) => ({
      ...prev,
      hobbies: prev.hobbies.filter((_, i) => i !== index),
    }));
  };

  const addTechnicalSkill = (category, skill) => {
    if (skill && !formData.technicalSkills[category].includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        technicalSkills: {
          ...prev.technicalSkills,
          [category]: [...prev.technicalSkills[category], skill],
        },
      }));
    }
  };

  const removeTechnicalSkill = (category, skill) => {
    setFormData((prev) => ({
      ...prev,
      technicalSkills: {
        ...prev.technicalSkills,
        [category]: prev.technicalSkills[category].filter((s) => s !== skill),
      },
    }));
  };

  const addProjectPoint = (projIndex, point) => {
    if (point && point.trim()) {
      setFormData((prev) => {
        const updated = [...prev.projects];
        updated[projIndex] = {
          ...updated[projIndex],
          points: [...(updated[projIndex].points || []), point.trim()],
        };
        return { ...prev, projects: updated };
      });
    }
  };

  const removeProjectPoint = (projIndex, pointIndex) => {
    setFormData((prev) => {
      const updated = [...prev.projects];
      updated[projIndex] = {
        ...updated[projIndex],
        points: updated[projIndex].points.filter((_, i) => i !== pointIndex),
      };
      return { ...prev, projects: updated };
    });
  };

  const addArrayItemPoint = (section, itemIndex, point) => {
    if (point && point.trim()) {
      setFormData((prev) => {
        const updated = [...prev[section]];
        updated[itemIndex] = {
          ...updated[itemIndex],
          points: [...(updated[itemIndex].points || []), point.trim()],
        };
        return { ...prev, [section]: updated };
      });
    }
  };

  const removeArrayItemPoint = (section, itemIndex, pointIndex) => {
    setFormData((prev) => {
      const updated = [...prev[section]];
      updated[itemIndex] = {
        ...updated[itemIndex],
        points: updated[itemIndex].points.filter((_, i) => i !== pointIndex),
      };
      return { ...prev, [section]: updated };
    });
  };

  const TOTAL_STEPS = 14;

  const nextStep = () => {
    if (step < TOTAL_STEPS) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ats = computeATS(formData);
    onSubmit({ ...formData, atsScore: ats.score });
  };

  const handleGenerateSummary = async () => {
    setGeneratingSummary(true);
    try {
      const summary = await generateSummary(formData);
      setFormData((prev) => ({ ...prev, professionalSummary: summary }));
    } catch (error) {
      setFormData((prev) => ({
        ...prev,
        professionalSummary: generateProfessionalSummary(prev),
      }));
    } finally {
      setGeneratingSummary(false);
    }
  };

  const steps = [
    'Company & Job Info',
    'Personal Details',
    'Professional Summary',
    'Education',
    'Technical Skills',
    'Skills',
    'Projects',
    'Experience',
    'Certifications',
    'Core Strengths',
    'Languages',
    'Hobbies & Interests',
    'Declaration',
    'Template',
  ];

  const techSkillCategories = [
    { key: 'programmingLanguages', label: 'Programming Languages' },
    { key: 'webTechnologies', label: 'Web Technologies' },
    { key: 'databases', label: 'Databases' },
    { key: 'aiMl', label: 'AI / Machine Learning' },
    { key: 'toolsPlatforms', label: 'Tools & Platforms' },
    { key: 'coreCompetencies', label: 'Core Competencies' },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          {initialData ? 'Edit Resume' : 'Create Resume'}
        </h2>
        <span className="text-sm text-gray-500">Step {step} of {TOTAL_STEPS}</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div
          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
        />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{steps[step - 1]}</h3>

              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name (Optional)</label>
                    <input
                      type="text"
                      className="input-field"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g., Google, Microsoft"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title Applying For (Optional)</label>
                    <input
                      type="text"
                      className="input-field"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      placeholder="e.g., Software Developer, Full Stack Engineer"
                    />
                    <p className="text-xs text-gray-500 mt-1">Customize your resume for a specific company/job role</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Requirements (Optional)</label>
                    <textarea
                      className="input-field h-28"
                      value={formData.companyRequirements}
                      onChange={(e) => setFormData({ ...formData, companyRequirements: e.target.value })}
                      placeholder="Paste the job description or key skills required by the company"
                    />
                    <p className="text-xs text-gray-500 mt-1">These keywords will guide the generated professional summary.</p>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      className="input-field"
                      value={formData.personalDetails.fullName}
                      onChange={(e) => handleChange('personalDetails', 'fullName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      className="input-field"
                      value={formData.personalDetails.email}
                      onChange={(e) => handleChange('personalDetails', 'email', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      className="input-field"
                      value={formData.personalDetails.phone}
                      onChange={(e) => handleChange('personalDetails', 'phone', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      className="input-field"
                      value={formData.personalDetails.address}
                      onChange={(e) => handleChange('personalDetails', 'address', e.target.value)}
                      placeholder="City, State, Pincode"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                    <input
                      type="url"
                      className="input-field"
                      value={formData.personalDetails.linkedin}
                      onChange={(e) => handleChange('personalDetails', 'linkedin', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                    <input
                      type="url"
                      className="input-field"
                      value={formData.personalDetails.github}
                      onChange={(e) => handleChange('personalDetails', 'github', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <label className="block text-sm font-medium text-gray-700">Professional Summary</label>
                    <button
                      type="button"
                      className="btn-secondary text-sm"
                      onClick={handleGenerateSummary}
                      disabled={generatingSummary}
                    >
                      {generatingSummary ? 'Generating...' : 'Generate with AI'}
                    </button>
                  </div>
                  <div>
                    <textarea
                      className="input-field h-40"
                      value={formData.professionalSummary}
                      onChange={(e) => setFormData({ ...formData, professionalSummary: e.target.value })}
                      placeholder="Write a compelling professional summary highlighting your experience, skills, and goals..."
                    />
                    <p className="text-xs text-gray-500 mt-1">Generated from your profile, skills, projects, and company requirements. You can edit it before saving.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Career Objective (Optional)</label>
                    <textarea
                      className="input-field h-32"
                      value={formData.careerObjective}
                      onChange={(e) => setFormData({ ...formData, careerObjective: e.target.value })}
                      placeholder="Write a brief career objective..."
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  {formData.education.map((edu, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-700">Education {index + 1}</h4>
                        {formData.education.length > 1 && (
                          <button type="button" onClick={() => removeArrayItem('education', index)} className="text-red-600 text-sm">
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="Qualification (e.g., MCA, BCA)" className="input-field" value={edu.qualification} onChange={(e) => handleArrayChange('education', index, 'qualification', e.target.value)} />
                        <input type="text" placeholder="Institution" className="input-field" value={edu.institution} onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)} />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="Degree" className="input-field" value={edu.degree} onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)} />
                        <input type="text" placeholder="Branch / Stream" className="input-field" value={edu.branch} onChange={(e) => handleArrayChange('education', index, 'branch', e.target.value)} />
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <input type="text" placeholder="CGPA" className="input-field" value={edu.cgpa} onChange={(e) => handleArrayChange('education', index, 'cgpa', e.target.value)} />
                        <input type="text" placeholder="Percentage" className="input-field" value={edu.percentage} onChange={(e) => handleArrayChange('education', index, 'percentage', e.target.value)} />
                        <input type="text" placeholder="Year" className="input-field" value={edu.year} onChange={(e) => handleArrayChange('education', index, 'year', e.target.value)} />
                      </div>
                      <input type="text" placeholder="Status (e.g., Pursuing, Completed)" className="input-field" value={edu.status} onChange={(e) => handleArrayChange('education', index, 'status', e.target.value)} />
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem('education', { qualification: '', institution: '', college: '', degree: '', branch: '', cgpa: '', percentage: '', year: '', status: '' })} className="btn-secondary text-sm">
                    + Add Education
                  </button>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6">
                  {techSkillCategories.map((cat) => (
                    <div key={cat.key} className="border border-gray-200 rounded-lg p-4 space-y-3">
                      <label className="block text-sm font-medium text-gray-700">{cat.label}</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          className="input-field flex-1"
                          placeholder={`Add ${cat.label.toLowerCase()}`}
                          value={newTechSkill[cat.key] || ''}
                          onChange={(e) => setNewTechSkill({ ...newTechSkill, [cat.key]: e.target.value })}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addTechnicalSkill(cat.key, newTechSkill[cat.key]);
                              setNewTechSkill({ ...newTechSkill, [cat.key]: '' });
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            addTechnicalSkill(cat.key, newTechSkill[cat.key]);
                            setNewTechSkill({ ...newTechSkill, [cat.key]: '' });
                          }}
                          className="btn-primary text-sm"
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(formData.technicalSkills[cat.key] || []).map((skill, i) => (
                          <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                            {skill}
                            <button type="button" onClick={() => removeTechnicalSkill(cat.key, skill)} className="text-blue-600 hover:text-blue-800">×</button>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {step === 6 && (
                <div className="space-y-4">
                  <SkillSuggestions role={formData.careerObjective || formData.jobTitle} currentSkills={formData.skills} onAddSkill={addSkill} />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Add Additional Skills</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="input-field flex-1"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Type a skill and press Enter"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addSkill(newSkill);
                            setNewSkill('');
                          }
                        }}
                      />
                      <button type="button" onClick={() => { addSkill(newSkill); setNewSkill(''); }} className="btn-primary text-sm">
                        Add
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, index) => (
                      <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                        {skill}
                        <button type="button" onClick={() => removeSkill(skill)} className="text-indigo-600 hover:text-indigo-800">×</button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {step === 7 && (
                <div className="space-y-4">
                  {formData.projects.map((project, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-700">Project {index + 1}</h4>
                        {formData.projects.length > 1 && (
                          <button type="button" onClick={() => removeArrayItem('projects', index)} className="text-red-600 text-sm">
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="Project Title" className="input-field" value={project.title} onChange={(e) => handleArrayChange('projects', index, 'title', e.target.value)} />
                        <input type="text" placeholder="Year (e.g., 2025)" className="input-field" value={project.year} onChange={(e) => handleArrayChange('projects', index, 'year', e.target.value)} />
                      </div>
                      <textarea placeholder="Short Description" className="input-field h-20" value={project.description} onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)} />
                      <input type="text" placeholder="Technologies (comma separated)" className="input-field" value={project.technologies?.join(', ')} onChange={(e) => handleArrayChange('projects', index, 'technologies', e.target.value.split(',').map(t => t.trim()).filter(t => t))} />
                      <div className="border-t pt-3">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Key Points / Achievements (bullet points)</label>
                        <div className="space-y-2 mb-3">
                          {(project.points || []).map((pt, ptIdx) => (
                            <div key={ptIdx} className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded">
                              <span className="text-sm text-gray-700">• {pt}</span>
                              <button type="button" onClick={() => removeProjectPoint(index, ptIdx)} className="text-red-600 text-sm">Remove</button>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            className="input-field flex-1"
                            placeholder="Add a key point..."
                            value={newProjPoint[index] || ''}
                            onChange={(e) => setNewProjPoint({ ...newProjPoint, [index]: e.target.value })}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                addProjectPoint(index, newProjPoint[index]);
                                setNewProjPoint({ ...newProjPoint, [index]: '' });
                              }
                            }}
                          />
                          <button type="button" onClick={() => { addProjectPoint(index, newProjPoint[index]); setNewProjPoint({ ...newProjPoint, [index]: '' }); }} className="btn-secondary text-sm">
                            Add Point
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem('projects', { title: '', year: '', description: '', points: [], technologies: [] })} className="btn-secondary text-sm">
                    + Add Project
                  </button>
                </div>
              )}

              {step === 8 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-700 border-b pb-2">Work Experience</h4>
                    {formData.experience.map((exp, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-gray-700">Experience {index + 1}</h4>
                          {formData.experience.length > 1 && (
                            <button type="button" onClick={() => removeArrayItem('experience', index)} className="text-red-600 text-sm">
                              Remove
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <input type="text" placeholder="Company" className="input-field" value={exp.company} onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)} />
                          <input type="text" placeholder="Role" className="input-field" value={exp.role} onChange={(e) => handleArrayChange('experience', index, 'role', e.target.value)} />
                          <input type="text" placeholder="Duration" className="input-field" value={exp.duration} onChange={(e) => handleArrayChange('experience', index, 'duration', e.target.value)} />
                        </div>
                        <textarea placeholder="Description" className="input-field h-20" value={exp.description} onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)} />
                      </div>
                    ))}
                    <button type="button" onClick={() => addArrayItem('experience', { company: '', role: '', duration: '', description: '', points: [] })} className="btn-secondary text-sm">
                      + Add Experience
                    </button>
                  </div>

                  <div className="space-y-4 border-t pt-4">
                    <h4 className="font-semibold text-gray-700 pb-2">Internships</h4>
                    {formData.internships.map((intern, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-gray-700">Internship {index + 1}</h4>
                          {formData.internships.length > 1 && (
                            <button type="button" onClick={() => removeArrayItem('internships', index)} className="text-red-600 text-sm">
                              Remove
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <input type="text" placeholder="Company" className="input-field" value={intern.company} onChange={(e) => handleArrayChange('internships', index, 'company', e.target.value)} />
                          <input type="text" placeholder="Role" className="input-field" value={intern.role} onChange={(e) => handleArrayChange('internships', index, 'role', e.target.value)} />
                          <input type="text" placeholder="Duration" className="input-field" value={intern.duration} onChange={(e) => handleArrayChange('internships', index, 'duration', e.target.value)} />
                        </div>
                        <textarea placeholder="Description" className="input-field h-24" value={intern.description} onChange={(e) => handleArrayChange('internships', index, 'description', e.target.value)} />
                      </div>
                    ))}
                    <button type="button" onClick={() => addArrayItem('internships', { company: '', role: '', duration: '', description: '', points: [] })} className="btn-secondary text-sm">
                      + Add Internship
                    </button>
                  </div>
                </div>
              )}

              {step === 9 && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700">Certifications</h4>
                  {formData.certifications.map((cert, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-700">Certification {index + 1}</h4>
                        {formData.certifications.length > 1 && (
                          <button type="button" onClick={() => removeArrayItem('certifications', index)} className="text-red-600 text-sm">
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <input type="text" placeholder="Certificate Name" className="input-field" value={cert.name} onChange={(e) => handleArrayChange('certifications', index, 'name', e.target.value)} />
                        <input type="text" placeholder="Issuer" className="input-field" value={cert.issuer} onChange={(e) => handleArrayChange('certifications', index, 'issuer', e.target.value)} />
                        <input type="text" placeholder="Year" className="input-field" value={cert.year} onChange={(e) => handleArrayChange('certifications', index, 'year', e.target.value)} />
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem('certifications', { name: '', issuer: '', year: '' })} className="btn-secondary text-sm">
                    + Add Certification
                  </button>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-700 mb-4">Certificates (Legacy Format)</h4>
                    {formData.certificates.map((cert, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-gray-700">Certificate {index + 1}</h4>
                          {formData.certificates.length > 1 && (
                            <button type="button" onClick={() => removeArrayItem('certificates', index)} className="text-red-600 text-sm">
                              Remove
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <input type="text" placeholder="Certificate Name" className="input-field" value={cert.name} onChange={(e) => handleArrayChange('certificates', index, 'name', e.target.value)} />
                          <input type="text" placeholder="Issuer" className="input-field" value={cert.issuer} onChange={(e) => handleArrayChange('certificates', index, 'issuer', e.target.value)} />
                          <input type="text" placeholder="Date" className="input-field" value={cert.date} onChange={(e) => handleArrayChange('certificates', index, 'date', e.target.value)} />
                        </div>
                      </div>
                    ))}
                    <button type="button" onClick={() => addArrayItem('certificates', { name: '', issuer: '', date: '' })} className="btn-secondary text-sm">
                      + Add Certificate
                    </button>
                  </div>
                </div>
              )}

              {step === 10 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Core Strengths</label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        className="input-field flex-1"
                        value={newCoreStrength}
                        onChange={(e) => setNewCoreStrength(e.target.value)}
                        placeholder="Enter a core strength"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addCoreStrength(newCoreStrength);
                            setNewCoreStrength('');
                          }
                        }}
                      />
                      <button type="button" onClick={() => { addCoreStrength(newCoreStrength); setNewCoreStrength(''); }} className="btn-primary text-sm">
                        Add
                      </button>
                    </div>
                    <ul className="space-y-2">
                      {formData.coreStrengths.map((strength, index) => (
                        <li key={index} className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg">
                          <span className="text-sm text-gray-700">• {strength}</span>
                          <button type="button" onClick={() => removeCoreStrength(index)} className="text-red-600 text-sm">Remove</button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t pt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Achievements</label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        className="input-field flex-1"
                        value={newAchievement}
                        onChange={(e) => setNewAchievement(e.target.value)}
                        placeholder="Enter an achievement"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addAchievement(newAchievement);
                            setNewAchievement('');
                          }
                        }}
                      />
                      <button type="button" onClick={() => { addAchievement(newAchievement); setNewAchievement(''); }} className="btn-primary text-sm">
                        Add
                      </button>
                    </div>
                    <ul className="space-y-2">
                      {formData.achievements.map((achievement, index) => (
                        <li key={index} className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg">
                          <span className="text-sm text-gray-700">{achievement}</span>
                          <button type="button" onClick={() => removeAchievement(index)} className="text-red-600 text-sm">Remove</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {step === 11 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Add Language</label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        className="input-field flex-1"
                        value={newLanguage}
                        onChange={(e) => setNewLanguage(e.target.value)}
                        placeholder="Enter a language"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addLanguage(newLanguage);
                            setNewLanguage('');
                          }
                        }}
                      />
                      <button type="button" onClick={() => { addLanguage(newLanguage); setNewLanguage(''); }} className="btn-primary text-sm">
                        Add
                      </button>
                    </div>
                    <ul className="space-y-2">
                      {formData.languages.map((lang, index) => (
                        <li key={index} className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg">
                          <span className="text-sm text-gray-700">{lang}</span>
                          <button type="button" onClick={() => removeLanguage(index)} className="text-red-600 text-sm">Remove</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {step === 12 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hobbies & Interests</label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        className="input-field flex-1"
                        value={newHobby}
                        onChange={(e) => setNewHobby(e.target.value)}
                        placeholder="Enter a hobby or interest"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addHobby(newHobby);
                            setNewHobby('');
                          }
                        }}
                      />
                      <button type="button" onClick={() => { addHobby(newHobby); setNewHobby(''); }} className="btn-primary text-sm">
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.hobbies.map((hobby, index) => (
                        <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                          {hobby}
                          <button type="button" onClick={() => removeHobby(index)} className="text-green-600 hover:text-green-800">×</button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 13 && (
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <input
                        type="checkbox"
                        checked={formData.declaration?.enabled}
                        onChange={(e) => setFormData({ ...formData, declaration: { ...formData.declaration, enabled: e.target.checked } })}
                        className="w-4 h-4"
                      />
                      Include Declaration Section
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Declaration Text</label>
                    <textarea
                      className="input-field h-28"
                      value={formData.declaration?.text}
                      onChange={(e) => setFormData({ ...formData, declaration: { ...formData.declaration, text: e.target.value } })}
                    />
                  </div>
                </div>
              )}

              {step === 14 && (
                <div className="space-y-4">
                  <TemplateSelector selectedTemplate={formData.selectedTemplate} onSelect={(template) => setFormData({ ...formData, selectedTemplate: template })} />
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                <button type="button" onClick={prevStep} disabled={step === 1} className="btn-secondary disabled:opacity-50">
                  Previous
                </button>
                {step < TOTAL_STEPS ? (
                  <button type="button" onClick={nextStep} className="btn-primary">
                    Next
                  </button>
                ) : (
                  <button type="submit" className="btn-primary">
                    {submitLabel}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {step !== 14 && <TemplateSelector selectedTemplate={formData.selectedTemplate} onSelect={(template) => setFormData({ ...formData, selectedTemplate: template })} />}
            <ATSScore score={atsResult?.score || 0} suggestions={atsResult?.suggestions || []} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResumeForm;
