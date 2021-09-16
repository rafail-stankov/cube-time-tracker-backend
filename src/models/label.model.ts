import mongoose from 'mongoose';

export interface LabelDocument extends mongoose.Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export const LabelSchema = new mongoose.Schema({
  name: { type : String, required: true }
},
{
  timestamps: true
});

const Label = mongoose.model<LabelDocument>("Label", LabelSchema);

export default Label;
