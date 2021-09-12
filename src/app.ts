import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';

const app: Application = express();
const port: number = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});

app.post('/data-from-android', (req: Request, res: Response) => {
  console.log("HEY?");
  if (req.body) {
    console.log(req.body);
  }
  res.sendStatus(200);
});

app.listen(process.env.PORT || port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
