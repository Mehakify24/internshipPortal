import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IInternship extends Document {
  recruiter: Types.ObjectId;
  title: string;
  description: string;
  requirements: string[];
  tags: string[];
  location: string;
  type: 'REMOTE' | 'ONSITE' | 'HYBRID';
  stipend?: string;
  deadline?: Date;
  status: 'OPEN' | 'CLOSED';
}

const InternshipSchema: Schema = new Schema(
  {
    recruiter: { type: Schema.Types.ObjectId, ref: 'Recruiter', required: true },
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    tags: [{ type: String, index: true }],
    location: { type: String, required: true },
    type: { type: String, enum: ['REMOTE', 'ONSITE', 'HYBRID'], default: 'ONSITE' },
    stipend: { type: String },
    deadline: { type: Date },
    status: { type: String, enum: ['OPEN', 'CLOSED'], default: 'OPEN' },
  },
  { timestamps: true }
);

export default mongoose.model<IInternship>('Internship', InternshipSchema);
