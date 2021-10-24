const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();

const port = process.env.port | 9000;

const indexRouter = require("./router/index");
const userRouter = require("./router/user");

app.use(cors({ preflightContinue: false }));
app.use("/static", express.static("public"));
app.use(express.json());
app.use(logger("dev"));
app.use("/api", indexRouter);
app.use("/user", userRouter);
app.use(express.urlencoded({ extended: false }));
app.listen(port, () => {
  console.log(`Server starts at ${port}`);
});
