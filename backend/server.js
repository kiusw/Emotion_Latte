const express = require("express");
const session = require("express-session");
const http = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./mongodb");
dotenv.config();

const PORT = process.env.PORT;
const app = express();
const server = http.createServer(app);

// MongoDB 연결 후 서버 시작
connectDB()
  .then(() => {
    console.log("\n===== MongoDB 연결 성공 =====");
    
    const io = new Server(server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    // Socket.io 설정
    app.set('io', io);  // Express에서 socket.io 접근 가능하도록 설정
    require("./utils/io")(io);

    // 미들웨어 설정
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(session({
      secret: process.env.SESSION_SECRET || "default_secret",
      resave: false,
      saveUninitialized: true,
      cookie: {}
    }));

    // 라우터 설정
    app.use("/login", require("./module/sign_up_login/login"));
    app.use("/sign_up", require("./module/sign_up_login/sign_up"));
    app.use("/board", require("./module/board/board"));
    app.use("/user_post", require("./module/board/user_board"));
    app.use("/chatting_Room", require("./module/chatting/chatting_Room"));

    // 서버 시작
    server.listen(PORT, () => {
      console.log(`HTTP 서버: http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error("\n===== MongoDB 연결 실패 =====");
    console.error(error);
    process.exit(1);
  });
