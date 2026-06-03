import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IStudent extends Document {
  user: Types.ObjectId;
  firstName: string;
  lastName: string;
  university?: string;
  major?: string;
  graduationYear?: number;
  skills: string[];
  resumeUrl?: string;
  portfolioUrl?: string;
  projects: { title: string; link: string; description?: string }[];
  readinessScore: number;
}

const StudentSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    university: { type: String },
    major: { type: String },
    graduationYear: { type: Number },
    skills: [{ type: String, index: true }],
    resumeUrl: { type: String },
    portfolioUrl: { type: String },
    projects: [
      {
        title: { type: String },
        link: { type: String },
        description: { type: String },
      },
    ],
    readinessScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IStudent>('Student', StudentSchema);
