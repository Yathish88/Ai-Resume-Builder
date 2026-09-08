import React, { useState } from 'react';

const ATSScore = ({ score, suggestions }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">ATS Score</h3>
      <div className="flex items-center justify-center mb-4">
        <div className={`w-32 h-32 rounded-full flex items-center justify-center ${getScoreColor(score)}`}>
          <div className="text-center">
            <div className="text-3xl font-bold">{score}%</div>
            <div className="text-xs font-medium">{getScoreLabel(score)}</div>
          </div>
        </div>
      </div>

      {suggestions && suggestions.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Suggestions to Improve:</h4>
          <ul className="space-y-1">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ATSScore;
