import express, { Application, Request, Response } from 'express';

const app: Application = express();
const port: number = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});

app.post('/data-from-android', (req: Request, res: Response) => {
  if (req.body) {
    console.log(req.body);
  }
  res.sendStatus(200);
});

app.listen(process.env.PORT || port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
