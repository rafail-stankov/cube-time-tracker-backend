import express from 'express';

import * as timeTrackerDataController from '../controllers/time-tracker-data.controller';

const router = express.Router();

router
  .post('/', timeTrackerDataController.create_time_tracker_data);

export default router;
