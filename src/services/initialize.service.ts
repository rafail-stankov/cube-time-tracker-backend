import labels from '../dummy-data/labels.json';

import Label, { LabelDocument } from '../models/label.model';
import Position, { PositionDocument } from '../models/position.model';

export async function insertDummyLabels() {
  // Labels
  for (let i = 0; i < labels.length; i++) {
    try {
      await Label.findOneAndUpdate({name: labels[i].name}, labels[i] as LabelDocument, {upsert: true, new: true, setDefaultsOnInsert: true});
    } catch (error: any) {
      throw new Error(error);
    }
  }

  for (let i = 1; i <= 6; i++) {
    try {
      const label = await Label.findOne({name: "Label " + i});
      await Position.findOneAndUpdate({index: i}, {index: i, label: {name: label?.name, createdAt: label?.createdAt, updatedAt: label?.updatedAt}} as PositionDocument, {upsert: true, new: true, setDefaultsOnInsert: true});
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
