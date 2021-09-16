import mongoose from 'mongoose';

import Label, { LabelSchema } from './label.model.ts';

export interface TimeTrackerDataDocument extends mongoose.Document {
  start: Date;
  end: Date;
  label: Label;
  createdAt: Date;
  updatedAt: Date;
}

export const TimeTrackerDataSchema = new mongoose.Schema({
  start: { type : Date, required: true },
  end: { type : Date, required: true },
  label: [LabelSchema]
},
{
  timestamps: true
});

const TimeTrackerData = mongoose.model<TimeTrackerDataDocument>("TimeTrackerData", TimeTrackerDataSchema);

export default TimeTrackerData;
