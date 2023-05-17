import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import loginRouter from "./routers/loginRouter.js";
import registerRouter from "./routers/registerRouter.js";
import userRouter from "./routers/userRouter.js";
import eventRouter from "./routers/eventRouter.js";

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth',loginRouter);
app.use(registerRouter);
app.use(userRouter);
app.use(eventRouter);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
