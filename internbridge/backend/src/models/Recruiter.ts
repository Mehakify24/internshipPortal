import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IRecruiter extends Document {
  user: Types.ObjectId;
  companyName: string;
  designation: string;
  website?: string;
  logoUrl?: string;
  isCompanyVerified: boolean;
}

const RecruiterSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    companyName: { type: String, required: true, index: true },
    designation: { type: String, required: true },
    website: { type: String },
    logoUrl: { type: String },
    isCompanyVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IRecruiter>('Recruiter', RecruiterSchema);
