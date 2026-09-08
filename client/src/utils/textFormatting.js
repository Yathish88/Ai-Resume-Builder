const preferredCapitalization = {
  ai: 'AI',
  api: 'API',
  aws: 'AWS',
  css: 'CSS',
  cgpa: 'CGPA',
  cicd: 'CI/CD',
  github: 'GitHub',
  git: 'Git',
  html: 'HTML',
  javascript: 'JavaScript',
  jwt: 'JWT',
  mca: 'MCA',
  mongodb: 'MongoDB',
  node: 'Node.js',
  'node.js': 'Node.js',
  python: 'Python',
  react: 'React',
  sql: 'SQL',
  typescript: 'TypeScript',
  ui: 'UI',
  ux: 'UX',
};

export const capitalizeProfessionalText = (value) => String(value || '')
  .split(/(\s+)/)
  .map((part) => {
    if (/^\s+$/.test(part)) return part;
    const match = part.match(/^([^a-zA-Z0-9]*)(.*?)([^a-zA-Z0-9]*)$/);
    if (!match) return part;
    const [, prefix, word, suffix] = match;
    const preferred = preferredCapitalization[word.toLowerCase()];
    return `${prefix}${preferred || (word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : word)}${suffix}`;
  })
  .join('');

export const capitalizeList = (values = []) => values.map(capitalizeProfessionalText);