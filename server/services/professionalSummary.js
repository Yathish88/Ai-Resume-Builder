const generateProfessionalSummary = async (resume) => {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }

  const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
  const prompt = `Write a concise, ATS-friendly professional resume summary in 3 sentences.
Use only facts present in the candidate data. Do not invent employers, years, metrics, or experience.
Follow this style: "Motivated [role] with a [education] background and practical experience building [work/projects] using [relevant skills]. Proven track record of [real evidence] through collaboration and communication. Eager to leverage technical fundamentals and problem-solving skills to contribute to [company]."
Mention the company only in the final sentence. Return only the summary text.

Candidate data:
${JSON.stringify({
    company: resume.companyName,
    targetRole: resume.jobTitle,
    companyRequirements: resume.companyRequirements,
    personalDetails: resume.personalDetails,
    education: resume.education,
    skills: resume.skills,
    technicalSkills: resume.technicalSkills,
    projects: resume.projects,
    experience: resume.experience,
    achievements: resume.achievements,
    coreStrengths: resume.coreStrengths,
  }, null, 2)}`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.4, maxOutputTokens: 220 },
      }),
    },
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini request failed: ${error}`);
  }

  const result = await response.json();
  const summary = result.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!summary) {
    throw new Error('Gemini returned an empty summary');
  }

  return summary.replace(/^['"]|['"]$/g, '');
};

module.exports = { generateProfessionalSummary };