import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors());

import loginRouter from "./routers/loginRouter.js";
app.use(loginRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

