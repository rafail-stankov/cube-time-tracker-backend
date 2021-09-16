import mongoose from 'mongoose';

import Session, { SessionDocument, SessionSchema } from './session.model';

export interface UploadDocument extends mongoose.Document {
  name: string;
  sessions: [SessionDocument];
  createdAt: Date;
  updatedAt: Date;
}

export const UploadSchema = new mongoose.Schema({
  name: { type : String, required: true },
  start: { type : Date, required: true },
  end: { type : Date, required: true },
  timeTrackerData: [SessionSchema]
},
{
  timestamps: true
});

const Upload = mongoose.model<UploadDocument>("Upload", UploadSchema);

export default Upload;
