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
        : "http://localhost:3000",
    sameSite: "none",
    credentials: true,
    secure: false,
  })
);
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false,
    saveUninitialized: false,
    sameSite: "none",
    secure: false,
  })
);
app.set("trust proxy", 1);

app.use((req: any, res: any, next: any) => {
  res.setHeader("Access-Control-Allow-Origin: http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials: true");
  res.setHeader("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers: Content-Type, *");
});

// routes
app.use(routes);

module.exports = app;
