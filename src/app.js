const express = require("express");
const dotenv = require("dotenv");
const corsMiddleware = require("./middlewares/corsMiddleware");
const mongoose = require("mongoose");
const readerRouter = require("./routes/readers");
const bookRouter = require("./routes/books");
const bodyParser = require("body-parser");
const loggerUrl = require("./middlewares/loggerUrl");

dotenv.config();

const {
  PORT = 3000,
  API_URL = "http://127.0.0.1",
  MONGO_URL = "mongodb://localhost:27017/lib",
} = process.env;

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error(error));

const app = express();

const Wellcome = (req, res) => {
  res.status(200).send("Wellcome to the Library!");
};

app.use(corsMiddleware);
app.use(loggerUrl);
app.use(bodyParser.json());

app.get("/", Wellcome);

app.use(readerRouter);
app.use(bookRouter);

app.listen(PORT, () => {
  console.log(`Сервер запущен по адресу ${API_URL}:${PORT}`);
});
