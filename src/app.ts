import express, { Application, Request, Response } from 'express';

const app: Application = express();
const port: number = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});

app.listen(process.env.PORT || port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
