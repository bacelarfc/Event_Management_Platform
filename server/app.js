import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import loginRouter from "./routers/loginRouter.js";
import registerRouter from "./routers/registerRouter.js";
import userRouter from "./routers/userRouter.js";

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api/auth',loginRouter);
app.use('/api/auth',registerRouter);
app.use(userRouter);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
