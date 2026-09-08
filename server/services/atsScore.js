const calculateATSScore = (resume) => {
  let score = 0;
  const suggestions = [];

  if (resume.personalDetails?.fullName) score += 10;
  else suggestions.push('Add your full name');

  if (resume.personalDetails?.email) score += 5;
  else suggestions.push('Add your email');

  if (resume.personalDetails?.phone) score += 5;
  else suggestions.push('Add your phone number');

  if (resume.careerObjective && resume.careerObjective.length > 20) score += 10;
  else suggestions.push('Write a strong career objective');

  if (resume.education && resume.education.length > 0) score += 15;
  else suggestions.push('Add education details');

  if (resume.skills && resume.skills.length >= 5) score += 20;
  else suggestions.push('Add at least 5 skills');

  if (resume.projects && resume.projects.length > 0) score += 15;
  else suggestions.push('Add projects');

  if (resume.internships && resume.internships.length > 0) score += 10;
  else suggestions.push('Add internships or experience');

  if (resume.certificates && resume.certificates.length > 0) score += 5;
  else suggestions.push('Add certifications');

  if (resume.languages && resume.languages.length > 0) score += 5;
  else suggestions.push('Add languages known');

  return { score: Math.min(score, 100), suggestions };
};

module.exports = { calculateATSScore };
