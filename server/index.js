import http from "http";
import express from "express";
import logger from "morgan";
import cors from "cors";
import userRouter from "../routes/user.js";
import {Server} from "socket.io"

import WebSockets from "../utils/WebSockets.js";
import { decode } from '../middlewares/jwt.js'
import loginRouter from "../routes/index.js" 

import chatRoomRouter from "../routes/chatRoom.js"
import deleteRouter from "../routes/delete.js"
import mongoose from 'mongoose'
const realDb="mongodb+srv://ramakrishna:e4OFjpWJM2BZSRQQ@cluster0.5e8vb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const CONNECTION_URL ="mongodb://localhost:27017/chatApi"
mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(
      ()=>{
          console.log("Connected to  DB succesfully")
      }
  ).catch(e=>console.log(e))
const app = express();
const port = process.env.PORT || "5000";
app.set("port", port);
//app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
app.use(logger("dev"));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/login",loginRouter)
app.use("/room", chatRoomRouter);
app.use("/delete", deleteRouter);
app.get("/",(req,res)=>{
  res.render("form")
})


app.use('*', (req, res) => {
    return res.status(404).json({
      success: false,
      message: 'API endpoint doesnt exist'
    })
  });

  const server = http.createServer(app);
  const socketio = new Server(server)
  server.listen(port);
  global.io = socketio.listen(server);
global.io.on('connection', WebSockets.connection)
  server.on("listening", () => {
    console.log(`Listening on port:: http://localhost:${port}/`)
  });