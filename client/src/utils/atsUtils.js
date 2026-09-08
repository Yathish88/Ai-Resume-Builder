export const calculateATSScore = (resume) => {
  let score = 0;
  const suggestions = [];

  if (resume.personalDetails?.fullName) score += 8;
  else suggestions.push('Add your full name');

  if (resume.personalDetails?.email) score += 4;
  else suggestions.push('Add your email');

  if (resume.personalDetails?.phone) score += 4;
  else suggestions.push('Add your phone number');

  if (resume.personalDetails?.linkedin) score += 2;
  if (resume.personalDetails?.github) score += 2;
  if (resume.personalDetails?.address) score += 2;

  const hasSummary = (resume.professionalSummary && resume.professionalSummary.length > 30) ||
    (resume.careerObjective && resume.careerObjective.length > 30);
  if (hasSummary) score += 10;
  else suggestions.push('Write a detailed professional summary (3+ lines)');

  if (resume.education && resume.education.length > 0) {
    score += 12;
    const hasDetails = resume.education.some(e => e.percentage || e.cgpa || e.status);
    if (hasDetails) score += 3;
  } else {
    suggestions.push('Add education details');
  }

  const hasTechSkills = resume.technicalSkills && Object.values(resume.technicalSkills).some(arr => arr && arr.length > 0);
  const techSkillCount = hasTechSkills
    ? Object.values(resume.technicalSkills).reduce((sum, arr) => sum + (arr ? arr.length : 0), 0)
    : 0;
  const totalSkillCount = (resume.skills?.length || 0) + techSkillCount;

  if (totalSkillCount >= 10) score += 18;
  else if (totalSkillCount >= 5) score += 10;
  else if (totalSkillCount >= 1) score += 4;
  else suggestions.push('Add multiple skills across categories (aim for 10+)');

  const hasProjectDetails = resume.projects?.some(p => p.points && p.points.length > 0) ||
    resume.projects?.some(p => p.technologies && p.technologies.length > 0);
  if (resume.projects && resume.projects.length >= 2) {
    score += 15;
    if (hasProjectDetails) score += 3;
  } else if (resume.projects && resume.projects.length > 0) {
    score += 8;
  } else {
    suggestions.push('Add 2+ projects with bullet points');
  }

  const expCount = (resume.experience?.length || 0) + (resume.internships?.length || 0);
  if (expCount >= 2) score += 12;
  else if (expCount > 0) score += 6;
  else suggestions.push('Add work experience or internships');

  const certCount = (resume.certifications?.length || 0) + (resume.certificates?.length || 0);
  if (certCount >= 2) score += 6;
  else if (certCount > 0) score += 3;
  else suggestions.push('Add 2+ certifications');

  if (resume.coreStrengths && resume.coreStrengths.length >= 3) score += 4;
  else if (resume.achievements && resume.achievements.length > 0) score += 2;

  if (resume.languages && resume.languages.length > 0) score += 3;
  else suggestions.push('Add languages known');

  if (resume.hobbies && resume.hobbies.length > 0) score += 2;

  if (resume.companyName || resume.jobTitle) score += 2;

  return { score: Math.min(score, 100), suggestions };
};

