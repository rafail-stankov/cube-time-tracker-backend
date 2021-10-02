import mongoose from 'mongoose';

import TimeTrackerData, { TimeTrackerDataDocument, TimeTrackerDataSchema } from './time-tracker-data.model';

export interface SessionDocument extends mongoose.Document {
  name: string;
  start: Date;
  end: Date;
  timeTrackerData: TimeTrackerDataDocument[];
  createdAt: Date;
  updatedAt: Date;
}

export const SessionSchema = new mongoose.Schema({
  name: { type : String, required: true },
  start: { type : Date, required: true },
  end: { type : Date, required: true },
  timeTrackerData: [TimeTrackerDataSchema]
},
{
  timestamps: true
});

const Session = mongoose.model<SessionDocument>("Session", SessionSchema);

export default Session;
