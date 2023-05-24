import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import loginRouter from "./routers/loginRouter.js";
import registerRouter from "./routers/registerRouter.js";
import userRouter from "./routers/userRouter.js";
import eventRouter from "./routers/eventRouter.js";
import paymentRouter from "./routers/paymentRouter.js";
import imageRouter from './routers/imageRouter.js';

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/api/auth',loginRouter);
app.use(eventRouter);
app.use('/api/auth',registerRouter);
app.use(userRouter);
app.use(paymentRouter);
app.use(imageRouter);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
