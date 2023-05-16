import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors());

import loginRouter from "./routers/loginRouter.js";

import registerRouter from "./routers/registerRouter.js";

app.use(registerRouter);

app.use('/api/auth',loginRouter);

import getUsers from "./routers/getUsers.js"
app.use(getUsers);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
