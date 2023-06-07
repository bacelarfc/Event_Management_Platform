import dotenv from 'dotenv';
import path from "path";
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import loginRouter from "./routers/loginRouter.js";
import registerRouter from "./routers/registerRouter.js";
import userRouter from "./routers/userRouter.js";
import eventRouter from "./routers/eventRouter.js";
import orderRouter from "./routers/orderRouter.js";
import imageRouter from './routers/imageRouter.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import http from 'http';
import { Server } from 'socket.io';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

let currentTheme = 'dark';
io.on('connection', (socket) => {

  socket.on('toggle-theme', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    io.emit('themeChanged', currentTheme);
  });

  socket.on('disconnect', () => {
  });
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', loginRouter);
app.use(eventRouter);
app.use('/api/auth', registerRouter);
app.use(userRouter);
app.use(orderRouter);
app.use(imageRouter);


const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
