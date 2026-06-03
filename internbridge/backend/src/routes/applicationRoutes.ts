import express from 'express';
import { applyToInternship, getMyApplications, getPipeline, updateStage } from '../controllers/applicationController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', protect, applyToInternship);
router.get('/me', protect, getMyApplications);
router.get('/pipeline', protect, getPipeline);
router.patch('/:id/stage', protect, updateStage);

export default router;
