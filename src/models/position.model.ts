import mongoose from 'mongoose';

import Label, { LabelDocument, LabelSchema } from './label.model';

export interface PositionDocument extends mongoose.Document {
  index: number;
  label: LabelDocument;
  createdAt: Date;
  updatedAt: Date;
}

export const PositionSchema = new mongoose.Schema({
  index: { type : Number, required: true, dropDups: true },
  label: LabelSchema
},
{
  timestamps: true
});

const Position = mongoose.model<PositionDocument>("Position", PositionSchema);

export default Position;
