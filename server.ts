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
    origin: [
      "https://ecommerce-back-end-24dd.vercel.app/",
      "http://localhost:3000/",
    ],
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
app.use((req: any, res: any, next: any) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://ecommerce-back-end-24dd.vercel.app/"
  );
  // res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.set("trust proxy", 1);

// routes
app.use(routes);

module.exports = app;
