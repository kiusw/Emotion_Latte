/* require */
const express = require("express");
const session = require("express-session");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const port = 7777;

app.use(
  session({
    secret: "p@ssw0rd",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 360000 },
  })
);

/* use */
app.use(
  cors({
    origin: "true",
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* 모듈 */
const mariadb = require("./mariadb_pool");
const login = require("./module/sign_up_login/login");
const sign_up = require("./module/sign_up_login/sign_up");
const board = require("./module/board/board");
const user_board = require("./module/board/user_board");

app.use("/login", login);
app.use("/sign_up", sign_up);
app.use("/board", board);
app.use("/user_post", user_board);