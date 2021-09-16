import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import timeTrackerDataRouter from './routers/time-tracker-data.router';

import { insertDummyLabels } from './services/initialize.service';

const app: Application = express();
const port: number = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect('mongodb+srv://bigBoss:GeMXLDtZTe5IRdAe@cluster0.4p8pc.mongodb.net/cube-time-tracker?retryWrites=true&w=majority');
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB');
  insertDummyLabels();
});

app.use('/data-from-android', timeTrackerDataRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});

// app.post('/data-from-android', (req: Request, res: Response) => {
//   if (req.body && req.body.data) {
//     console.log(req.body.data);
//     const dataJSON = JSON.parse(req.body.data);
//     console.log(dataJSON.length);
//     for (let i = 0; i < dataJSON.length; i++) {
//       console.log(dataJSON[i]);
//     }
//     res.sendStatus(200);
//   } else {
//     res.sendStatus(400);
//   }
// });

app.listen(process.env.PORT || port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
