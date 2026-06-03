import { Request, Response } from 'express';
import Application from '../models/Application';
import Student from '../models/Student';
import Internship from '../models/Internship';
import Recruiter from '../models/Recruiter';

// @desc    Apply to internship
// @route   POST /api/applications
// @access  Private/Student
export const applyToInternship = async (req: any, res: Response) => {
  try {
    if (req.user.role !== 'STUDENT') return res.status(403).json({ message: 'Only students can apply' });

    const student = await Student.findOne({ user: req.user._id });
    if (!student) return res.status(404).json({ message: 'Student profile not found' });

    const { internshipId } = req.body;

    const internship = await Internship.findById(internshipId);
    if (!internship || internship.status !== 'OPEN') {
      return res.status(400).json({ message: 'Internship not available' });
    }

    const applicationExists = await Application.findOne({ student: student._id, internship: internshipId });
    if (applicationExists) {
      return res.status(400).json({ message: 'You have already applied for this internship' });
    }

    const application = await Application.create({
      student: student._id,
      internship: internshipId,
      stage: 'APPLIED',
    });

    res.status(201).json(application);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get student applications
// @route   GET /api/applications/me
// @access  Private/Student
export const getMyApplications = async (req: any, res: Response) => {
  try {
    const student = await Student.findOne({ user: req.user._id });
    if (!student) return res.status(404).json({ message: 'Student profile not found' });

    const applications = await Application.find({ student: student._id }).populate({
      path: 'internship',
      populate: { path: 'recruiter', select: 'companyName' }
    });
    
    res.json(applications);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get applications for a recruiter's internships
// @route   GET /api/applications/pipeline
// @access  Private/Recruiter
export const getPipeline = async (req: any, res: Response) => {
  try {
    const recruiter = await Recruiter.findOne({ user: req.user._id });
    if (!recruiter) return res.status(404).json({ message: 'Recruiter profile not found' });

    const internships = await Internship.find({ recruiter: recruiter._id }).select('_id');
    const internshipIds = internships.map(i => i._id);

    const applications = await Application.find({ internship: { $in: internshipIds } })
      .populate('student', 'firstName lastName skills readinessScore')
      .populate('internship', 'title');

    res.json(applications);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update application stage
// @route   PATCH /api/applications/:id/stage
// @access  Private/Recruiter
export const updateStage = async (req: any, res: Response) => {
  try {
    const { stage } = req.body;
    const application = await Application.findById(req.params.id);
    
    if (!application) return res.status(404).json({ message: 'Application not found' });

    application.stage = stage;
    await application.save();

    res.json(application);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
