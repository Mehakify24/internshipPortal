import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User';
import Recruiter from './models/Recruiter';
import Internship from './models/Internship';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/internbridge');
    console.log('MongoDB Connected for Seeding...');

    // Clear existing jobs and recruiters to avoid duplicates if run multiple times
    await Internship.deleteMany();

    // Create a mock recruiter user
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);

    let googleUser = await User.findOne({ email: 'careers@google.com' });
    if (!googleUser) {
      googleUser = await User.create({
        email: 'careers@google.com',
        passwordHash,
        role: 'RECRUITER',
        isVerified: true
      });
    }

    let googleRecruiter = await Recruiter.findOne({ user: googleUser._id });
    if (!googleRecruiter) {
      googleRecruiter = await Recruiter.create({
        user: googleUser._id,
        companyName: 'Google',
        designation: 'University Recruiting Team',
      });
    }

    let netflixUser = await User.findOne({ email: 'talent@netflix.com' });
    if (!netflixUser) {
      netflixUser = await User.create({
        email: 'talent@netflix.com',
        passwordHash,
        role: 'RECRUITER',
        isVerified: true
      });
    }

    let netflixRecruiter = await Recruiter.findOne({ user: netflixUser._id });
    if (!netflixRecruiter) {
      netflixRecruiter = await Recruiter.create({
        user: netflixUser._id,
        companyName: 'Netflix',
        designation: 'Talent Acquisition',
      });
    }

    // Create mock internships
    await Internship.insertMany([
      {
        recruiter: googleRecruiter._id,
        title: 'Frontend Engineering Intern',
        description: 'Join the Google Workspace team to build high-performance React interfaces. You will work on real features impacting millions of users.',
        requirements: ['React', 'TypeScript', 'Data Structures'],
        tags: ['Frontend', 'React', 'Web'],
        location: 'Mountain View, CA',
        type: 'HYBRID',
        stipend: '$55/hr',
        deadline: new Date('2026-10-01'),
        status: 'OPEN'
      },
      {
        recruiter: googleRecruiter._id,
        title: 'Product Management Intern',
        description: 'Help define the future of Google Cloud. You will work with engineering and design teams to launch new features.',
        requirements: ['Product Strategy', 'Analytics', 'UX Design'],
        tags: ['PM', 'Strategy'],
        location: 'New York, NY',
        type: 'ONSITE',
        stipend: '$60/hr',
        deadline: new Date('2026-11-15'),
        status: 'OPEN'
      },
      {
        recruiter: netflixRecruiter._id,
        title: 'Machine Learning Intern',
        description: 'Improve the Netflix recommendation algorithm using state-of-the-art deep learning models.',
        requirements: ['Python', 'PyTorch', 'Linear Algebra'],
        tags: ['AI', 'ML', 'Python'],
        location: 'Los Gatos, CA',
        type: 'REMOTE',
        stipend: '$70/hr',
        deadline: new Date('2026-09-30'),
        status: 'OPEN'
      },
      {
        recruiter: netflixRecruiter._id,
        title: 'Backend Systems Intern',
        description: 'Work on distributed systems and microservices that power global streaming at scale.',
        requirements: ['Java', 'Node.js', 'System Design'],
        tags: ['Backend', 'Java'],
        location: 'Remote',
        type: 'REMOTE',
        stipend: '$50/hr',
        deadline: new Date('2026-12-01'),
        status: 'OPEN'
      }
    ]);

    console.log('Database seeded successfully with Premium Internships!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
