import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import { cleanUpData } from '../services/time-tracker-data.service';

export const create_time_tracker_data = async (req: Request, res: Response) => {
  if (req.body && req.body.data) {
    console.log(req.body);
    const dataJSON = JSON.parse(req.body.data);
    console.log(dataJSON.length);
    for (let i = 0; i < dataJSON.length; i++) {
      // if (dataJSON[i].Duration != null && dataJSON[i].Position != null) {
      //
      // } else if ( {
      //
      // }
    }
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
};

export default {
  create_time_tracker_data
}
