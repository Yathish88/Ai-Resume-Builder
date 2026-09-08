import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const downloadPDF = async (elementId, fileName = 'resume.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('PDF element not found:', elementId);
    alert('Resume preview not found. Please try again.');
    return;
  }

  try {
    const A4_WIDTH_MM = 210;
    const A4_HEIGHT_MM = 297;
    const PDF_QUALITY_SCALE = 3;
    const MM_PER_INCH = 25.4;

    const canvas = await html2canvas(element, {
      scale: PDF_QUALITY_SCALE,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      imageTimeout: 15000,
      removeContainer: true,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pageWidthPx = pdf.internal.pageSize.getWidth() * PDF_QUALITY_SCALE * (72 / MM_PER_INCH);
    const pageHeightPx = pdf.internal.pageSize.getHeight() * PDF_QUALITY_SCALE * (72 / MM_PER_INCH);

    const ratio = A4_WIDTH_MM / (canvas.width / (PDF_QUALITY_SCALE * 72 / MM_PER_INCH));

    const imgWidth = A4_WIDTH_MM;
    const imgHeight = (canvas.height * ratio) / (PDF_QUALITY_SCALE * 72 / MM_PER_INCH);

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= A4_HEIGHT_MM;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= A4_HEIGHT_MM;
    }

    const cleanName = fileName.replace(/[^a-zA-Z0-9_\- ]/g, '').replace(/\s+/g, '_');
    pdf.save(cleanName || 'resume.pdf');

    return true;
  } catch (error) {
    console.error('PDF generation failed:', error);
    alert('Failed to generate PDF. Error: ' + (error?.message || 'Unknown error'));
    return false;
  }
};

export const downloadResumeWithName = async (elementId, personalDetails = {}) => {
  const fullName = personalDetails.fullName || 'Resume';
  const cleanName = fullName.replace(/[^a-zA-Z0-9 ]/g, '').trim().replace(/\s+/g, '_');
  const companyTag = personalDetails.companyName ? `_${personalDetails.companyName.replace(/[^a-zA-Z0-9]/g, '')}` : '';
  return downloadPDF(elementId, `${cleanName}${companyTag}_Resume.pdf`);
};

