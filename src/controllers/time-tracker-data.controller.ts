import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import { cleanUpData } from '../services/time-tracker-data.service';

export const create_time_tracker_data = async (req: Request, res: Response) => {
  // if (req.body && req.body.data) {
  if (req.body) {
    // console.log(req.body);
    // const dataJSON = JSON.parse(req.body.data);
    try {
      const dataJSON = req.body;
      const sessions = await cleanUpData(dataJSON);
      if (sessions == null) {
        res.sendStatus(400);
        return;
      }
      res.sendStatus(200);
    } catch (err: any) {
      console.error(err);
      res.sendStatus(400);
      return;
    }
  } else {
    res.sendStatus(400);
  }
};

export default {
  create_time_tracker_data
}
