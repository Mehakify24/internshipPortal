import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IApplication extends Document {
  student: Types.ObjectId;
  internship: Types.ObjectId;
  stage: 'APPLIED' | 'ASSESSMENT' | 'INTERVIEW' | 'OFFER_EXTENDED' | 'ACCEPTED' | 'REJECTED';
  appliedAt: Date;
}

const ApplicationSchema: Schema = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    internship: { type: Schema.Types.ObjectId, ref: 'Internship', required: true },
    stage: {
      type: String,
      enum: ['APPLIED', 'ASSESSMENT', 'INTERVIEW', 'OFFER_EXTENDED', 'ACCEPTED', 'REJECTED'],
      default: 'APPLIED',
    },
    appliedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Prevent double applications
ApplicationSchema.index({ student: 1, internship: 1 }, { unique: true });

export default mongoose.model<IApplication>('Application', ApplicationSchema);
