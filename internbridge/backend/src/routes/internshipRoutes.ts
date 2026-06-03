import express from 'express';
import { getInternships, createInternship, getMyInternships } from '../controllers/internshipController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getInternships);
router.post('/', protect, createInternship);
router.get('/me', protect, getMyInternships);

export default router;
