const STOP_WORDS = new Set([
  'about', 'above', 'after', 'along', 'also', 'and', 'are', 'with', 'from',
  'have', 'into', 'that', 'their', 'this', 'through', 'using', 'will', 'your',
  'years', 'year', 'work', 'working', 'role', 'team', 'teams', 'looking',
  'strong', 'good', 'must', 'should', 'required', 'requirements', 'experience',
]);

const cleanWords = (value) => String(value || '')
  .replace(/[^a-zA-Z0-9+#./-]/g, ' ')
  .split(/\s+/)
  .map((word) => word.trim())
  .filter((word) => word.length > 2 && !STOP_WORDS.has(word.toLowerCase()));

const unique = (items) => [...new Map(items.map((item) => [item.toLowerCase(), item])).values()];

export const generateProfessionalSummary = (resume) => {
  const technicalSkills = Object.values(resume.technicalSkills || {}).flat();
  const skills = unique([
    ...(resume.skills || []),
    ...technicalSkills,
    ...(resume.coreStrengths || []),
  ].filter(Boolean));
  const requirementWords = unique(cleanWords(resume.companyRequirements));
  const matchingSkills = skills.filter((skill) => requirementWords.some((word) =>
    skill.toLowerCase().includes(word.toLowerCase()) || word.toLowerCase().includes(skill.toLowerCase()),
  ));
  const highlightedSkills = (matchingSkills.length ? matchingSkills : skills).slice(0, 6);
  const education = (resume.education || []).find((item) => item.qualification || item.degree || item.branch);
  const experience = (resume.experience || []).filter((item) => item.role || item.company);
  const projects = (resume.projects || []).filter((item) => item.title || item.description);
  const role = resume.jobTitle || 'professional';
  const projectPhrase = projects.length
    ? ` ${education ? 'and ' : 'with '}practical experience delivering ${projects.length} full-stack project${projects.length > 1 ? 's' : ''}`
    : ` ${education ? 'and ' : 'with '}practical experience building application solutions`;
    const educationName = education?.qualification || education?.degree;
    const educationPhrase = educationName
      ? ` with ${/^[aeiou]/i.test(educationName) ? 'an' : 'a'} ${educationName} background`
    : '';
  const technologyPhrase = highlightedSkills.length
    ? ` using ${highlightedSkills.slice(0, 5).join(', ')}`
    : '';
  const collaborationPhrase = experience.length || projects.length
    ? ' Proven track record of delivering practical project outcomes through cross-functional collaboration and clear communication.'
    : ' Brings strong problem-solving, collaboration, and communication skills.';
  const requirementPhrase = matchingSkills.length
    ? ` Eager to leverage strong technical fundamentals and problem-solving skills to contribute to ${resume.companyName || 'the target organization'} as a ${role}.`
    : ` Eager to leverage strong technical fundamentals and problem-solving skills to build reliable, high-impact systems at ${resume.companyName || 'the target organization'}.`;

  return `Motivated ${role}${educationPhrase}${projectPhrase}${technologyPhrase}.${collaborationPhrase}${requirementPhrase}`;
};