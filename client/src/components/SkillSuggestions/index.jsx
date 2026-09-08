import React from 'react';
import { getSkillSuggestions } from '../../utils/skillSuggestions';

const SkillSuggestions = ({ role, currentSkills, onAddSkill }) => {
  const suggestions = getSkillSuggestions(role);
  const filtered = suggestions.filter((skill) => !currentSkills.includes(skill));

  if (!role) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
      <h4 className="text-sm font-semibold text-blue-900 mb-2">Suggested Skills for {role || 'your role'}</h4>
      <div className="flex flex-wrap gap-2">
        {filtered.length > 0 ? (
          filtered.map((skill) => (
            <button
              key={skill}
              onClick={() => onAddSkill(skill)}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition"
            >
              + {skill}
            </button>
          ))
        ) : (
          <p className="text-sm text-blue-700">All suggested skills added!</p>
        )}
      </div>
    </div>
  );
};

export default SkillSuggestions;
