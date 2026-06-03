import { Request, Response } from 'express';
import Internship from '../models/Internship';
import Recruiter from '../models/Recruiter';

// @desc    Get all open internships
// @route   GET /api/internships
// @access  Public
export const getInternships = async (req: Request, res: Response) => {
  try {
    const internships = await Internship.find({ status: 'OPEN' }).populate('recruiter', 'companyName logoUrl');
    res.json(internships);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create an internship
// @route   POST /api/internships
// @access  Private/Recruiter
export const createInternship = async (req: any, res: Response) => {
  try {
    if (req.user.role !== 'RECRUITER') {
      return res.status(403).json({ message: 'Not authorized as recruiter' });
    }

    const recruiter = await Recruiter.findOne({ user: req.user._id });
    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter profile not found' });
    }

    const { title, description, requirements, tags, location, type, stipend, deadline } = req.body;

    const internship = await Internship.create({
      recruiter: recruiter._id,
      title,
      description,
      requirements,
      tags,
      location,
      type,
      stipend,
      deadline,
    });

    res.status(201).json(internship);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get recruiter's internships
// @route   GET /api/internships/me
// @access  Private/Recruiter
export const getMyInternships = async (req: any, res: Response) => {
  try {
    const recruiter = await Recruiter.findOne({ user: req.user._id });
    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter profile not found' });
    }

    const internships = await Internship.find({ recruiter: recruiter._id });
    res.json(internships);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
