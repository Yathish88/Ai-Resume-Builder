import React from 'react';

const TemplateSelector = ({ selectedTemplate, onSelect }) => {
  const templates = [
    { key: 'software-engineer', name: 'Software Engineer', color: '#1e3a8a' },
    { key: 'frontend-developer', name: 'Frontend Developer', color: '#be185d' },
    { key: 'backend-developer', name: 'Backend Developer', color: '#065f46' },
    { key: 'full-stack-developer', name: 'Full Stack Developer', color: '#4338ca' },
    { key: 'data-analyst', name: 'Data Analyst', color: '#0f172a' },
    { key: 'java-developer', name: 'Java Developer', color: '#b91c1c' },
    { key: 'python-developer', name: 'Python Developer', color: '#0369a1' },
    { key: 'ui-ux-designer', name: 'UI/UX Designer', color: '#7c3aed' },
    { key: 'devops-engineer', name: 'DevOps Engineer', color: '#0d9488' },
    { key: 'fresher', name: 'Fresher', color: '#4f46e5' },
    { key: 'internship', name: 'Internship', color: '#ea580c' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose Template</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {templates.map((template) => (
          <button
            key={template.key}
            onClick={() => onSelect(template.key)}
            className={`p-3 rounded-lg border-2 transition-all duration-200 text-center ${
              selectedTemplate === template.key
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div
              className="w-full h-16 rounded-md mb-2 flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: template.color }}
            >
              {template.name}
            </div>
            <span className="text-xs text-gray-600">{template.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
