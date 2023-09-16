const express = require("express");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerFile = require("./swagger.json");

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

const specs = swaggerJsdoc(swaggerFile);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

// routes
app.use(routes);

module.exports = app;
