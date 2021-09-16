import labels from '../dummy-data/labels.json';

import Label, { LabelDocument } from '../models/label.model';

export async function insertDummyLabels() {
  // Labels
  for (let i = 0; i < labels.length; i++) {
    try {
      await Label.findOneAndUpdate({name: labels[i].name}, labels[i] as LabelDocument, {upsert: true, new: true, setDefaultsOnInsert: true});
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
