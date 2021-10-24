// install febby package
const { Febby } = require("febby");

const config = {
  port: 3000,
  db: {
    url: "mongodb://localhost:27017/Tigerfit",
  },
  appBaseUrl: "/",
};
const febby = new Febby(config);

const api = febby.router("/");

const users = febby.model("users", {
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// const books = febby.model("books", {
//   name: {
//     type: String,
//   },
//   author: {
//     type: String,
//   },
// });

const logActionOnUserCrud1 = (req, res, next) => {
  console.log(`${req.method}:${req.url} - 1`);
  next();
};

const logActionOnUserCrud2 = (req, res, next) => {
  console.log(`${req.method}:${req.url} - 2`);
  if (req.query.name === "xxx") {
    next();
  } else {
    res.status(403).send({ message: "forbidden" });
  }
};

febby.crud(
  "/users",
  {
    crud: false,
    get: [logActionOnUserCrud2],
    middlewares: [logActionOnUserCrud1],
  },
  users,
  api
);

// febby.crud(
//   "/books",
//   {
//     crud: false,
//     get: [],
//     post: [],
//     middlewares: [logActionOnUserCrud],
//   },
//   books,
//   api
// );

febby.route({
  router: api,
  path: "/",
  method: "get",
  handler: (req, res) => {
    const message = "welcome to febby.!";
    res.json({
      message,
    });
  },
});
febby.route({
  router: api,
  path: "/user",
  method: "get",
  handler: async (req, res) => {
    const user = await users.find({});
    res.json(user);
  },
});
febby.bootstrap(() => {
  console.log(`Server started on port : ${config.port}`);
});

module.exports = febby;
