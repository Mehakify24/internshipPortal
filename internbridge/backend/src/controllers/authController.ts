import { Request, Response } from 'express';
import User from '../models/User';
import Student from '../models/Student';
import Recruiter from '../models/Recruiter';
import generateToken from '../utils/generateToken';

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, role, firstName, lastName, companyName, designation } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      email,
      passwordHash: password,
      role,
    });

    if (user) {
      if (role === 'STUDENT') {
        await Student.create({
          user: user._id,
          firstName,
          lastName,
        });
      } else if (role === 'RECRUITER') {
        await Recruiter.create({
          user: user._id,
          companyName,
          designation,
        });
      }

      res.status(201).json({
        _id: user._id,
        email: user.email,
        role: user.role,
        token: generateToken((user._id as any).toString(), user.role),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

export const authUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        email: user.email,
        role: user.role,
        token: generateToken((user._id as any).toString(), user.role),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};
