import dotenv from 'dotenv';
dotenv.config();
import path from "path";
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import loginRouter from "./routers/loginRouter.js";
import registerRouter from "./routers/registerRouter.js";
import userRouter from "./routers/userRouter.js";
import eventRouter from "./routers/eventRouter.js";
import paymentRouter from "./routers/paymentRouter.js";
import imageRouter from './routers/imageRouter.js';
import favoritesRouter from './routers/favoritesRouter.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import http from 'http';
import { Server } from 'socket.io';
import router from './routers/loginRouter.js';
import routerThing from './routers/router.js';

const app = express();
const server = http.createServer(app);
app.use(cors());

app.use(express.static("../client/dist"));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",  // The origin of your Svelte app
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
      console.log('user disconnected');
  });
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

// Middleware to check authentication status
const authenticateMiddleware = (req, res, next) => {
  // Check if the user is authenticated (implement your authentication logic here)
  const isAuthenticated = req.session && req.session.user;


  if (!isAuthenticated) {
    // Redirect to the root URL if not authenticated
    return res.redirect('/');
  }
  next();
};
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth',loginRouter);

app.use('/api/auth', loginRouter);
app.use(eventRouter);
app.use('/api/auth',registerRouter);
app.use(userRouter);
app.use(paymentRouter);
app.use(imageRouter);
app.use(favoritesRouter);
app.use(routerThing);
app.use(authenticateMiddleware);


const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
