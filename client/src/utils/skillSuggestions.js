export const getSkillSuggestions = (role) => {
  const roleSuggestions = {
    'Software Engineer': ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Git', 'GitHub', 'REST API', 'HTML', 'CSS'],
    'Frontend Developer': ['HTML', 'CSS', 'JavaScript', 'React', 'Redux', 'Tailwind CSS', 'Git', 'GitHub', 'Responsive Design', 'TypeScript'],
    'Backend Developer': ['Node.js', 'Express', 'MongoDB', 'SQL', 'REST API', 'JWT', 'Redis', 'Docker', 'Git', 'Testing'],
    'Full Stack Developer': ['React', 'Node', 'Express', 'MongoDB', 'JWT', 'Redux', 'Git', 'GitHub', 'REST API', 'TypeScript'],
    'Data Analyst': ['Python', 'Excel', 'SQL', 'Power BI', 'Tableau', 'Statistics', 'Data Visualization', 'Pandas', 'NumPy'],
    'Java Developer': ['Java', 'Spring Boot', 'Hibernate', 'SQL', 'Maven', 'Git', 'REST API', 'Microservices', 'JUnit'],
    'Python Developer': ['Python', 'Django', 'Flask', 'SQL', 'Pandas', 'NumPy', 'Git', 'REST API', 'Machine Learning'],
    'UI/UX Designer': ['Figma', 'Adobe XD', 'Photoshop', 'Wireframing', 'Prototyping', 'User Research', 'HTML', 'CSS', 'JavaScript'],
    'DevOps Engineer': ['Docker', 'Kubernetes', 'AWS', 'Azure', 'CI/CD', 'Jenkins', 'Terraform', 'Linux', 'Git', 'Ansible'],
    'Fresher': ['C', 'C++', 'Java', 'Python', 'HTML', 'CSS', 'JavaScript', 'SQL', 'Git', 'Data Structures'],
    'Intern': ['Communication', 'Teamwork', 'Problem Solving', 'Basic Programming', 'Microsoft Office', 'Time Management'],
  };

  const normalizedRole = role?.toLowerCase();
  for (const key of Object.keys(roleSuggestions)) {
    if (normalizedRole?.includes(key.toLowerCase())) {
      return roleSuggestions[key];
    }
  }
  return ['Communication', 'Teamwork', 'Problem Solving', 'Time Management', 'Adaptability'];
};
