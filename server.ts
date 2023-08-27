const express = require("express");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://frontend-for-testing-backend.vercel.app",
    sameSite: "none",
    credentials: true,
    secure: true,
  })
);
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     cookie: { maxAge: 1000 * 60 * 60 * 24 },
//     resave: false,
//     saveUninitialized: false,
//     sameSite: "none",
//     secure: true,
//   })
// );

app.use(function (req: any, res: any, next: any) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://frontend-for-testing-backend.vercel.app"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// routes
app.use(routes);

module.exports = app;
