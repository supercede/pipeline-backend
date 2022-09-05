const express = require("express");
const rateLimit = require("express-rate-limit");
const calcAge = require("./utils/calculateAge");
require("dotenv").config();

const app = express();

app.use(express.json());

const limiter = rateLimit({
  windowMs: 1 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again later",
});

app.get("/", (request, response) => {
  return response.status(200).json({
    message: "Hello World!",
  });
});

app.get("/howold", limiter, (request, response) => {
  const { dob } = request.query;

  if (!dob) {
    return response.status(400).json({
      error: "dob is required in request query",
    });
  }

  const dateOfBirth = new Date(dob);

  if (dateOfBirth > new Date()) {
    return response.status(400).json({
      error: "dob cannot be in the future",
    });
  }

  if (!dateOfBirth.getFullYear()) {
    return response.status(400).json({
      error:
        "Invalid Date passed. Please use the YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS format instead",
    });
  }

  const age = calcAge(dateOfBirth);

  return response.status(200).json({ age });
});

app.use("*", (request, response) => {
  return response.status(404).json({
    error: "Route not found on this server",
  });
});

app.use((err, request, response, next) => {
  console.log(err);
  response.status(500).json({ error: "An error occurred" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("listening on port " + PORT));
