const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();

const port = 8080;
const host = process.env.port | '0.0.0.0'

const PORT =  process.env.port | 8080;
const HOST =  process.env.host | '0.0.0.0';

const indexRouter = require("./router/index");
const userRouter = require("./router/user");

app.use(cors({ preflightContinue: false }));
app.use("/static", express.static("public"));
app.use(express.json());
app.use(logger("dev"));
app.use("/api", indexRouter);
app.use("/user", userRouter);
app.use(express.urlencoded({ extended: false }));
app.listen(PORT, HOST,  () => {
  console.log(`Server starts at ${port}`);
});
