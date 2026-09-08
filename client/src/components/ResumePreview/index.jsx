import React from 'react';
import { getTemplate } from '../../utils/templates';
import { capitalizeList, capitalizeProfessionalText } from '../../utils/textFormatting';

const ProfessionalClassicResume = ({ data, accentColor, headerColor }) => {
  const pd = data.personalDetails || {};
  const fullName = pd.fullName || 'Your Name';
  const fileName = fullName.replace(/\s+/g, '_') + '_Resume';

  const hasTechSkills = data.technicalSkills && Object.values(data.technicalSkills).some(arr => arr && arr.length > 0);
  const hasCerts = (data.certifications && data.certifications.length > 0) || (data.certificates && data.certificates.length > 0);

  const sectionTitleStyle = {
    color: headerColor,
    fontWeight: 700,
    fontSize: '15px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    paddingBottom: '4px',
    borderBottom: `2px solid ${accentColor}`,
    marginBottom: '12px',
    marginTop: '18px',
  };

  return (
    <div
      id="resume-preview"
      className="bg-white shadow-lg"
      style={{
        fontFamily: "'Times New Roman', Times, Georgia, serif",
        maxWidth: '210mm',
        minHeight: '297mm',
        margin: '0 auto',
        padding: '40px 50px',
        color: '#1a1a1a',
        lineHeight: 1.5,
        fontSize: '13px',
        webkitPrintColorAdjust: 'exact',
      }}
    >
      {data.companyName && (
        <div style={{ textAlign: 'right', fontSize: '11px', color: '#666', marginBottom: '8px', fontStyle: 'italic' }}>
          {data.jobTitle && <span>Applying for: {capitalizeProfessionalText(data.jobTitle)}</span>}
          {data.jobTitle && data.companyName && <span> &nbsp;|&nbsp; </span>}
          {data.companyName && <span>Company: {capitalizeProfessionalText(data.companyName)}</span>}
        </div>
      )}

      <div style={{ textAlign: 'center', marginBottom: '18px' }}>
        <h1 style={{
          fontSize: '30px',
          fontWeight: 700,
          letterSpacing: '2px',
          color: '#0f1e3d',
          margin: 0,
          marginBottom: '10px',
        }}>
          {fullName.toUpperCase()}
        </h1>
        <div style={{ fontSize: '12.5px', color: '#333', lineHeight: 1.6 }}>
          <span>{pd.address}</span>
          {pd.address && pd.phone && <span> &nbsp;|&nbsp; </span>}
          {pd.phone && <span>+{pd.phone}</span>}
          {(pd.address || pd.phone) && pd.email && <span> &nbsp;|&nbsp; </span>}
          {pd.email && <span>{pd.email}</span>}
          <br />
          {pd.linkedin && <span>{pd.linkedin}</span>}
          {pd.linkedin && pd.github && <span> &nbsp;|&nbsp; </span>}
          {pd.github && <span>{pd.github}</span>}
        </div>
      </div>

      {(data.professionalSummary || data.careerObjective) && (
        <div>
          <h2 style={sectionTitleStyle}>Professional Summary</h2>
          <p style={{ margin: 0, fontSize: '13px', textAlign: 'justify' }}>
            {data.professionalSummary || data.careerObjective}
          </p>
        </div>
      )}

      {hasTechSkills && (
        <div>
          <h2 style={sectionTitleStyle}>Technical Skills</h2>
          <ul style={{ margin: 0, paddingLeft: '22px', listStyleType: 'disc' }}>
            {data.technicalSkills?.programmingLanguages?.length > 0 && (
              <li style={{ marginBottom: '4px' }}>
                <strong>Programming Languages:</strong> {capitalizeList(data.technicalSkills.programmingLanguages).join(', ')}
              </li>
            )}
            {data.technicalSkills?.webTechnologies?.length > 0 && (
              <li style={{ marginBottom: '4px' }}>
                <strong>Web Technologies:</strong> {capitalizeList(data.technicalSkills.webTechnologies).join(', ')}
              </li>
            )}
            {data.technicalSkills?.databases?.length > 0 && (
              <li style={{ marginBottom: '4px' }}>
                <strong>Databases:</strong> {capitalizeList(data.technicalSkills.databases).join(', ')}
              </li>
            )}
            {data.technicalSkills?.aiMl?.length > 0 && (
              <li style={{ marginBottom: '4px' }}>
                <strong>AI / Machine Learning:</strong> {capitalizeList(data.technicalSkills.aiMl).join(', ')}
              </li>
            )}
            {data.technicalSkills?.toolsPlatforms?.length > 0 && (
              <li style={{ marginBottom: '4px' }}>
                <strong>Tools & Platforms:</strong> {capitalizeList(data.technicalSkills.toolsPlatforms).join(', ')}
              </li>
            )}
            {data.technicalSkills?.coreCompetencies?.length > 0 && (
              <li style={{ marginBottom: '4px' }}>
                <strong>Core Competencies:</strong> {capitalizeList(data.technicalSkills.coreCompetencies).join(', ')}
              </li>
            )}
          </ul>
          {data.skills && data.skills.length > 0 && !hasTechSkills && (
            <p style={{ margin: 0 }}>{data.skills.join(', ')}</p>
          )}
        </div>
      )}

      {!hasTechSkills && data.skills && data.skills.length > 0 && (
        <div>
          <h2 style={sectionTitleStyle}>Skills</h2>
          <ul style={{ margin: 0, paddingLeft: '22px', listStyleType: 'disc' }}>
            {data.skills.map((skill, i) => (
              <li key={i}>{capitalizeProfessionalText(skill)}</li>
            ))}
          </ul>
        </div>
      )}

      {data.projects && data.projects.length > 0 && (
        <div>
          <h2 style={sectionTitleStyle}>Projects</h2>
          <div style={{ marginBottom: '12px' }}>
            {data.projects.map((project, index) => (
              <div key={index} style={{ marginBottom: index < data.projects.length - 1 ? '14px' : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, margin: 0, color: '#0f1e3d' }}>
                    {capitalizeProfessionalText(project.title || 'Project Title')}
                    {project.technologies && project.technologies.length > 0 && (
                      <span style={{ fontWeight: 400, fontStyle: 'italic', fontSize: '12.5px', color: '#444' }}>
                        &nbsp; | {capitalizeList(project.technologies).join(' | ')}
                      </span>
                    )}
                  </h3>
                  {project.year && (
                    <span style={{ fontSize: '12.5px', color: '#555', fontStyle: 'italic' }}>{project.year}</span>
                  )}
                </div>
                {project.description && (
                  <p style={{ margin: '2px 0 4px 0', fontSize: '13px' }}>{project.description}</p>
                )}
                {project.points && project.points.length > 0 && (
                  <ul style={{ margin: '4px 0 0 0', paddingLeft: '22px', listStyleType: 'disc' }}>
                    {project.points.map((pt, ptIdx) => (
                      <li key={ptIdx} style={{ marginBottom: '2px', fontSize: '13px' }}>{pt}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.experience && data.experience.length > 0 && (
        <div>
          <h2 style={sectionTitleStyle}>Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} style={{ marginBottom: index < data.experience.length - 1 ? '12px' : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, margin: 0, color: '#0f1e3d' }}>{capitalizeProfessionalText(exp.role)}</h3>
                {exp.duration && <span style={{ fontSize: '12.5px', color: '#555' }}>{exp.duration}</span>}
              </div>
              <p style={{ margin: '2px 0 4px 0', fontSize: '13px', fontStyle: 'italic' }}>{capitalizeProfessionalText(exp.company)}</p>
              {exp.description && <p style={{ margin: 0, fontSize: '13px' }}>{exp.description}</p>}
              {exp.points && exp.points.length > 0 && (
                <ul style={{ margin: '4px 0 0 0', paddingLeft: '22px', listStyleType: 'disc' }}>
                  {exp.points.map((pt, ptIdx) => (
                    <li key={ptIdx} style={{ marginBottom: '2px', fontSize: '13px' }}>{pt}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {data.internships && data.internships.length > 0 && (
        <div>
          <h2 style={sectionTitleStyle}>Internships</h2>
          {data.internships.map((intern, index) => (
            <div key={index} style={{ marginBottom: index < data.internships.length - 1 ? '12px' : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, margin: 0, color: '#0f1e3d' }}>{capitalizeProfessionalText(intern.role)}</h3>
                {intern.duration && <span style={{ fontSize: '12.5px', color: '#555' }}>{intern.duration}</span>}
              </div>
              <p style={{ margin: '2px 0 4px 0', fontSize: '13px', fontStyle: 'italic' }}>{capitalizeProfessionalText(intern.company)}</p>
              {intern.description && <p style={{ margin: 0, fontSize: '13px' }}>{intern.description}</p>}
              {intern.points && intern.points.length > 0 && (
                <ul style={{ margin: '4px 0 0 0', paddingLeft: '22px', listStyleType: 'disc' }}>
                  {intern.points.map((pt, ptIdx) => (
                    <li key={ptIdx} style={{ marginBottom: '2px', fontSize: '13px' }}>{pt}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {data.education && data.education.length > 0 && (
        <div>
          <h2 style={sectionTitleStyle}>Education</h2>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '13px',
          }}>
            <thead>
              <tr style={{ backgroundColor: headerColor, color: '#fff' }}>
                <th style={{ border: '1px solid #333', padding: '6px 10px', textAlign: 'left', fontWeight: 700 }}>Qualification</th>
                <th style={{ border: '1px solid #333', padding: '6px 10px', textAlign: 'left', fontWeight: 700 }}>Institution</th>
                <th style={{ border: '1px solid #333', padding: '6px 10px', textAlign: 'left', fontWeight: 700, width: '12%' }}>Year</th>
                <th style={{ border: '1px solid #333', padding: '6px 10px', textAlign: 'left', fontWeight: 700, width: '18%' }}>Percentage / Status</th>
              </tr>
            </thead>
            <tbody>
              {data.education.map((edu, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #333', padding: '6px 10px' }}>
                    {capitalizeProfessionalText(edu.qualification || edu.degree || 'Degree')}
                  </td>
                  <td style={{ border: '1px solid #333', padding: '6px 10px' }}>
                    {capitalizeProfessionalText(edu.institution || edu.college || 'Institution Name')}
                  </td>
                  <td style={{ border: '1px solid #333', padding: '6px 10px' }}>{edu.year || '—'}</td>
                  <td style={{ border: '1px solid #333', padding: '6px 10px' }}>
                    {edu.status || [edu.percentage, edu.cgpa ? `CGPA: ${edu.cgpa}` : ''].filter(Boolean).join(' / ') || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {hasCerts && (
        <div>
          <h2 style={sectionTitleStyle}>Certifications</h2>
          <ul style={{ margin: 0, paddingLeft: '22px', listStyleType: 'disc' }}>
            {data.certifications && data.certifications.map((cert, i) => (
              <li key={i} style={{ marginBottom: '3px' }}>
                <strong>{cert.name}</strong>
                {(cert.issuer || cert.year) && (
                  <span> - {[cert.issuer, cert.year].filter(Boolean).join(' (')}{cert.year ? ')' : ''}</span>
                )}
              </li>
            ))}
            {data.certificates && data.certificates.map((cert, i) => (
              <li key={`legacy-${i}`} style={{ marginBottom: '3px' }}>
                <strong>{cert.name}</strong>
                {(cert.issuer || cert.date) && (
                  <span> - {[cert.issuer, cert.date].filter(Boolean).join(' | ')}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {(data.coreStrengths && data.coreStrengths.length > 0) || (data.achievements && data.achievements.length > 0) ? (
        <div>
          <h2 style={sectionTitleStyle}>Core Strengths</h2>
          <ul style={{ margin: 0, paddingLeft: '22px', listStyleType: 'disc' }}>
            {data.coreStrengths && data.coreStrengths.length > 0 && data.coreStrengths.map((s, i) => (
              <li key={i} style={{ marginBottom: '3px' }}>{s}</li>
            ))}
            {data.achievements && data.achievements.map((a, i) => (
              <li key={`ach-${i}`} style={{ marginBottom: '3px' }}>{a}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {data.languages && data.languages.length > 0 && (
        <div>
          <h2 style={sectionTitleStyle}>Languages</h2>
          <div style={{ fontSize: '13px', lineHeight: 1.8 }}>
            {data.languages.map((lang, i) => (
              <div key={i}>{lang}</div>
            ))}
          </div>
        </div>
      )}

      {data.hobbies && data.hobbies.length > 0 && (
        <div>
          <h2 style={sectionTitleStyle}>Hobbies & Interests</h2>
          <p style={{ margin: 0, fontSize: '13px' }}>{data.hobbies.join(', ')}</p>
        </div>
      )}

      {data.declaration?.enabled && (
        <div>
          <h2 style={sectionTitleStyle}>Declaration</h2>
          <p style={{ margin: 0, fontSize: '13px', textAlign: 'justify', marginBottom: '30px' }}>
            {data.declaration.text || 'I hereby declare that the above furnished details are correct to the best of my knowledge, and I bear the responsibility for the correctness of the above-mentioned particulars.'}
          </p>
          <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ fontSize: '13px' }}>
              <div style={{ fontWeight: 400, marginBottom: '20px' }}>Regards,</div>
              <div style={{ borderTop: '1px solid #000', paddingTop: '4px', minWidth: '180px' }}>
                <strong>{fullName}</strong>
              </div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '13px', alignSelf: 'flex-end' }}>
              Place: _______________<br />
              Date: _______________
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ResumePreview = ({ data, selectedTemplate }) => {
  const template = getTemplate(selectedTemplate);
  if (!data) return null;

  const pd = data.personalDetails || {};
  const accentColor = template.accent || '#1e3a8a';
  const headerColor = template.color || '#1e3a5f';
  const layout = template.layout;

  if (layout === 'classic-professional') {
    return <ProfessionalClassicResume data={data} accentColor={accentColor} headerColor={headerColor} />;
  }

  const isSidebarLayout = layout === 'balanced' || layout === 'analytical' || layout === 'artistic';
  const isDarkHeader = layout === 'analytical' || layout === 'infrastructure';
  const isCompact = layout === 'compact' || layout === 'minimal';

  const headerStyle = { backgroundColor: headerColor, color: '#ffffff' };
  const darkHeaderStyle = { backgroundColor: headerColor, color: '#ffffff' };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8" id="resume-preview">
      <div className="max-w-[210mm] mx-auto" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui' }}>
        <div
          className={`pb-4 mb-6 ${isDarkHeader ? 'pt-8' : 'pt-6'}`}
          style={isDarkHeader ? darkHeaderStyle : headerStyle}
        >
          <div className="px-6 py-4">
            <h1 className={`font-bold ${isCompact ? 'text-2xl' : 'text-3xl'} mb-2`}>
              {capitalizeProfessionalText(pd.fullName || 'Your Name')}
            </h1>
            <div className={`flex flex-wrap gap-4 text-sm ${isDarkHeader ? 'text-gray-200' : 'text-gray-100'}`}>
              {pd.email && <span>✉ {pd.email}</span>}
              {pd.phone && <span>| 📱 {pd.phone}</span>}
              {pd.address && <span>| 📍 {pd.address}</span>}
            </div>
            <div className="flex flex-wrap gap-4 mt-1 text-sm">
              {pd.linkedin && <span>🔗 {pd.linkedin}</span>}
              {pd.github && <span>💻 {pd.github}</span>}
            </div>
          </div>
        </div>

        {(data.professionalSummary || data.careerObjective) && (
          <div className={`mb-6`}>
            <h2 className="text-lg font-bold uppercase tracking-wide mb-2" style={{ color: accentColor }}>
              Professional Summary
            </h2>
            <p className={`text-gray-700 text-sm leading-relaxed whitespace-pre-line`}>
              {data.professionalSummary || data.careerObjective}
            </p>
          </div>
        )}

        <div className={`grid gap-6 ${isSidebarLayout ? 'lg:grid-cols-3' : 'lg:grid-cols-1'}`}>
          <div className={`${isSidebarLayout ? 'lg:col-span-2' : ''} space-y-6`}>
            {data.education && data.education.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold uppercase tracking-wide mb-2" style={{ color: accentColor }}>
                  Education
                </h2>
                <div className="space-y-3">
                  {data.education.map((edu, index) => (
                    <div key={index} className="border-l-3 pl-4" style={{ borderColor: accentColor }}>
                      <h3 className="font-semibold text-gray-900">{capitalizeProfessionalText(edu.qualification || edu.degree)}</h3>
                      <p className={`text-gray-700 ${isCompact ? 'text-sm' : ''}`}>{capitalizeProfessionalText(edu.institution || edu.college)}</p>
                      <p className="text-sm text-gray-600">
                        {[edu.branch, edu.cgpa && `CGPA: ${edu.cgpa}`, edu.percentage && `%: ${edu.percentage}`, edu.year && `Year: ${edu.year}`, edu.status].filter(Boolean).join(' | ')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.technicalSkills && Object.values(data.technicalSkills).some(a => a && a.length > 0) ? (
              <div className="mb-6">
                <h2 className="text-lg font-bold uppercase tracking-wide mb-2" style={{ color: accentColor }}>
                  Technical Skills
                </h2>
                <ul className="space-y-1 list-disc list-inside text-sm text-gray-700">
                  {data.technicalSkills.programmingLanguages?.length > 0 && (
                    <li><strong>Programming Languages:</strong> {capitalizeList(data.technicalSkills.programmingLanguages).join(', ')}</li>
                  )}
                  {data.technicalSkills.webTechnologies?.length > 0 && (
                    <li><strong>Web Technologies:</strong> {capitalizeList(data.technicalSkills.webTechnologies).join(', ')}</li>
                  )}
                  {data.technicalSkills.databases?.length > 0 && (
                    <li><strong>Databases:</strong> {capitalizeList(data.technicalSkills.databases).join(', ')}</li>
                  )}
                  {data.technicalSkills.aiMl?.length > 0 && (
                    <li><strong>AI / ML:</strong> {capitalizeList(data.technicalSkills.aiMl).join(', ')}</li>
                  )}
                  {data.technicalSkills.toolsPlatforms?.length > 0 && (
                    <li><strong>Tools & Platforms:</strong> {capitalizeList(data.technicalSkills.toolsPlatforms).join(', ')}</li>
                  )}
                  {data.technicalSkills.coreCompetencies?.length > 0 && (
                    <li><strong>Core Competencies:</strong> {capitalizeList(data.technicalSkills.coreCompetencies).join(', ')}</li>
                  )}
                </ul>
              </div>
            ) : (
              data.skills && data.skills.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold uppercase tracking-wide mb-2" style={{ color: accentColor }}>
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-sm text-white"
                        style={{ backgroundColor: accentColor }}
                      >
                        {capitalizeProfessionalText(skill)}
                      </span>
                    ))}
                  </div>
                </div>
              )
            )}

            {data.projects && data.projects.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold uppercase tracking-wide mb-2" style={{ color: accentColor }}>
                  Projects
                </h2>
                <div className="space-y-4">
                  {data.projects.map((project, index) => (
                    <div key={index} className="border-l-3 pl-4" style={{ borderColor: accentColor }}>
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-gray-900">{capitalizeProfessionalText(project.title)}</h3>
                        {project.year && <span className="text-sm text-gray-600">{project.year}</span>}
                      </div>
                      <p className="text-sm text-gray-700 mt-1">{project.description}</p>
                      {project.points && project.points.length > 0 && (
                        <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                          {project.points.map((p, i) => <li key={i}>{p}</li>)}
                        </ul>
                      )}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                              {capitalizeProfessionalText(tech)}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.experience && data.experience.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold uppercase tracking-wide mb-2" style={{ color: accentColor }}>
                  Experience
                </h2>
                <div className="space-y-4">
                  {data.experience.map((exp, index) => (
                    <div key={index} className="border-l-3 pl-4" style={{ borderColor: accentColor }}>
                      <h3 className="font-semibold text-gray-900">{capitalizeProfessionalText(exp.role)}</h3>
                      <p className="text-sm text-gray-700">{capitalizeProfessionalText(exp.company)} | {exp.duration}</p>
                      <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
                      {exp.points && exp.points.length > 0 && (
                        <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                          {exp.points.map((p, i) => <li key={i}>{p}</li>)}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.internships && data.internships.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold uppercase tracking-wide mb-2" style={{ color: accentColor }}>
                  Internships
                </h2>
                <div className="space-y-4">
                  {data.internships.map((intern, index) => (
                    <div key={index} className="border-l-3 pl-4" style={{ borderColor: accentColor }}>
                      <h3 className="font-semibold text-gray-900">{capitalizeProfessionalText(intern.role)}</h3>
                      <p className="text-sm text-gray-700">{capitalizeProfessionalText(intern.company)} | {intern.duration}</p>
                      <p className="text-sm text-gray-600 mt-1">{intern.description}</p>
                      {intern.points && intern.points.length > 0 && (
                        <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                          {intern.points.map((p, i) => <li key={i}>{p}</li>)}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(data.coreStrengths?.length > 0 || data.achievements?.length > 0) && (
              <div className="mb-6">
                <h2 className="text-lg font-bold uppercase tracking-wide mb-2" style={{ color: accentColor }}>
                  Core Strengths & Achievements
                </h2>
                <ul className="list-disc list-inside space-y-1">
                  {data.coreStrengths?.map((s, i) => <li key={i} className={`text-gray-700 ${isCompact ? 'text-sm' : ''}`}>{s}</li>)}
                  {data.achievements?.map((a, i) => <li key={`a-${i}`} className={`text-gray-700 ${isCompact ? 'text-sm' : ''}`}>{a}</li>)}
                </ul>
              </div>
            )}
          </div>

          {isSidebarLayout && (
            <div className="space-y-6">
              {(data.certifications?.length > 0 || data.certificates?.length > 0) && (
                <div>
                  <h2 className="text-lg font-bold uppercase tracking-wide mb-2" style={{ color: accentColor }}>
                    Certifications
                  </h2>
                  <div className="space-y-2">
                    {data.certifications?.map((cert, index) => (
                      <div key={index} className="text-sm">
                        <span className="font-semibold text-gray-900">{cert.name}</span>
                        <span className="text-gray-600 block"> - {cert.issuer} | {cert.year}</span>
                      </div>
                    ))}
                    {data.certificates?.map((cert, index) => (
                      <div key={`c-${index}`} className="text-sm">
                        <span className="font-semibold text-gray-900">{cert.name}</span>
                        <span className="text-gray-600 block"> - {cert.issuer} | {cert.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {data.languages?.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold uppercase tracking-wide mb-2" style={{ color: accentColor }}>
                    Languages
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {data.languages.map((lang, index) => (
                      <span key={index} className="text-sm text-gray-700">{lang}</span>
                    ))}
                  </div>
                </div>
              )}
              {data.hobbies?.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold uppercase tracking-wide mb-2" style={{ color: accentColor }}>
                    Hobbies
                  </h2>
                  <p className="text-sm text-gray-600">{data.hobbies.join(', ')}</p>
                </div>
              )}
            </div>
          )}

          {!isSidebarLayout && (
            <>
              {(data.certifications?.length > 0 || data.certificates?.length > 0) && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold uppercase tracking-wide mb-2" style={{ color: accentColor }}>
                    Certifications
                  </h2>
                  <div className="space-y-2">
                    {data.certifications?.map((cert, index) => (
                      <div key={index} className="text-sm">
                        <span className="font-semibold text-gray-900">{cert.name}</span>
                        <span className="text-gray-600"> - {cert.issuer} | {cert.year}</span>
                      </div>
                    ))}
                    {data.certificates?.map((cert, index) => (
                      <div key={`c-${index}`} className="text-sm">
                        <span className="font-semibold text-gray-900">{cert.name}</span>
                        <span className="text-gray-600"> - {cert.issuer} | {cert.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {data.languages?.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold uppercase tracking-wide mb-2" style={{ color: accentColor }}>
                    Languages
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {data.languages.map((lang, index) => (
                      <span key={index} className="text-sm text-gray-700">{lang}{index < data.languages.length - 1 ? ',' : ''}</span>
                    ))}
                  </div>
                </div>
              )}
              {data.hobbies?.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold uppercase tracking-wide mb-2" style={{ color: accentColor }}>
                    Hobbies & Interests
                  </h2>
                  <p className="text-sm text-gray-600">{data.hobbies.join(', ')}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
