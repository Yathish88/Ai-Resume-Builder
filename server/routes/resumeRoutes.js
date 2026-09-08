const express = require('express');
const {
  getResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
} = require('../controllers/resumeController');
const { protect } = require('../middleware/auth');
const { generateProfessionalSummary } = require('../services/professionalSummary');

const router = express.Router();

router.route('/').get(protect, getResumes).post(protect, createResume);
router.post('/generate-summary', protect, async (req, res) => {
  try {
    const summary = await generateProfessionalSummary(req.body);
    if (!summary) {
      return res.status(503).json({ message: 'Gemini is not configured. Add GEMINI_API_KEY to server/.env.' });
    }
    return res.json({ summary });
  } catch (error) {
    console.error('Summary generation failed:', error.message);
    return res.status(502).json({ message: 'Unable to generate a summary with Gemini right now.' });
  }
});
router.route('/:id').get(protect, getResumeById).put(protect, updateResume).delete(protect, deleteResume);

module.exports = router;
