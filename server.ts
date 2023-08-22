const express = require("express");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
require("dotenv").config();
// const passport = require("passport");
// require("./config/passport");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false,
    saveUninitialized: false,
  })
);

// app.use(passport.initialize());
// app.use(passport.session());

// routes
app.use(routes);

///////

app.get("/signup", (req: any, res: any) => {
  res.send("<h1>Signup Page</h1>");
});
app.get("/login", (req: any, res: any) => {
  res.send("<h1>Login Page</h1>");
});

app.get("/", (req: any, res: any) => {
  res.send("<h1>Home Page</h1>");
  console.log(req.cookies);
});

///////
module.exports = app;
