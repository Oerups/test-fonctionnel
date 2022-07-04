import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connect } from 'mongoose';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const mongo_uri = process.env.MONGO_URI || 'mongodb://localhost:27017/db';

connect(mongo_uri);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});